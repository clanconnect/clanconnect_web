import React from 'react';
import { Tabs } from 'antd';

import BrandListCard from '../BrandListCard';
import img1 from 'assets/images/inf1.png';
import img2 from 'assets/images/inf2.jpeg';
import influencer from 'assets/images/influencer.jpg';

import './styles.scss';

const influencerPendingList = [
  {
    name: 'Influencer Name Here',
    img: img1,
  },
  {
    name: 'Influencer Name Here',
    img: influencer,
  },
  {
    name: 'Influencer Name Here',
    img: img1,
  },
];

const influencerApprovalList = [
  {
    name: 'Influencer Name Here',
    img: img2,
  },
  {
    name: 'Influencer Name Here',
    img: influencer,
  },
  {
    name: 'Influencer Name Here',
    img: img1,
  },
];

const influencerRejectedList = [
  {
    name: 'Influencer Name Here',
    img: img2,
  },
  {
    name: 'Influencer Name Here',
    img: img2,
  },
  {
    name: 'Influencer Name Here',
    img: img1,
  },
];
const ProposalsTabData = ({
  defaultActiveKey,
  getProposals,
  proposalDetails,
}) => {
  const { TabPane } = Tabs;

  // console.log(proposalDetails, 'user');
  return (
    <div className='tab-proposal'>
      <Tabs
        defaultActiveKey={defaultActiveKey}
        onChange={(key) => getProposals(key)}
      >
        <TabPane tab='Pending' key='sent'>
          <div id='sent'>
            {proposalDetails != 0 ? (
              proposalDetails &&
              proposalDetails.map((data, index) => {
                return [data.user].map((list, i) => {
                  return (
                    <BrandListCard
                      name={list?.name}
                      img={list?.imageUrl}
                      key={i}
                    />
                  );
                });
              })
            ) : (
              <div className='empty-state'>
                <p>No Data Available</p>
              </div>
            )}
          </div>
        </TabPane>
        <TabPane tab='Approved' key='accepted'>
          {proposalDetails != 0 ? (
            proposalDetails &&
            proposalDetails.map((data, index) => {
              return [data.user].map((list, i) => {
                return (
                  <BrandListCard
                    name={list?.name}
                    img={list?.imageUrl}
                    key={i}
                  />
                );
              });
            })
          ) : (
            <div className='empty-state'>
              <p>No Data Available</p>
            </div>
          )}
        </TabPane>
        <TabPane tab='Rejected' key='rejected'>
          {proposalDetails != 0 ? (
            proposalDetails &&
            proposalDetails.map((data, index) => {
              return [data.user].map((list, i) => {
                return (
                  <BrandListCard
                    name={list?.name}
                    img={list?.imageUrl}
                    key={i}
                  />
                );
              });
            })
          ) : (
            <div className='empty-state'>
              <p>No Data Available</p>
            </div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProposalsTabData;
