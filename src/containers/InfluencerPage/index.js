import React, { useState } from "react";
import Header from "components/DemoHeader";
import SideNav from "components/DemoSideNav";
import LineHeading from "components/LineHeading";
import InfluncerAppliedProposalsTab from "components/InfluncerAppliedProposalsTab";
import InfluncerCreativeApprovalTab from "components/InfluncerCreativeApprovalTab";

import { myTabs } from "./dataManager";

import "./styles.scss";

const InfluencerPage = (props) => {
  const [activeTab, setActiveTab] = useState("Applied Proposals");

  const handleActiveTab = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="main-wrapper-influncer">
      <Header />
      <div className="flex top-space-commom">
        <SideNav />
        <div className="content-wrapper">
          <LineHeading title="Invites" />
          <div className="tabs-container">
            <div className="con-mb">
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

            {activeTab === "Creatives" && <InfluncerCreativeApprovalTab />}
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
