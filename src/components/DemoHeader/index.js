import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import logo from 'assets/images/logo.png';
import dummy from 'assets/images/dummy.png';

import './styles.scss';

const DemoHeader = (props) => {
  const menu = (
    <Menu>
      <Menu.Item key='0'>
        <p className='option-title'>Inbox</p>
      </Menu.Item>
      <Menu.Item key='1'>
        <p className='option-title'>Projects</p>
      </Menu.Item>
      <Menu.Item key='3'>
        <p className='option-title'>Profile Settings</p>
      </Menu.Item>
      <Menu.Item key='4'>
        <p className='option-title'>Clan Coins 0</p>
      </Menu.Item>
      <Menu.Item key='5'>
        <p className='option-title no-b'> Logout</p>
      </Menu.Item>
    </Menu>
  );
  return (
    <header className='header'>
      <div className='header-top'>
        <a href=''>
          <img src={logo} alt='logo' className='logo' />
        </a>

        <div>
          <h1 className='header-title'>Discover. Partner. influence</h1>
        </div>
        <div className='profile-dropdown'>
          <span className='profile-name'>lakshay</span>
          <Dropdown overlay={menu} trigger={['click']}>
            <a
              className='ant-dropdown-link profile-link'
              onClick={(e) => e.preventDefault()}
            >
              <img
                src={dummy}
                alt='logo'
                className='logo'
                className='profile-img'
              />
            </a>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default DemoHeader;
