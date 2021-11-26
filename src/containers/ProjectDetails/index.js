import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import queryString from "query-string";
import Header from "components/DemoHeader";
import SideNav from "components/DemoSideNav";
import Breadcrumb from "components/Breadcrumb";
import ProjectDetailsCard from "components/ProjectDetailsCard";
import CreativeApprovalData from "components/CreativeApprovalData";
import { getProjectsAction } from "redux/brands/projects/actions";
import { getProposalsAction } from "redux/brands/proposals/actions";
import { getCreativesAction } from "redux/brands/creatives/actions";
import { useDispatch, useSelector } from "react-redux";
import LineHeading from "components/LineHeading";

import "./styles.scss";

const ProjectDetails = (props) => {
  let { id } = useParams();
  const { status } = queryString.parse(props.location.search);
  const defaultActiveKeyCreativeTabStatus = status;
  const dispatch = useDispatch();
  const { projectDetail } = useSelector((store) => store.projects);
  const { creativeDetails } = useSelector((store) => store.creatives);

  const [activeTab, setActiveTab] = useState("Creatives Approval");
  const [defaultActiveKeyProposals, setDefaultActiveKeyProposals] =
    useState("sent");
  const [defaultActiveKeyCreative, setDefaultActiveKeyCreative] = useState(
    defaultActiveKeyCreativeTabStatus || "pending"
  );
  console.log(defaultActiveKeyCreative);
  const handleActiveTab = (index) => {
    setActiveTab(index);
  };

  const handleTabs = (val) => {
    if (val === "sent" || val === "accepted" || val === "rejected") {
      setDefaultActiveKeyProposals(val);
      setActiveTab("Proposals");
      let params = {
        include: "user",
        status: val,
      };
      dispatch(getProposalsAction({ params, id }));
    }
  };

  const handleCreativeTabs = (val) => {
    if (val === "pending" || val === "accepted" || val === "rejected") {
      setDefaultActiveKeyCreative(val);
      setActiveTab("Creatives Approval");
      let params = {
        include: "media,user",
        status: val,
      };
      dispatch(getCreativesAction({ params, id }));
    }
  };

  useEffect(() => {
    let params = {
      include: "stats",
    };
    dispatch(getProjectsAction({ params, id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProposals = (status) => {
    let params = {
      include: "user",
      status,
    };
    dispatch(getProposalsAction({ params, id }));
  };

  const getCreatives = (status) => {
    let params = {
      include: "media,user",
      status,
    };
    dispatch(getCreativesAction({ params, id }));
  };

  return (
    <div className="main-wrapper">
      <Header />
      <div className="flex top-space-commom">
        <SideNav />
        <div className="content-wrapper">
          <Breadcrumb text={`${projectDetail.title} > Project Details`} />
          <ProjectDetailsCard projectDetail={projectDetail} />

          <div className="tabs-container">
            <div className="view-link">
              <a
                href={`${process.env.REACT_APP_WEB_HOST}/clan_project_show?id=${projectDetail.id}`}
                target={`ClanconnectProjectDetailPage-${projectDetail.id}`}
              >
                Go to Project Detail Page
              </a>
            </div>
            <LineHeading title="Creatives Approval" />

            <CreativeApprovalData
              defaultActiveKey={defaultActiveKeyCreative}
              getCreatives={getCreatives}
              creativeDetails={creativeDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
