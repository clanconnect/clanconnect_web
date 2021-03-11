import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Empty } from 'antd';

import InfluncerFile from '../InfluncerFile';
import {
  getCreativesAction,
  creativeUpdateBulkAction,
} from 'redux/brands/creatives/actions';

import {
  influncerNameDataApproved,
  influncerNameDataPending,
  influncerNameDataRejected,
} from 'common/dataManager';

import './styles.scss';
import { useDispatch } from 'react-redux';

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
  const [selectedCreatives, setSelectedCreatives] = useState([]);

  const handleSelectAll = () => {
    const isSelected = isAllSelected();
    const uppdatedCreative = new Set(selectedCreatives);
    creativeDetails.forEach((data) => {
      data.creatives.map((creative) => {
        if (!isSelected && !uppdatedCreative.has(creative.id)) {
          uppdatedCreative.add(creative.id);
        } else if (isSelected && uppdatedCreative.has(creative.id)) {
          uppdatedCreative.delete(creative.id);
        }
      });
    });
    setSelectedCreatives(Array.from(uppdatedCreative));
  };

  const isAllSelected = () => {
    let isSelected = true;
    if (selectedCreatives.length === 0) {
      return false;
    }
    creativeDetails.forEach((data) => {
      data.creatives.map((creative) => {
        if (!selectedCreatives.includes(creative.id)) {
          isSelected = false;
        }
      });
    });
    return isSelected;
  };

  const onClickSelect = (value) => {
    setShowSelectAllActive(value);
  };

  const handleBulkCreatives = (status, currentStatus) => {
    dispatch(
      creativeUpdateBulkAction({
        creatives: selectedCreatives,
        status,
        id,
        currentStatus,
      })
    );
  };

  const handleCheckAll = () => {
    creativeDetails.forEach(({ creatives }) => {
      setCheckedArray([...checkedArray, ...creatives.map(({ id }) => id)]);
    });
  };

  useEffect(() => {
    let params = {
      include: 'media,user',
      status: 'pending',
    };
    dispatch(getCreativesAction({ params, id }));
  }, []);

  return (
    <div className='tab-creative'>
      <Tabs
        defaultActiveKey={defaultActiveKey}
        onChange={(key) => {
          getCreatives(key);
          setSelectedCreatives([]);
          setShowSelectAllActive(false);
        }}
      >
        <TabPane tab='Pending' key='pending'>
          {creativeDetails.length !== 0 && (
            <div className='btn-row'>
              <div>
                {showSelectAllActive ? (
                  <>
                    <button
                      className='outline-btn bg-green'
                      onClick={handleSelectAll}
                    >
                      {isAllSelected() ? 'Deselect All' : 'Select All'}
                    </button>
                    <button
                      className='outline-btn bg-green-outline'
                      onClick={() => {
                        onClickSelect(false);
                        handleBulkCreatives('accepted', 'pending');
                      }}
                    >
                      Approved
                    </button>
                    <button
                      className='outline-btn bg-red'
                      onClick={() => {
                        onClickSelect(false);
                        handleBulkCreatives('rejected', 'pending');
                      }}
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
          )}
          <InfluncerFile
            influncerNameData={influncerNameDataPending}
            showSelectAllActive={showSelectAllActive}
            creativeDetails={creativeDetails}
            selectedCreatives={selectedCreatives}
            setSelectedCreatives={setSelectedCreatives}
          />
          {creativeDetails.length === 0 && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </TabPane>
        <TabPane tab='Approved' key='accepted'>
          {creativeDetails.length !== 0 && (
            <div className='btn-row'>
              <div>
                {showSelectAllActive ? (
                  <>
                    <button className='outline-btn bg-green'>
                      {isAllSelected() ? 'Deselect All' : 'Select All'}
                    </button>
                    <button
                      className='outline-btn bg-red'
                      onClick={() => {
                        onClickSelect(false);
                        handleBulkCreatives('rejected', 'accepted');
                      }}
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
          )}
          <InfluncerFile
            influncerNameData={influncerNameDataApproved}
            showSelectAllActive={showSelectAllActive}
            creativeDetails={creativeDetails}
            selectedCreatives={selectedCreatives}
            setSelectedCreatives={setSelectedCreatives}
          />

          {creativeDetails.length === 0 && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </TabPane>

        <TabPane tab='Rejected' key='rejected'>
          {creativeDetails.length !== 0 && (
            <div className='btn-row'>
              <div>
                {showSelectAllActive ? (
                  <>
                    <button className='outline-btn bg-green'>
                      {isAllSelected() ? 'Deselect All' : 'Select All'}
                    </button>
                    <button
                      className='outline-btn bg-green-outline'
                      onClick={() => {
                        onClickSelect(false);
                        handleBulkCreatives('accepted', 'rejected');
                      }}
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
          )}
          <InfluncerFile
            influncerNameData={influncerNameDataRejected}
            showSelectAllActive={showSelectAllActive}
            creativeDetails={creativeDetails}
            selectedCreatives={selectedCreatives}
            setSelectedCreatives={setSelectedCreatives}
          />
          {creativeDetails.length === 0 && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CreativeApprovalData;
