import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from 'antd';

import InfluncerFile from '../InfluncerFile';
import { getCreativesAction } from 'redux/brands/creatives/actions';

import {
  influncerNameDataApproved,
  influncerNameDataPending,
  influncerNameDataRejected,
} from 'common/dataManager';

import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';

const CreativeApprovalData = ({
  defaultActiveKey,
  getCreatives,
  creativeDetails,
}) => {
  const { TabPane } = Tabs;
  let { id } = useParams();
  const dispatch = useDispatch();
  const [showSelectAllActive, setShowSelectAllActive] = useState(false);
  const [checkedArray, setCheckedArray] = useState([]);

  const onClickSelect = (value) => {
    setShowSelectAllActive(value);
  };

  const handleCheckAll = () => {
    creativeDetails.forEach(({ creatives }) => {
      setCheckedArray([...checkedArray, ...creatives.map(({ id }) => id)]);
    });
  };

  useEffect(() => {
    let params = {
      include: 'media,user',
      status: 'sent',
    };
    dispatch(getCreativesAction({ params, id }));
  }, []);

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
                    onClick={handleCheckAll}
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
            creativeDetails={creativeDetails}
          />
        </TabPane>
        <TabPane tab='Approved (11)' key='accepted'>
          <div className='btn-row'>
            <div>
              {showSelectAllActive ? (
                <>
                  <button className='outline-btn bg-green'>Select All</button>
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
            creativeDetails={creativeDetails}
          />
        </TabPane>

        <TabPane tab='Rejected (21)' key='rejected'>
          <div className='btn-row'>
            <div>
              {showSelectAllActive ? (
                <>
                  <button className='outline-btn bg-green'>Select All</button>
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
            creativeDetails={creativeDetails}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CreativeApprovalData;
