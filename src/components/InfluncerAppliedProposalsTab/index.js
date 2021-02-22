import React from 'react';
import { Tabs } from 'antd';

import BrandListCard from '../BrandListCard';

import './styles.scss';

const InfluncerAppliedProposalsTab = ({ defaultActiveKey }) => {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }
  return (
    <div className='tab-applied-proposal'>
      <Tabs defaultActiveKey='pending' onChange={callback}>
        <TabPane tab='Pending' key='pending'>
          <div id='pending'>
            <BrandListCard name='Influencer Name Here pending' uploadCreative />
          </div>
        </TabPane>
        <TabPane tab='Approved' key='accepted'>
          <BrandListCard
            name='Revised Quote Requests Name Here approved'
            uploadCreative
          />
        </TabPane>
        <TabPane tab='Revised Quote Requests' key='request'>
          <BrandListCard name='Influencer Name Here rejected' uploadCreative />
        </TabPane>
        <TabPane tab='Rejected' key='rejected'>
          <BrandListCard name='Influencer Name Here rejected' uploadCreative />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default InfluncerAppliedProposalsTab;
