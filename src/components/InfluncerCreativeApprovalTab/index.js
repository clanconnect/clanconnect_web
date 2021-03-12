import React, { useEffect } from 'react';
import './styles.scss';
import { Tabs, Empty, Collapse } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RightOutlined } from '@ant-design/icons';
import ProjectListCard from '../ProjectListCard';
import DownLoadedFile from '../DownLoadedFile';
import routeConstants from 'common/routeConstants';
import { ACTIONS as PROJECT_ACTIONS } from 'redux/creators/projects/actions';
import { ACTIONS as CREATIVE_ACTIONS } from 'redux/creators/creatives/actions';

const ProjectList = (projects) => {
  return projects.length !== 0 ? (
    projects.map((project) => (
      <ProjectListCard
        project={project}
        key={`projects-${project.id}`}
        creatives={[]}
        disablePreviousVersionUpload={true}
      />
    ))
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  );
};

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const ProjectCreatives = ({ project, creatives }) => {
  console.log(creatives);
  return project.length != 0 ? (
    <div className='custom-project-collapse'>
      <div key={`project-creatives-${project.id}`}>
        <Collapse onChange={callback}>
          <Panel
            showArrow={false}
            key={project.id}
            header={
              <ProjectListCard
                project={project}
                creatives={creatives}
                className='shadow-none'
              />
            }
          >
            <div className='open-container'>
              <div className='file-influencer-row'>
                {creatives.length !== 0 ? (
                  creatives.map((creative) => (
                    <DownLoadedFile
                      creative={creative}
                      key={`creative-${creative.id}`}
                      project={project}
                    />
                  ))
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </div>

              {creatives?.length ? (
                <Link to={routeConstants.allCreativesLists}>
                  <div className='mt-30'>
                    <p className='view-title'>
                      View all creatives <RightOutlined />
                    </p>
                  </div>
                </Link>
              ) : null}
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  );
};

const AvailableTabs = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

const InfluncerCreativeApprovalTab = ({ creatives, projects, dispatch }) => {
  const { TabPane } = Tabs;

  function callback(key) {
    if (key === 'projects') {
      loadProjects({ status: 'ongoing' });
    } else {
      loadCreatives({ status: key });
    }
  }

  const loadProjects = ({ status }) => {
    dispatch({
      type: PROJECT_ACTIONS.GET_INDEX,
      payload: { query: { status } },
    });
  };

  const loadCreatives = ({ status }) => {
    dispatch({
      type: CREATIVE_ACTIONS.GET_INDEX,
      payload: { query: { status, include: 'project' } },
    });
  };

  useEffect(() => {
    loadProjects({ status: 'ongoing' });
    loadCreatives({ status: 'pending' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='tab-applied-proposal'>
      <Tabs defaultActiveKey='campaigns' onChange={callback}>
        {/* campaigns tab */}
        <TabPane tab='Campaigns' key='projects'>
          {ProjectList(projects)}
        </TabPane>

        {AvailableTabs.map((o) => (
          <TabPane tab={o.label} key={o.value}>
            {creatives && creatives?.length != 0 ? (
              creatives.map((obj) => ProjectCreatives(obj))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

const mapStateToProps = ({ CreatorProjects, CreatorCreatives }) => ({
  projects: CreatorProjects.list,
  creatives: CreatorCreatives.list,
});

export default connect(mapStateToProps)(InfluncerCreativeApprovalTab);
