import React, { useEffect } from "react";
import "./styles.scss";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { RightOutlined } from "@ant-design/icons";
import ProjectListCard from "../ProjectListCard";
import DownLoadedFile from "../DownLoadedFile";
import routeConstants from "common/routeConstants";
import { ACTIONS as PROJECT_ACTIONS } from "redux/creators/projects/actions";
import { ACTIONS as CREATIVE_ACTIONS } from "redux/creators/creatives/actions";

const ProjectList = (projects) => {
  return projects.map((project) => (
    <ProjectListCard
      project={project}
      key={`projects-${project.id}`}
      creatives={[]}
    />
  ));
};

const ProjectCreatives = ({ project, creatives }) => (
  <div>
    <ProjectListCard project={project} creatives={creatives} />

    <div className="file-influencer-row">
      {creatives.map((creative) => (
        <DownLoadedFile creative={creative} key={`creative-${creative.id}`} />
      ))}
    </div>

    {creatives.length ? (
      <Link to={routeConstants.allCreativesLists}>
        <div className="mt-30">
          <p className="view-title">
            View all creatives <RightOutlined />
          </p>
        </div>
      </Link>
    ) : null}
  </div>
);

const AvailableTabs = [
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

const InfluncerCreativeApprovalTab = ({ creatives, projects, dispatch }) => {
  const { TabPane } = Tabs;

  function callback(key) {
    if (key === "projects") {
      loadProjects({ status: "ongoing" });
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
      payload: { query: { status, include: "project" } },
    });
  };

  useEffect(() => {
    loadProjects({ status: "ongoing" });
    loadCreatives({ status: "pending" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tab-applied-proposal">
      <Tabs defaultActiveKey="campaigns" onChange={callback}>
        {/* campaigns tab */}
        <TabPane tab="Campaigns" key="projects">
          {ProjectList(projects)}
        </TabPane>

        {AvailableTabs.map((o) => (
          <TabPane tab={o.label} key={o.value}>
            {creatives.map((obj) => ProjectCreatives(obj))}
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
