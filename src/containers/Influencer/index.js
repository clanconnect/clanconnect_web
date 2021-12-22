import React, { useState, useEffect } from "react";
import Header from "components/DemoHeader";
import SideNav from "components/DemoSideNav";
import { useParams } from "react-router-dom";
import "./styles.scss";
import { ACTIONS as PROJECT_ACTIONS } from "redux/creators/projects/actions";
import { ACTIONS as CREATIVE_ACTIONS } from "redux/creators/creatives/actions";
import { connect } from "react-redux";
import DownLoadedFile from "components/DownLoadedFile";
import { Tabs, Empty, Collapse, Row, Col } from "antd";

const InfluencerPage = ({ creatives, projects, dispatch }) => {
  const [activeTab, setActiveTab] = useState("Creatives");
  const { id } = useParams();
  const loadProjects = ({ proposalStatus }) => {
    dispatch({
      type: PROJECT_ACTIONS.BY_PROJECT_ID,
      payload: { query: { proposalStatus: "accepted", include: "creatives" } ,id},
    });

    const handleActiveTab = (index) => {
      setActiveTab(index);
    };
  }
  const loadCreatives = ({ status }) => {
    dispatch({
      type: CREATIVE_ACTIONS.GET_BY_ID,
      payload: { query: { status:null, include: "project"},id },
    });
  };
  function callback(key) {
    loadProjects({ proposalStatus: "accepted" });
    loadCreatives({ status: '' });
  }
  useEffect(() => {
    callback("pending");
  }, []);
  return (
    <div className="main-wrapper-influncer">
      <Header />
      <div className="flex top-space-commom">
        <SideNav />
        <div className="content-wrapper">
          <div className="tabs-container">
            <div>
            <div className={`brand-list brand-list-card`}>
              <div className="brand-list-img">
                <img src={projects.coverPictureUrl} alt="" />
              </div>
              <div className={`brand-content`}>
                <div className="brand-list-content">
                  <span className="list-title">{projects.title}</span>
                </div>
              </div>
            </div>
            <div className="open-container">
              <Row className="file-influencer-row">
                {creatives.length !== 0 ? (
                  creatives[0]?.creatives.map((creative) => (
                    <Col xs={24} md={8} sm={12} lg={6}  key={creative?.id} style={{position:'relative'}} className={`main-creatives-${creative?.status} project-influncer-file-container`}>
                      <DownLoadedFile
                        creative={creative}
                        key={`creative-${creative?.id}`}
                        project={projects}
                        projectCard={{"status":true,"creative-status":creative?.status}}
                      />
                    </Col>
                  ))
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </Row>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ CreatorProjects, CreatorCreatives }) => ({
  projects: CreatorProjects.list,
  creatives: CreatorCreatives.list,
});

export default connect(mapStateToProps)(InfluencerPage);
// export default InfluencerPage;
