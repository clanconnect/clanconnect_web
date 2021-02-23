import React, { useState } from 'react';
import Header from 'components/DemoHeader';
import SideNav from 'components/DemoSideNav';
import Breadcrumb from 'components/Breadcrumb';
import ProjectDetailsCard from 'components/ProjectDetailsCard';
import SnapshotTabData from 'components/SnapshotTabData';
import ProposalsTabData from 'components/ProposalsTabData';
import CreativeApprovalData from 'components/CreativeApprovalData';

import { myTabs } from './dataManager';

import './styles.scss';

const ProjectDetails = (props) => {
  const [activeTab, setActiveTab] = useState('Snapshot');
  const [defaultActiveKeyProposals, setDefaultActiveKeyProposals] = useState(
    'proposalPending'
  );
  const [defaultActiveKeyCreative, setDefaultActiveKeyCreative] = useState(
    'creativeApproved'
  );

  const handleActiveTab = (index) => {
    setActiveTab(index);
  };

  const handleTabs = (val) => {
    if (
      val === 'proposalPending' ||
      val === 'proposalApproved' ||
      val === 'proposalRejected'
    ) {
      setDefaultActiveKeyProposals(val);
      setActiveTab('Proposals');
    } else {
      setDefaultActiveKeyCreative(val);
      setActiveTab('Creative Approval');
    }
  };

  return (
    <div className='main-wrapper'>
      <Header />
      <div className='flex top-space-commom'>
        <SideNav />
        <div className='content-wrapper'>
          <Breadcrumb text={`Nestle Advertisement > Project Details`} />
          <ProjectDetailsCard />
          <div className='tabs-container'>
            <div className='con-mb'>
              {myTabs.map((tab, index) => (
                <button
                  className={`tabs-btn ${
                    activeTab === tab.name ? 'active-tab' : null
                  }`}
                  onClick={() => handleActiveTab(tab.name)}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {activeTab == 'Snapshot' && (
              <div className='flex justify-between mobile-res'>
                <SnapshotTabData handleTabs={handleTabs} />
              </div>
            )}

            {activeTab == 'Proposals' && (
              <ProposalsTabData defaultActiveKey={defaultActiveKeyProposals} />
            )}

            {activeTab == 'Creatives Approval' && (
              <CreativeApprovalData
                defaultActiveKey={defaultActiveKeyCreative}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
