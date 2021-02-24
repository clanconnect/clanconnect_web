import React, { useState } from 'react';
import { Badge, Checkbox } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import VideoPlayer from 'react-player';

import CreativeModal from '../CreativeModal';
import download from 'assets/images/download.svg';
import fullScreen from 'assets/images/full-screen.svg';
import chat from 'assets/images/chat.svg';

import './styles.scss';

const InfluncerFileVideo = ({
  influncerNameData,
  showSelectAllActive,
  allChecked,
}) => {
  const poster = 'http://www.example.com/path/to/video_poster.jpg';

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  return (
    <div className='influncer-file-container'>
      <div className='img-box-download'>
        <VideoPlayer
          url='https://youtu.be/qgdfBnOQAkg'
          poster={poster}
          className='full-img full-video'
          controls={true}
        />
        {showSelectAllActive ? (
          <Checkbox
            onChange={onChange}
            className='chat-icon'
            checked={allChecked ? true : false}
          ></Checkbox>
        ) : (
          <div className='chat-icon'>
            <CreativeModal src={chat} className='icons-custom' />
          </div>
        )}
        {!showSelectAllActive && (
          <div className='icons-row'>
            <CreativeModal src={fullScreen} className='icons-custom' />
            <img
              src={download}
              alt='download icon'
              className='icons-custom cursor-pointer'
            />
          </div>
        )}
      </div>
      <p className='date-box'>
        <CalendarOutlined />
        <span className='date-text'>11/11/2020</span>
      </p>
    </div>
  );
};

export default InfluncerFileVideo;
