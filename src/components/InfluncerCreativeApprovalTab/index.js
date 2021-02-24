import React from 'react';
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

import BrandListCard from '../BrandListCard';
import DownLoadedFile from '../DownLoadedFile';
import { compaignData } from 'common/dataManager';
import routeConstants from 'common/routeConstants';
import img1 from 'assets/images/project1.jpg';
import img2 from 'assets/images/inf2.jpeg';
import influencer from 'assets/images/influencer.jpg';

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
        {/* <TabPane tab='Campaigns' key='campaigns'>
          <BrandListCard name='Influencer Name Here rejected' img={ } uploadCreative />
        </TabPane> */}

        {/* pending tab */}
        <TabPane tab='Pending(12)' key='pending'>
          {compaignData.map((list, index) => (
            <div>
              <BrandListCard name={list.name} uploadCreative img={list.img} />

              <div className='file-influencer-row'>
                {list.imgData.map((fileData, index) => (
                  <DownLoadedFile fileData={fileData} />
                ))}
              </div>

              <Link to={routeConstants.allCreativesLists}>
                <div className='mt-30'>
                  <p className='view-title'>
                    View all creatives <RightOutlined />
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </TabPane>

        {/* accepted tab */}
        <TabPane tab='Approved(11)' key='accepted'>
          {compaignData.map((list, index) => (
            <div>
              <BrandListCard name={list.name} uploadCreative img={list.img} />

              <div className='file-influencer-row'>
                {list.imgData.map((fileData, index) => (
                  <DownLoadedFile fileData={fileData} />
                ))}
              </div>

              <Link to={routeConstants.allCreativesLists}>
                <div className='mt-30'>
                  <p className='view-title'>
                    View all creatives <RightOutlined />
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </TabPane>

        {/* rejected tab */}
        <TabPane tab='Rejected(3)' key='rejected'>
          {compaignData.map((list, index) => (
            <div>
              <BrandListCard name={list.name} uploadCreative img={list.img} />

              <div className='file-influencer-row'>
                {list.imgData.map((fileData, index) => (
                  <DownLoadedFile fileData={fileData} />
                ))}
              </div>

              <Link to={routeConstants.allCreativesLists}>
                <div className='mt-30'>
                  <p className='view-title'>
                    View all creatives <RightOutlined />
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default InfluncerCreativeApprovalTab;
