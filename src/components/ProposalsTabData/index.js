import React from 'react';
import { Tabs } from 'antd';

import BrandListCard from '../BrandListCard';

import './styles.scss';

const ProposalsTabData = ({ defaultActiveKey }) => {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }
  return (
    <div className='tab-proposal'>
      <Tabs defaultActiveKey={defaultActiveKey} onChange={callback}>
        <TabPane tab='Pending' key='proposalPending'>
          <div id='pending'>
            <BrandListCard name='Influencer Name Here pending' />
          </div>
        </TabPane>
        <TabPane tab='Approved' key='proposalApproved'>
          <BrandListCard name='Influencer Name Here approved' />
        </TabPane>
        <TabPane tab='Rejected' key='proposalRejected'>
          <BrandListCard name='Influencer Name Here rejected' />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProposalsTabData;
