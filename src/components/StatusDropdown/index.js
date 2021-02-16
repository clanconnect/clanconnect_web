import React from 'react';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './styles.scss';

const StatusDropdown = ({ data, defaultValue }) => {
  const menu = (
    <Menu>
      <Menu.Item key='0'>
        <div className='flex flex-column'>
          <label className='flex justify-between items-center mb-10'>
            <span className='mr-20'>All Status</span>
            <input type='radio' name='status' value='reject' />
          </label>
          <label className='flex justify-between items-center mb-10'>
            <span className='mr-20'>Approved</span>
            <input type='radio' name='status' value='approved' />
          </label>
          <label className='flex justify-between items-center mb-10'>
            <span className='mr-20'>Reject</span>
            <input type='radio' name='status' value='reject' />
          </label>
          <label className='flex justify-between items-center mb-10'>
            <span className='mr-20'>Pending</span>
            <input type='radio' name='status' value='reject' />
          </label>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a
        className='ant-dropdown-link table-header'
        onClick={(e) => e.preventDefault()}
      >
        Status <DownOutlined className='down-icon' />
      </a>
    </Dropdown>
  );
};

export default StatusDropdown;
