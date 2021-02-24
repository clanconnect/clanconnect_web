import React, { useState } from 'react';
import { Badge, Checkbox } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import InfluncerFileVideo from '../InfluncerFileVideo';

import CreativeModal from '../CreativeModal';
import download from 'assets/images/download.svg';
import fullScreen from 'assets/images/full-screen.svg';
import chat from 'assets/images/chat.svg';

import './styles.scss';

const InfluncerFile = ({
  influncerNameData,
  showSelectAllActive,
  allChecked,
}) => {
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  return influncerNameData.map((data, index) => {
    return (
      <div className='common-uploads'>
        <h2 className='title'>{data.name}</h2>
        <div className='influncer-file-row'>
          {data.imgData.map((img, index) => (
            <div className='influncer-file-container'>
              <div className='img-box-download'>
                <img src={img.demoImag} alt='' className='full-img' />

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
                <span className='date-text'>{img.date}</span>
              </p>
            </div>
          ))}
          <InfluncerFileVideo
            showSelectAllActive={showSelectAllActive}
            allChecked={allChecked}
          />
        </div>
      </div>
    );
  });
};

export default InfluncerFile;
