import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { useParams } from 'react-router-dom';

import BrandListCard from '../BrandListCard';
import img1 from 'assets/images/inf1.png';
import img2 from 'assets/images/inf2.jpeg';
import influencer from 'assets/images/influencer.jpg';
import { getProposalsAction } from 'redux/brands/proposals/actions';

import './styles.scss';
import { useDispatch } from 'react-redux';

const ProposalsTabData = ({
  defaultActiveKey,
  getProposals,
  proposalDetails,
}) => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    let params = {
      include: 'user',
      status: 'sent',
    };
    dispatch(getProposalsAction({ params, id }));
  }, []);

  //console.log(proposalDetails, 'user');
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
                      img={list?.image}
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
                  <BrandListCard name={list?.name} img={list?.image} key={i} />
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
                  <BrandListCard name={list?.name} img={list?.image} key={i} />
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
