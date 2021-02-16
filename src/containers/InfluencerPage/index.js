import React, { useState } from 'react';
import Header from 'components/DemoHeader';
import SideNav from 'components/DemoSideNav';
import LineHeading from 'components/LineHeading';
import Breadcrumb from 'components/Breadcrumb';
import ProjectDetailsCard from 'components/ProjectDetailsCard';
import SnapshotTabData from 'components/SnapshotTabData';
import ProposalsTabData from 'components/ProposalsTabData';
import CreativeApprovalData from 'components/CreativeApprovalData';

import { myTabs } from './dataManager';

import './styles.scss';

const InfluencerPage = (props) => {
  const [activeTab, setActiveTab] = useState('Applied Proposals');

  const handleActiveTab = (index) => {
    setActiveTab(index);
  };

  return (
    <div className='main-wrapper-influncer'>
      <Header />
      <div className='flex top-space-commom'>
        <SideNav />
        <div className='content-wrapper'>
          <LineHeading title='Invites' />
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

            {/* {activeTab == 'Applied Proposals' && (
              <div className='flex justify-between mobile-res'>
                <SnapshotTabData />
              </div>
            )}

            {activeTab == 'Creative Approval' && <ProposalsTabData />} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerPage;
