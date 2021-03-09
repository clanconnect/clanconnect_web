import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import VideoPlayer from "react-player";
import { Modal, Menu, Dropdown, Carousel, Tag } from "antd";
import {
  DownOutlined,
  UpOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import CommentBox from "../CommentBox";
import AttachmentFileCard from "../AttachmentFileCard";
import UploadDocumentModal from "../BrandUploadDocumentModal";
import apiConstant from "common/apiConstant";

import download from "assets/images/download.svg";
import paperclip from "assets/images/paperclip.svg";
import demoImg from "assets/images/project1.jpg";

import "./styles.scss";

const CreativeModal = ({
  src,
  className,
  versionTrue,
  influencerStatus,
  emptystateInfluncer,
  creative,
  setPage,
  influncerName,
}) => {
  const [visible, setVisible] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [playing, setPlaying] = useState(false);
  const poster = "http://www.example.com/path/to/video_poster.jpg";
  const slider = useRef(null);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div className="flex flex-column">
          <label className="flex justify-between items-center mb-10">
            <span>Approved</span>
            <input type="radio" name="status" value="approved" />
          </label>
          <label className="flex justify-between items-center mb-10">
            <span>Reject</span>
            <input type="radio" name="status" value="reject" />
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

  const closeModal = (val) => {
    setPlaying(false);
    setShowFiles(false);

    setTimeout(() => {
      setVisible(val);
    }, 500);
  };

  const pauseVideo = () => {
    setPlaying(false);
  };

  const playVideo = () => {
    setPlaying(true);
  };

  return (
    <>
      {versionTrue ? (
        <div className="version-text" onClick={() => setVisible(true)}>
          <img src={demoImg} width="80" height="80" className="version-img" />
          <span>
            <span className={className}>4 versions</span>
            <RightOutlined className="ml-4" />
          </span>
        </div>
      ) : (
        <img
          alt=""
          onClick={() => {
            setVisible(true);
          }}
          src={src}
          className={`cursor-pointer ${className}`}
        />
      )}
      <Modal
        // title='Basic Modal'
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => closeModal(false)}
        width={1100}
        style={{ top: 40 }}
        className="custom-modal"
      >
        <div className="creative-modal">
          <div className="creative-modal-header flex justify-between">
            <p className="title">{influncerName}</p>
            <div className="">
              {influencerStatus ? (
                <div>
                  <span>Status: </span>
                  <button className="bg-green-outline">Approved</button>
                </div>
              ) : (
                <Dropdown overlay={menu} trigger={["click"]}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    Select a status <DownOutlined />
                  </a>
                </Dropdown>
              )}
            </div>
          </div>
          <div className="creative-modal-body">
            <div className="flex mobile-section">
              <div className="carousal-section">
                <LeftOutlined
                  onClick={() => slider.current.prev()}
                  className="slider-left-icon"
                />
                <Carousel afterChange={onChange} ref={slider}>
                  {creative.media.map((img, index) => {
                    return (
                      <div className="slider-box">
                        <Tag color="cyan">{img.versionTag}</Tag>
                        {img.mimeType.includes("image") ? (
                          <img
                            src={apiConstant.MEDIA_URL + img.slug}
                            className="contentStyle"
                          />
                        ) : (
                          <VideoPlayer
                            url={apiConstant.MEDIA_URL + img.slug}
                            poster={poster}
                            className="video-contentStyle"
                            onPause={pauseVideo}
                            onPlay={playVideo}
                            playing={playing}
                            controls={true}
                          />
                        )}
                        <img
                          src={download}
                          alt=""
                          className="icons-custom cursor-pointer"
                        />
                      </div>
                    );
                  })}
                  {/* <div className='slider-box'>
                    <Tag color='cyan'>Version 2</Tag>

                    <VideoPlayer
                      url='https://youtu.be/qgdfBnOQAkg'
                      poster={poster}
                      className='video-contentStyle'
                      onPause={pauseVideo}
                      onPlay={playVideo}
                      playing={playing}
                      controls={true}
                    />

                    <img
                      src={download}
                      alt=''
                      className='icons-custom cursor-pointer'
                    />
                  </div>
                  <div className='slider-box'>
                    <Tag color='cyan'>Version 3</Tag>
                    <img src={infImg} className='contentStyle' />
                    <img
                      src={download}
                      alt=''
                      className='icons-custom cursor-pointer'
                    />
                  </div> */}
                </Carousel>
                <RightOutlined
                  onClick={() => slider.current.next()}
                  className="slider-right-icon"
                />
              </div>
              <div className="comment-section">
                <div className="flex justify-between items-center">
                  <p className="view-title" onClick={showAttachFiles}>
                    View Attachments{" "}
                    {showFiles ? (
                      <UpOutlined className="ml-4" />
                    ) : (
                      <DownOutlined className="ml-4" />
                    )}
                  </p>

                  <UploadDocumentModal src={paperclip} />
                </div>
                {showFiles ? (
                  <AttachmentFileCard />
                ) : (
                  <CommentBox creativeId={creative.id} />
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreativeModal;
