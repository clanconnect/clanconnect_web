import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Tabs } from "antd";
import BrandListCard from "../BrandListCard";
import { connect } from "react-redux";
import { ACTIONS } from "redux/creators/projects/actions";

const AvailableTabs = [
  { label: "Pending", value: "in-review" },
  { label: "Approved", value: "ongoing" },
  { label: "Revised Quote Requests", value: "financial-review" },
  { label: "Rejected", value: "rejected" },
];

const ProjectList = (projects) => {
  return projects.map((project) => (
    <BrandListCard
      name={project.title}
      uploadCreative
      img={project.coverPictureUrl}
      disabled
    />
  ));
};

const InfluncerAppliedProposalsTab = ({ list, dispatch }) => {
  const { TabPane } = Tabs;
  const [projects, setProjects] = useState(list);

  function onTabChange(key) {
    loadProjects({ status: key });
  }

  const loadProjects = ({ status }) => {
    setProjects([]);
    dispatch({ type: ACTIONS.GET_INDEX, payload: { query: { status } } });
  };

  useEffect(() => {
    loadProjects({ status: AvailableTabs[0].value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => setProjects(list), [list]);

  return (
    <div className="tab-applied-proposal">
      <Tabs defaultActiveKey="pending" onChange={onTabChange}>
        {AvailableTabs.map((tab) => (
          <TabPane tab={tab.label} key={tab.value}>
            {ProjectList(projects)}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

const mapStateToProps = ({ CreatorProjects }) => ({
  list: CreatorProjects.list,
});

export default connect(mapStateToProps)(InfluncerAppliedProposalsTab);
