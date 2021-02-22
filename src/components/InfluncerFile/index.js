import React, { useState } from 'react';
import { Badge, Checkbox } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

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
        <div className='influncer-file-container'>
          {data.imgData.map((img, index) => (
            <div className='influncer-file-subcontainer'>
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
                    <Badge count={5} size='small'>
                      <img src={chat} alt='' className='icons-custom' />
                    </Badge>
                  </div>
                )}
                {!showSelectAllActive && (
                  <div className='icons-row'>
                    <CreativeModal src={fullScreen} className='icons-custom' />
                    <img src={download} alt='' className='icons-custom' />
                  </div>
                )}
              </div>
              <p className='date-box'>
                <CalendarOutlined />
                <span className='date-text'>{img.date}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  });
};

export default InfluncerFile;
