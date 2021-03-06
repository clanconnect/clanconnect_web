import React, { useState } from 'react';
import { Tabs } from 'antd';

import InfluncerFile from '../InfluncerFile';

import {
  influncerNameDataApproved,
  influncerNameDataPending,
  influncerNameDataRejected,
} from 'common/dataManager';

import './styles.scss';

const CreativeApprovalData = ({
  defaultActiveKey,
  getCreatives,
  creativeDetails,
}) => {
  const { TabPane } = Tabs;
  const [showSelectAllActive, setShowSelectAllActive] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  function callback(key) {
    console.log(key);
  }

  const onClickSelect = (value) => {
    setShowSelectAllActive(value);
  };

  const handleAllChecked = () => {
    setAllChecked(!allChecked);
  };

  console.log(creativeDetails, 'data creative');

  return (
    <div className='tab-creative'>
      <Tabs
        defaultActiveKey={defaultActiveKey}
        onChange={(key) => getCreatives(key)}
      >
        <TabPane tab='Pending (22)' key='sent'>
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
                  <button
                    className='outline-btn bg-green-outline'
                    onClick={() => onClickSelect(false)}
                  >
                    Approved
                  </button>
                  <button
                    className='outline-btn bg-red'
                    onClick={() => onClickSelect(false)}
                  >
                    Reject
                  </button>
                </>
              ) : (
                <button
                  className='outline-btn bg-green'
                  onClick={() => onClickSelect(true)}
                >
                  Select
                </button>
              )}
            </div>
            {/* <button className='outline-btn bg-blue'>Done</button> */}
          </div>
          <InfluncerFile
            influncerNameData={influncerNameDataPending}
            showSelectAllActive={showSelectAllActive}
            allChecked={allChecked}
          />
        </TabPane>
        <TabPane tab='Approved (11)' key='accepted'>
          <div className='btn-row'>
            <div>
              {showSelectAllActive ? (
                <>
                  <button
                    className='outline-btn bg-green'
                    onClick={() => handleAllChecked()}
                  >
                    {!allChecked ? 'Select All' : 'Unselect All'}
                  </button>
                  <button
                    className='outline-btn bg-red'
                    onClick={() => onClickSelect(false)}
                  >
                    Reject
                  </button>
                </>
              ) : (
                <button
                  className='outline-btn bg-green'
                  onClick={() => onClickSelect(true)}
                >
                  Select
                </button>
              )}
            </div>
            {/* <button className='outline-btn bg-blue'>Done</button> */}
          </div>
          <InfluncerFile
            influncerNameData={influncerNameDataApproved}
            showSelectAllActive={showSelectAllActive}
            allChecked={allChecked}
          />
        </TabPane>

        <TabPane tab='Rejected (21)' key='rejected'>
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
                  <button
                    className='outline-btn bg-green-outline'
                    onClick={() => onClickSelect(false)}
                  >
                    Approved
                  </button>
                </>
              ) : (
                <button
                  className='outline-btn bg-green'
                  onClick={() => onClickSelect(true)}
                >
                  Select
                </button>
              )}
            </div>
            {/* <button className='outline-btn bg-blue'>Done</button> */}
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
