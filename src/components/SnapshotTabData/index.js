import React from 'react';
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

import './styles.scss';

const SnapshotTabData = ({ handleTabs }) => {
  return (
    <>
      <div className='snapshot-card'>
        <div className='snapshot-card-row'>
          <h3 className='snapshot-card-title'>Proposals</h3>
          <div className='text-right'>
            <span className='number'>24</span>
            <p className='title'>Total reviewed</p>
          </div>
        </div>
        <div className='snapshot-card-row'>
          <div
            className='text-center'
            onClick={() => handleTabs('proposalApproved')}
          >
            <div className='title bold '>
              <span>Accepted</span> <RightOutlined />
            </div>
            <p className='number accepted pr-10'>10</p>
          </div>

          <div
            className='text-center'
            onClick={() => handleTabs('proposalPending')}
          >
            <div className='title bold'>
              <span>Pending</span> <RightOutlined />
            </div>
            <p className='number pending pr-10'>10</p>
          </div>

          <div
            className='text-center'
            onClick={() => handleTabs('proposalRejected')}
          >
            <div className='title bold'>
              <span>Rejected</span> <RightOutlined />
            </div>
            <p className='number rejected pr-10'>10</p>
          </div>
        </div>
      </div>

      <div className='snapshot-card'>
        <div className='snapshot-card-row'>
          <h3 className='snapshot-card-title'>Creatives</h3>
          <div className='text-right'>
            <span className='number'>26</span>
            <p className='title'>Total reviewed</p>
          </div>
        </div>
        <div className='snapshot-card-row'>
          <div
            className='text-center'
            onClick={() => handleTabs('creativeApproved')}
          >
            <span className='title bold '>
              Approved <RightOutlined />
            </span>
            <p className='number accepted pr-10'>10</p>
          </div>

          <div
            className='text-center'
            onClick={() => handleTabs('creativePending')}
          >
            <span className='title bold'>
              Pending <RightOutlined />
            </span>
            <p className='number pending pr-10'>10</p>
          </div>

          <div
            className='text-center'
            onClick={() => handleTabs('creativeRejected')}
          >
            <span className='title bold'>
              Rejected <RightOutlined />
            </span>
            <p className='number rejected pr-10'>3</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SnapshotTabData;
