import React, { useEffect, useState } from 'react';
import { Table, Pagination } from 'antd';
import { useParams } from 'react-router-dom';
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
import { getAllCreativesAction } from 'redux/brands/creatives/actions';
import { useSelector, useDispatch } from 'react-redux';

const CreativeTable = ({ allCreativeDetails, meta }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showAddedRow, setShowAddedRow] = useState(false);
  const [arr, setArr] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();

  const columns = [
    {
      title: (
        <SearchSelectBox data={compaingsData} defaultValue='All Campaigns' />
      ),
      dataIndex: ['project', 'title'],
      key: ['project', 'title'],
    },
    {
      title: 'Posts',
      dataIndex: 'posts',
      render: (text, record, index) => (
        <CreativeModal
          versionTrue
          className='version-title'
          creative={record}
        />
      ),
      key: 'posts',
    },

    {
      title: (
        <SearchSelectBox
          data={allInfluencerData}
          defaultValue='All Influencers'
        />
      ),
      dataIndex: ['user', 'name'],
      key: ['user', 'name'],
    },
    {
      title: 'Size',
      render: (value, record, index) => bytesToSize(value),
      dataIndex: ['stats', 'storageSizeInBytes'],
      key: ['stats', 'storageSizeInBytes'],
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
      render: (value, record, index) => new Date(value).toLocaleDateString(),
      key: 'createdAt',
    },
    {
      title: <StatusDropdown />,
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const bytesToSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
  };

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
        dataSource={allCreativeDetails}
        rowSelection={rowSelection}
        pagination={false}
      />
      <Pagination
        defaultCurrent={1}
        total={+meta.total}
        pageSize={+meta.perPage}
        current={+meta.page}
        onChange={(page, perPage) => {
          dispatch(
            getAllCreativesAction({
              params: { include: 'media,user,project', page },
              id: '5f8d3415e9dac37cb736defe',
            })
          );
        }}
      />
    </div>
  );
};

export default CreativeTable;
