import React, { useState } from 'react';
import { Badge, Checkbox } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

import CreativeModal from '../CreativeModal';
import download from 'assets/images/download.svg';
import fullScreen from 'assets/images/full-screen.svg';
import chat from 'assets/images/chat.svg';
import demoImg from 'assets/images/project1.jpg';

import './styles.scss';

const DownLoadedFile = ({ fileData }) => {
  return (
    <div className='influncer-file-container'>
      <div className='influncer-file-subcontainer'>
        <div className='img-box-download'>
          <img src={fileData.demoImag} alt='' className='full-img' />
          <div className='chat-icon'>
            <CreativeModal src={chat} className='icons-custom' />
          </div>
          <div className='icons-row'>
            <CreativeModal
              src={fullScreen}
              className='icons-custom'
              influencerStatus
            />
            <img src={download} alt='' className='icons-custom' />
          </div>
        </div>
        <p className='date-box'>
          <CalendarOutlined />
          <span className='date-text'>{fileData.date}</span>
        </p>
      </div>
    </div>
  );
};

export default DownLoadedFile;
