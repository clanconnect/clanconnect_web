import React, { useState } from 'react';
import { Tabs } from 'antd';

import InfluncerFile from '../InfluncerFile';
import {
  influncerNameDataApproved,
  influncerNameDataPending,
  influncerNameDataRejected,
} from './dataManager';

import './styles.scss';

const CreativeApprovalData = ({ defaultActiveKey }) => {
  const { TabPane } = Tabs;
  const [showSelectAllActive, setShowSelectAllActive] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  function callback(key) {
    console.log(key);
  }

  const onClickSelect = () => {
    setShowSelectAllActive(true);
  };

  const handleAllChecked = () => {
    setAllChecked(true);
  };

  return (
    <div className='tab-creative'>
      <Tabs defaultActiveKey={defaultActiveKey} onChange={callback}>
        <TabPane tab='Approved (11)' key='creativeApproved'>
          <div className='btn-row'>
            <div>
              {showSelectAllActive ? (
                <>
                  <button
                    className='outline-btn bg-green'
                    onClick={handleAllChecked}
                  >
                    Select All
                  </button>
                  <button className='outline-btn bg-red'>Reject</button>
                </>
              ) : (
                <button
                  className='outline-btn bg-green'
                  onClick={onClickSelect}
                >
                  Select
                </button>
              )}
            </div>
            <button className='outline-btn bg-blue'>Done</button>
          </div>
          <InfluncerFile
            influncerNameData={influncerNameDataApproved}
            showSelectAllActive={showSelectAllActive}
            allChecked={allChecked}
          />
        </TabPane>
        <TabPane tab='Pending (22)' key='creativePending'>
          <div className='btn-row'>
            <div>
              {showSelectAllActive ? (
                <>
                  <button
                    className='outline-btn bg-green'
                    onClick={handleAllChecked}
                  >
                    Select All
                  </button>
                  <button className='outline-btn bg-green-outline'>
                    Approved
                  </button>
                  <button className='outline-btn bg-red'>Reject</button>
                </>
              ) : (
                <button
                  className='outline-btn bg-green'
                  onClick={onClickSelect}
                >
                  Select
                </button>
              )}
            </div>
            <button className='outline-btn bg-blue'>Done</button>
          </div>
          <InfluncerFile
            influncerNameData={influncerNameDataPending}
            showSelectAllActive={showSelectAllActive}
            allChecked={allChecked}
          />
        </TabPane>
        <TabPane tab='Rejected (21)' key='creativeRejected'>
          <div className='btn-row'>
            <div>
              {showSelectAllActive ? (
                <>
                  <button
                    className='outline-btn bg-green'
                    onClick={handleAllChecked}
                  >
                    Select All
                  </button>
                  <button className='outline-btn bg-green-outline'>
                    Approved
                  </button>
                </>
              ) : (
                <button
                  className='outline-btn bg-green'
                  onClick={onClickSelect}
                >
                  Select
                </button>
              )}
            </div>
            <button className='outline-btn bg-blue'>Done</button>
          </div>
          <InfluncerFile
            influncerNameData={influncerNameDataRejected}
            showSelectAllActive={showSelectAllActive}
            allChecked={allChecked}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CreativeApprovalData;
