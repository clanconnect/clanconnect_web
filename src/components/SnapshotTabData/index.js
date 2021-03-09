import React from 'react';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

import './styles.scss';

const SnapshotTabData = ({ handleTabs, handleCreativeTabs, projectDetail }) => {
  return (
    <>
      <div className='snapshot-card'>
        <div className='snapshot-card-row'>
          <h3 className='snapshot-card-title'>Proposals</h3>
          <div className='text-right'>
            <span className='number'>
              {projectDetail?.stats?.proposals?.total}
            </span>
            <p className='title'>Total reviewed</p>
          </div>
        </div>
        <div className='snapshot-card-row'>
          <div
            className='text-center cursor-pointer'
            onClick={() => handleTabs('accepted')}
          >
            <div className='title bold '>
              <span>Accepted</span> <RightOutlined />
            </div>
            <p className='number accepted pr-10'>
              {projectDetail?.stats?.proposals?.accepted}
            </p>
          </div>

          <div
            className='text-center cursor-pointer'
            onClick={() => handleTabs('sent')}
          >
            <div className='title bold'>
              <span>Pending</span> <RightOutlined />
            </div>
            <p className='number pending pr-10'>
              {projectDetail?.stats?.proposals?.pending}
            </p>
          </div>

          <div
            className='text-center cursor-pointer'
            onClick={() => handleTabs('rejected')}
          >
            <div className='title bold'>
              <span>Rejected</span> <RightOutlined />
            </div>
            <p className='number rejected pr-10'>
              {projectDetail?.stats?.proposals?.rejected}
            </p>
          </div>
        </div>
      </div>

      <div className='snapshot-card'>
        <div className='snapshot-card-row'>
          <h3 className='snapshot-card-title'>Creatives</h3>
          <div className='text-right'>
            <span className='number'>
              {projectDetail?.stats?.creatives?.total}
            </span>
            <p className='title'>Total reviewed</p>
          </div>
        </div>
        <div className='snapshot-card-row'>
          <div
            className='text-center cursor-pointer'
            onClick={() => handleCreativeTabs('accepted')}
          >
            <span className='title bold '>
              Approved <RightOutlined />
            </span>
            <p className='number accepted pr-10'>
              {projectDetail?.stats?.creatives?.accepted}
            </p>
          </div>

          <div
            className='text-center cursor-pointer'
            onClick={() => handleCreativeTabs('sent')}
          >
            <span className='title bold'>
              Pending <RightOutlined />
            </span>
            <p className='number pending pr-10'>
              {projectDetail?.stats?.creatives?.pending}
            </p>
          </div>

          <div
            className='text-center cursor-pointer'
            onClick={() => handleCreativeTabs('rejected')}
          >
            <span className='title bold'>
              Rejected <RightOutlined />
            </span>
            <p className='number rejected pr-10'>
              {projectDetail?.stats?.creatives?.rejected}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SnapshotTabData;
