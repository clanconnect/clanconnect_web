import React, { useState, useEffect } from 'react';
import Header from 'components/DemoHeader';
import SideNav from 'components/DemoSideNav';
import Breadcrumb from 'components/Breadcrumb';
import ProjectDetailsCard from 'components/ProjectDetailsCard';
import SnapshotTabData from 'components/SnapshotTabData';
import ProposalsTabData from 'components/ProposalsTabData';
import CreativeApprovalData from 'components/CreativeApprovalData';
import { getProjectsAction } from 'redux/brands/projects/actions';
import { getProposalsAction } from 'redux/brands/proposals/actions';
import { getCreativesAction } from 'redux/brands/creatives/actions';

import { myTabs } from './dataManager';

import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';

const ProjectDetails = (props) => {
  const dispatch = useDispatch();
  const { projectDetail } = useSelector((store) => store.projects);
  const { proposalDetails } = useSelector((store) => store.proposals);
  const { creativeDetails } = useSelector((store) => store.creatives);

  const [activeTab, setActiveTab] = useState('Snapshot');
  const [defaultActiveKeyProposals, setDefaultActiveKeyProposals] = useState(
    'sent'
  );
  const [defaultActiveKeyCreative, setDefaultActiveKeyCreative] = useState(
    'sent'
  );

  const handleActiveTab = (index) => {
    setActiveTab(index);
  };

  const handleTabs = (val) => {
    if (val === 'sent' || val === 'accepted' || val === 'rejected') {
      setDefaultActiveKeyProposals(val);
      setActiveTab('Proposals');
      let params = {
        include: 'user',
        status: val,
      };
      dispatch(getProposalsAction(params));
    }
  };

  const handleCreativeTabs = (val) => {
    if (val === 'sent' || val === 'accepted' || val === 'rejected') {
      setDefaultActiveKeyProposals(val);
      setActiveTab('Creatives Approval');
    }
  };

  useEffect(() => {
    dispatch(getProjectsAction());
  }, []);

  const getProposals = (status) => {
    let params = {
      include: 'user',
      status,
    };
    dispatch(getProposalsAction({ params }));
  };

  const getCreatives = (status) => {
    let params = {
      include: 'media,user',
      status,
    };
    dispatch(getCreativesAction({ params }));
  };

  return (
    <div className='main-wrapper'>
      <Header />
      <div className='flex top-space-commom'>
        <SideNav />
        <div className='content-wrapper'>
          <Breadcrumb text={`Nestle Advertisement > Project Details`} />
          <ProjectDetailsCard projectDetail={projectDetail} />

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
                <SnapshotTabData
                  handleTabs={handleTabs}
                  handleCreativeTabs={handleCreativeTabs}
                />
              </div>
            )}

            {activeTab == 'Proposals' && (
              <ProposalsTabData
                defaultActiveKey={defaultActiveKeyProposals}
                getProposals={getProposals}
                proposalDetails={proposalDetails}
              />
            )}

            {activeTab == 'Creatives Approval' && (
              <CreativeApprovalData
                defaultActiveKey={defaultActiveKeyCreative}
                getCreatives={getCreatives}
                creativeDetails={creativeDetails}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
