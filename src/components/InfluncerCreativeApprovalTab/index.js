import React from 'react';
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

import BrandListCard from '../BrandListCard';
import DownLoadedFile from '../DownLoadedFile';
import { influncerNameDataApproved } from 'common/dataManager';
import routeConstants from 'common/routeConstants';

import './styles.scss';

const InfluncerCreativeApprovalTab = ({ defaultActiveKey }) => {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }
  return (
    <div className='tab-applied-proposal'>
      <Tabs defaultActiveKey='campaigns' onChange={callback}>
        {/* campaigns tab */}
        <TabPane tab='Campaigns' key='campaigns'>
          <BrandListCard name='Influencer Name Here rejected' uploadCreative />
        </TabPane>

        {/* accepted tab */}
        <TabPane tab='Approved(11)' key='accepted'>
          <div id='accepted'>
            <BrandListCard name='Influencer Name Here pending' uploadCreative />
            <DownLoadedFile
              influncerNameData={influncerNameDataApproved}
              influencerStatus
            />
            <Link to={routeConstants.allCreativesLists}>
              <div className='mt-30'>
                <p className='view-title'>
                  View all creatives <RightOutlined />
                </p>
              </div>
            </Link>
          </div>
        </TabPane>

        {/* pending tab */}
        <TabPane tab='Pending(12)' key='pending'>
          <div id='pending'>
            <BrandListCard name='Influencer Name Here pending' uploadCreative />
            <DownLoadedFile influncerNameData={influncerNameDataApproved} />
            <Link to={routeConstants.allCreativesLists}>
              <div className='mt-30'>
                <p className='view-title'>
                  View all creatives <RightOutlined />
                </p>
              </div>
            </Link>
          </div>
        </TabPane>

        {/* rejected tab */}
        <TabPane tab='Rejected(3)' key='rejected'>
          <div id='rejected'>
            <BrandListCard name='Influencer Name Here pending' uploadCreative />
            <DownLoadedFile influncerNameData={influncerNameDataApproved} />
            <Link to={routeConstants.allCreativesLists}>
              <div className='mt-30'>
                <p className='view-title'>
                  View all creatives <RightOutlined />
                </p>
              </div>
            </Link>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default InfluncerCreativeApprovalTab;
