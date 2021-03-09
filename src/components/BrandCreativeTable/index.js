import React, { useState } from 'react';
import { Table } from 'antd';
import {
  RightOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import SearchSelectBox from '../SearchSelectBox';
import StatusDropdown from '../StatusDropdown';
import CreativeModal from '../CreativeModal';
import demoImg from 'assets/images/project1.jpg';
import { compaingsData, statusData, allInfluencerData } from './dataManager';
import './styles.scss';

const BrandCreativeTable = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showAddedRow, setShowAddedRow] = useState(false);

  const columns = [
    {
      title: (
        <SearchSelectBox data={compaingsData} defaultValue='All Campaigns' />
      ),
      dataIndex: 'campaigns',
    },
    {
      title: 'Posts',
      dataIndex: 'posts',
      render: () => <CreativeModal versionTrue className='version-title' />,
    },

    {
      title: (
        <SearchSelectBox
          data={allInfluencerData}
          defaultValue='All Influencer'
        />
      ),
      dataIndex: 'allInfluencers',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: <StatusDropdown />,
      dataIndex: 'status',
    },
  ];

  const data = [
    {
      key: '1',
      campaigns: 'Nestle Advertisement',
      posts: 98,
      allInfluencers: 'Alice Collins',
      size: '70MB',
      date: '12/20/2020',
      status: 'Approved',
    },
    {
      key: '2',
      campaigns: 'Vincent Adams',
      posts: 98,
      allInfluencers: 66,
      size: '89MB',
      date: '12/20/2020',
      status: 'Approved',
    },
    {
      key: '3',
      campaigns: 'Campaigns Name Two',
      posts: 98,
      allInfluencers: 'Alice Collins',
      size: '70MB',
      date: '12/20/2020',
      status: 'Approved',
    },
    {
      key: '4',
      campaigns: 'Campaigns Name Two',
      posts: 88,
      allInfluencers: 'Alice Collins',
      size: '89MB',
      date: '12/20/2020',
      status: 'Approved',
    },
  ];

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
    setShowAddedRow(true);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      {showAddedRow ? (
        <div className='added-row'>
          <div>
            <p className='mb-0 added-row-text'>2 rows selected:</p>
          </div>
          <div>
            <button className='delete-btn'>
              <DeleteOutlined /> Delete
            </button>
            <button className='delete-btn bg-download'>
              <DownloadOutlined /> Download
            </button>
          </div>
        </div>
      ) : null}
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        pagination={{ position: ['bottomCenter'] }}
      />
    </div>
  );
};

export default BrandCreativeTable;
