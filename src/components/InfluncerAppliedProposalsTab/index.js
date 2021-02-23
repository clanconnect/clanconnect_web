import React from 'react';
import { Tabs } from 'antd';

import BrandListCard from '../BrandListCard';
import img1 from 'assets/images/inf1.png';
import img2 from 'assets/images/inf2.jpeg';
import influencer from 'assets/images/influencer.jpg';

import './styles.scss';

const influencerPendingList = [
  {
    name: 'Nestle Advertisement',
    img: img1,
  },
  {
    name: 'Campaign name Three',
    img: influencer,
  },
  {
    name: 'Campaign name Four',
    img: img1,
  },
  {
    name: 'Campaign name Five',
    img: img1,
  },
];

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
            {influencerPendingList.map((list, index) => (
              <BrandListCard name={list.name} uploadCreative img={list.img} />
            ))}
          </div>
        </TabPane>
        <TabPane tab='Approved' key='accepted'>
          {influencerPendingList.map((list, index) => (
            <BrandListCard name={list.name} uploadCreative img={list.img} />
          ))}
        </TabPane>
        <TabPane tab='Revised Quote Requests' key='request'>
          {influencerPendingList.map((list, index) => (
            <BrandListCard name={list.name} uploadCreative img={list.img} />
          ))}
        </TabPane>
        <TabPane tab='Rejected' key='rejected'>
          {influencerPendingList.map((list, index) => (
            <BrandListCard name={list.name} uploadCreative img={list.img} />
          ))}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default InfluncerAppliedProposalsTab;
