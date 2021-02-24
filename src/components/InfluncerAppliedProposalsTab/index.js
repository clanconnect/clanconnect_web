import React from 'react';
import { Tabs } from 'antd';

import BrandListCard from '../BrandListCard';
import img1 from 'assets/images/inf1.png';
import demo from 'assets/images/project1.jpg';
import influencer from 'assets/images/influencer.jpg';

import './styles.scss';

const influencerPendingList = [
  {
    name: 'Nestle Advertisement',
    img: demo,
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
              <BrandListCard
                name={list.name}
                uploadCreative
                img={list.img}
                disabled
              />
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
