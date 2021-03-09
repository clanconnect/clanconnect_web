import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Checkbox } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import InfluncerFileVideo from '../InfluncerFileVideo';
import VideoPlayer from 'react-player';
import { getCommentsAction } from 'redux/brands/comments/actions';

import CreativeModal from '../CreativeModal';
import download from 'assets/images/download.svg';
import fullScreen from 'assets/images/full-screen.svg';
import chat from 'assets/images/chat.svg';
import apiConstant from 'common/apiConstant';
import moment from 'moment';

import './styles.scss';

const InfluncerFile = ({
  influncerNameData,
  showSelectAllActive,
  allChecked,
  creativeDetails,
}) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const poster = 'http://www.example.com/path/to/video_poster.jpg';

  // const getComments = (id) => {

  // };

  return creativeDetails
    ? creativeDetails.map((data, index) => {
        return (
          <div className='common-uploads'>
            <h2 className='title'>{data.user.name}</h2>
            <div className='influncer-file-row'>
              {data.creatives.map((item, index) => {
                console.log(item.media[0], 'line 40');
                return item.media[0]?.mimeType ? (
                  <div className='influncer-file-container'>
                    <div className='img-box-download'>
                      {item.media[0].mimeType &&
                      item.media[0]?.mimeType.includes('image') ? (
                        <img
                          src={apiConstant.MEDIA_URL + item?.media[0]?.slug}
                          alt=''
                          className='full-img'
                        />
                      ) : (
                        <VideoPlayer
                          url={apiConstant.MEDIA_URL + item?.media[0]?.slug}
                          poster={poster}
                          className='full-img full-video'
                          controls={true}
                        />
                      )}

                      {showSelectAllActive ? (
                        <Checkbox className='chat-icon'></Checkbox>
                      ) : (
                        <div className='chat-icon'>
                          <CreativeModal
                            src={chat}
                            className='icons-custom'
                            creative={item}
                            influncerName={data.user.name}
                          />
                        </div>
                      )}
                      {!showSelectAllActive && (
                        <div className='icons-row'>
                          <CreativeModal
                            src={fullScreen}
                            className='icons-custom'
                            creative={item}
                            influncerName={data.user.name}
                          />
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
                      <span className='date-text'>
                        {moment(
                          item.media[0].createdAt && item.media[0].createdAt
                        ).format('DD/MM/YYYY')}
                      </span>
                    </p>
                  </div>
                ) : null;
              })}

              {/* {data.novideo == false ? null : (
                <InfluncerFileVideo
                  showSelectAllActive={showSelectAllActive}
                  allChecked={allChecked}
                />
              )} */}
            </div>
          </div>
        );
      })
    : null;
};

export default InfluncerFile;
