import React, { useState, useRef } from 'react';
import { Modal, Menu, Dropdown, Carousel, Tag } from 'antd';
import {
  DownOutlined,
  UpOutlined,
  RightOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import CommentBox from '../CommentBox';
import AttachmentFileCard from '../AttachmentFileCard';
import UploadDocumentModal from '../BrandUploadDocumentModal';
import CustomScroll from '../CustomScroll';

import demoImag from 'assets/images/project1.jpg';
import download from 'assets/images/download.svg';
import paperclip from 'assets/images/paperclip.svg';
import demoImg from 'assets/images/project1.jpg';
import infImg from 'assets/images/influencer.jpg';

import './styles.scss';

const CreativeModal = ({ src, className, versionTrue, influencerStatus }) => {
  const [visible, setVisible] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const slider = useRef(null);
  const menu = (
    <Menu>
      <Menu.Item key='0'>
        <div className='flex flex-column'>
          <label className='flex justify-between items-center mb-10'>
            <span>Approved</span>
            <input type='radio' name='status' value='approved' />
          </label>
          <label className='flex justify-between items-center mb-10'>
            <span>Reject</span>
            <input type='radio' name='status' value='reject' />
          </label>
        </div>
      </Menu.Item>
    </Menu>
  );

  function onChange(a, b, c) {
    console.log(a, b, c);
  }

  const showAttachFiles = () => {
    setShowFiles(!showFiles);
  };

  return (
    <>
      {versionTrue ? (
        <div className='version-text' onClick={() => setVisible(true)}>
          <img src={demoImg} width='80' height='80' className='version-img' />
          <span>
            <span className={className}>4 versions</span>
            <RightOutlined className='ml-4' />
          </span>
        </div>
      ) : (
        <img
          alt=''
          onClick={() => setVisible(true)}
          src={src}
          className={`cursor-pointer ${className}`}
        />
      )}
      <Modal
        // title='Basic Modal'
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1100}
        style={{ top: 40 }}
        className='custom-modal'
      >
        <div className='creative-modal'>
          <div className='creative-modal-header flex justify-between'>
            <p className='title'>Creative Name Here</p>
            <div className=''>
              {influencerStatus ? (
                <div>
                  <span>Status : </span>
                  <button className='outline-btn bg-green-outline'>
                    Approved
                  </button>
                </div>
              ) : (
                <Dropdown overlay={menu} trigger={['click']}>
                  <a
                    className='ant-dropdown-link'
                    onClick={(e) => e.preventDefault()}
                  >
                    Select a status <DownOutlined />
                  </a>
                </Dropdown>
              )}
            </div>
          </div>
          <div className='creative-modal-body'>
            <div className='flex mobile-section'>
              <div className='carousal-section'>
                <LeftOutlined
                  onClick={() => slider.current.prev()}
                  className='slider-left-icon'
                />
                <Carousel afterChange={onChange} ref={slider}>
                  <div className='slider-box'>
                    <Tag color='cyan'>Version 1</Tag>
                    <img src={demoImag} className='contentStyle' />
                    <img src={download} alt='' className='icons-custom' />
                  </div>
                  <div className='slider-box'>
                    <Tag color='cyan'>Version 2</Tag>
                    <iframe
                      className='contentStyle'
                      src='https://www.youtube.com/embed/ftud_jVBp0M'
                      frameborder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowfullscreen
                    ></iframe>
                    <img src={download} alt='' className='icons-custom' />
                  </div>
                  <div className='slider-box'>
                    <Tag color='cyan'>Version 3</Tag>
                    <img src={infImg} className='contentStyle' />
                    <img src={download} alt='' className='icons-custom' />
                  </div>
                </Carousel>
                <RightOutlined
                  onClick={() => slider.current.next()}
                  className='slider-right-icon'
                />
              </div>
              <div className='comment-section'>
                <div className='flex justify-between items-center'>
                  <p className='view-title' onClick={showAttachFiles}>
                    View Attachments{' '}
                    {showFiles ? (
                      <UpOutlined className='ml-4' />
                    ) : (
                      <DownOutlined className='ml-4' />
                    )}
                  </p>

                  <UploadDocumentModal src={paperclip} />
                </div>
                {showFiles ? <AttachmentFileCard /> : <CommentBox />}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreativeModal;
