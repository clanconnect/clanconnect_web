import React, { useState } from "react";
import Header from "components/DemoHeader";
import SideNav from "components/DemoSideNav";
import LineHeading from "components/LineHeading";
import InfluncerCreativeApprovalTab from "components/InfluncerCreativeApprovalTab";

import { myTabs } from "./dataManager";

import "./styles.scss";

const InfluencerPage = (props) => {
  const [activeTab, setActiveTab] = useState("Creatives");

  const handleActiveTab = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="main-wrapper-influncer">
      <Header />
      <div className="flex top-space-commom">
        <SideNav />
        <div className="content-wrapper">
          {/* <LineHeading title="Invites" /> */}
          <div className="view-link">
            <a
              href={`${process.env.REACT_APP_WEB_HOST}/projects`}
              target="AppliedProposalsPage"
            >
              Go to Applied Proposals
            </a>
          </div>
          <div className="tabs-container">
            <LineHeading title="Creatives" />
            {/* <div className="con-mb">
              {myTabs.map((tab, index) => (
                <button
                  key={tab.name}
                  className={`tabs-btn ${
                    activeTab === tab.name ? "active-tab" : null
                  }`}
                  onClick={() => handleActiveTab(tab.name)}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {activeTab === "Applied Proposals" && (
              <div className="flex justify-between mobile-res">
                <InfluncerAppliedProposalsTab />
              </div>
            )}

            {activeTab === "Creatives" && <InfluncerCreativeApprovalTab />} */}
            <InfluncerCreativeApprovalTab />
          </div>
          {/* <LineHeading title='Ongoing Projects' style='mt-30' />
          <LineHeading title='Completed Projects' style='mt-30' />
          <LineHeading title='Drafts' style='mt-30' /> */}
        </div>
      </div>
    </div>
  );
};

export default InfluencerPage;
