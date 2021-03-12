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

const CreativeTableInfluencer = ({ allCreativeDetails, meta }) => {
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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Posts',
      dataIndex: 'posts',
      // render: () => (
      //   <CreativeModal
      //     versionTrue
      //     className='version-title'
      //     creative={record}
      //   />
      // ),
      key: 'posts',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
      key: 'date',
    },
    {
      title: <StatusDropdown />,
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Mike John',
      posts: 32,
      size: '10 MB',
      date: '12/23/2020',
      status: 'status',
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
        pagination={false}
      />
      <Pagination />
    </div>
  );
};

export default CreativeTableInfluencer;
