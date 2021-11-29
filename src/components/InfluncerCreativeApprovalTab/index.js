import React, { useEffect } from "react";
import "./styles.scss";
import { Tabs, Empty, Collapse } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProjectListCard from "../ProjectListCard";
import DownLoadedFile from "../DownLoadedFile";
import routeConstant from "common/routeConstants";
import { ACTIONS as PROJECT_ACTIONS } from "redux/creators/projects/actions";
import { ACTIONS as CREATIVE_ACTIONS } from "redux/creators/creatives/actions";

const ProjectList = (projects) => {
  return projects.length !== 0 ? (
    projects
      .filter((project) => ["active", "ongoing"].includes(project.status))
      .map((project) => (
        <ProjectListCard
          project={project}
          key={`projects-${project.id}`}
          creatives={[]}
          disablePreviousVersionUpload={false}
          tabType="campaign"
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

const ProjectCreatives = ({ project, creatives }, index, tabType) => {
  return project.length !== 0 ? (
    tabType === "campaign" ? (
      <ProjectListCard
        key="project-list-card"
        project={project}
        creatives={creatives}
        className="shadow-none "
        rightspace
        tabType={tabType}
      />
    ) : (
      <div
        className="custom-project-collapse"
        key={`project-creatives-${project.id}`}
      >
        <div>
          <Collapse
            onChange={callback}
            expandIconPosition={"right"}
            accordion
            defaultActiveKey={[index === 0 ? project.id : ""]}
          >
            <Panel
              showArrow={true}
              key={project.id}
              header={
                <ProjectListCard
                  project={project}
                  creatives={creatives}
                  className="shadow-none "
                  rightspace
                  tabType={tabType}
                />
              }
            >
              <div className="open-container">
                <div className="file-influencer-row">
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
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>
    )
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  );
};

const AvailableTabs = [
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "accepted" },
  { label: "Rejected", value: "rejected" },
];

const InfluncerCreativeApprovalTab = ({ creatives, projects, dispatch }) => {
  const { TabPane } = Tabs;
  function callback(key) {
    if (key === "projects") {
      loadProjects({ proposalStatus: "accepted" });
    } else {
      loadCreatives({ status: key });
    }
  }

  const loadProjects = ({ proposalStatus }) => {
    dispatch({
      type: PROJECT_ACTIONS.GET_INDEX,
      payload: { query: { proposalStatus: "accepted", include: "creatives" } },
    });
  };

  const loadCreatives = ({ status }) => {
    dispatch({
      type: CREATIVE_ACTIONS.GET_INDEX,
      payload: { query: { status, include: "project" } },
    });
  };

  useEffect(() => {
    loadProjects({ proposalStatus: "accepted" });
    loadCreatives({ status: "pending" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const operations = (
    <Link to={routeConstant.allCreativesListsInfluencer}>
      <p className="cursor-pointer view-title">View all creatives</p>
    </Link>
  );

  const fetchNotScheduledCreatives = (projects) => {
    projects = projects.filter(({ creatives }) => creatives.length !== 0);

    projects = projects.filter(({ creatives }) => {
      (creatives || []).forEach((c) => {
        return !c.socials || (!c.socials.youtube && !c.socials.instagram);
      });
      return true;
    });

    projects = projects.map(({ creatives, project }) => {
      creatives = creatives.filter(
        (c) => !c.socials || (!c.socials.youtube && !c.socials.instagram)
      );
      return { project, creatives };
    });

    return projects;
  };

  const fetchScheduledCreatives = (projects) => {
    projects = projects.filter(({ creatives }) => creatives.length !== 0);

    projects = projects.filter(({ creatives }) => {
      (creatives || []).forEach(
        (c) => c.socials && (c.socials.youtube || c.socials.instagram)
      );
      return true;
    });

    projects = projects
      .map(({ creatives, project }) => {
        creatives = creatives.filter(
          (c) =>
            c.socials &&
            ((c.socials.youtube && !c.socials.youtube?.isUploaded) ||
              (c.socials.instagram && !c.socials.instagram.isUploaded))
        );
        return { project, creatives };
      })
      .filter(({ creatives }) => creatives.length > 0);

    return projects;
  };

  const fetchLiveCreatives = (projects) => {
    projects = projects.filter(({ creatives }) => creatives.length !== 0);

    projects = projects
      .map(({ creatives, project }) => {
        creatives = creatives.filter(
          (c) =>
            c.socials &&
            (c.socials?.youtube?.isUploaded || c.socials?.instagram?.isUploaded)
        );
        return { project, creatives };
      })
      .filter(({ creatives }) => creatives.length > 0);

    return projects;
  };

  const fetchCancelledCreatives = (projects) => {
    projects = projects.filter(({ creatives }) => creatives.length !== 0);

    projects = projects
      .map(({ creatives, project }) => {
        creatives = creatives.filter(
          (c) =>
            c.socials &&
            (c.socials?.youtube?.isErrored ||
              c.socials?.youtube?.cancelReason ||
              c.socials?.instagram?.isErrored ||
              c.socials?.instagram?.cancelReason)
        );
        return { project, creatives };
      })
      .filter(({ creatives }) => creatives.length > 0);

    return projects;
  };

  return (
    <div className="tab-applied-proposal">
      <Tabs
        className="tab-main"
        defaultActiveKey="campaigns"
        onChange={callback}
        tabBarExtraContent={operations}
      >
        {/* campaigns tab */}
        <TabPane tab="Campaigns" key="projects">
          {ProjectList(projects)}
        </TabPane>

        {AvailableTabs.map((o) => (
          <TabPane tab={o.label} key={o.value}>
            {o.value === "accepted" && (
              <Tabs className="tab-sub-tabs">
                <TabPane tab="Non-scheduled" key="non-scheduled">
                  {fetchNotScheduledCreatives(creatives).map((obj, index) => {
                    return ProjectCreatives(obj, index);
                  })}
                </TabPane>
                <TabPane tab="Scheduled" key="scheduled">
                  {fetchScheduledCreatives(creatives).map((obj, index) => {
                    return ProjectCreatives(obj, index);
                  })}
                </TabPane>
                <TabPane tab="Live" key="live">
                  {fetchLiveCreatives(creatives).map((obj, index) => {
                    return ProjectCreatives(obj, index);
                  })}
                </TabPane>
                <TabPane tab="Cancelled" key="cancelled">
                  {fetchCancelledCreatives(creatives).map((obj, index) => {
                    return ProjectCreatives(obj, index);
                  })}
                </TabPane>
              </Tabs>
            )}

            {o.value !== "accepted" && creatives && creatives?.length !== 0 ? (
              creatives
                .filter(({ creatives }) => creatives.length !== 0)
                .map((obj, index) => ProjectCreatives(obj, index))
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
