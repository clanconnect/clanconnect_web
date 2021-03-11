import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { downloadMedia } from "helpers";

import VideoPlayer from "react-player";
import { Modal, Menu, Dropdown, Carousel, Tag, Empty } from "antd";
import {
  DownOutlined,
  UpOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import CommentBox from "../CommentBox";
import AttachmentFileCard from "../AttachmentFileCard";
import BrandUploadDocumentModal from "../BrandUploadDocumentModal";
import download from "assets/images/download.svg";
import paperclip from "assets/images/paperclip.svg";
import { creativeUpdateStatusAction } from "redux/brands/creatives/actions";
import "./styles.scss";

const CreativeModal = ({
  src,
  className,
  versionTrue,
  influencerStatus,
  creative,
  influncerName,
}) => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [visible, setVisible] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [creativeStatus, setCreativeStatus] = useState("");
  const slider = useRef(null);

  useEffect(() => {
    setCreativeStatus(creative.status);
  }, [creative.status]);

  const menu = (status) => {
    return (
      <Menu>
        <Menu.Item key="accepted">
          <div className="flex flex-column">
            <label className="flex justify-between items-center mb-10 cursor-pointer">
              <span>Approved</span>
              <input
                type="radio"
                name="status"
                value="accepted"
                onChange={(e) => handleMenuClick(e.target.value)}
                checked={status === "accepted"}
                className="cursor-pointer"
              />
            </label>
          </div>
        </Menu.Item>
        <Menu.Item key="rejected">
          <div className="flex flex-column">
            <label className="flex justify-between items-center mb-10 cursor-pointer">
              <span>Rejected</span>
              <input
                type="radio"
                name="status"
                value="rejected"
                checked={status === "rejected"}
                onChange={(e) => handleMenuClick(e.target.value)}
                className="cursor-pointer"
              />
            </label>
          </div>
        </Menu.Item>
      </Menu>
    );
  };

  const handleMenuClick = (value) => {
    setCreativeStatus(value);
    dispatch(
      creativeUpdateStatusAction({
        status: value,
        projectId: id,
        creativeId: creative.id,
      })
    );
  };

  const closeModal = (val) => {
    setPlaying(false);

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
          {creative?.media[0]?.mimeType.includes("image") ? (
            <img
              src={`${process.env.REACT_APP_IMAGE_BASE_URL}/${creative?.media[0]?.slug}`}
              width="80"
              height="80"
              className="version-img"
              alt="n m"
              onError={(e) => {
                e.target.src = `${process.env.REACT_APP_MEDIA_ORIGINAL_URL}/${
                  creative?.media[0]?.slug || "default"
                }`;
              }}
            />
          ) : (
            <VideoPlayer
              url={`${process.env.REACT_APP_VIDEO_BASE_URL}/${creative?.media[0]?.slug}`}
              playing={playing}
              controls={true}
              style={{ height: "80px", width: "80px" }}
              className="short-video"
            />
          )}
          <span>
            <span className={className}>{creative?.media[0]?.versionTag}</span>
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

      {/* Modal */}
      <Modal
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
                <Dropdown overlay={menu(creativeStatus)} trigger={["click"]}>
                  <a
                    href="#javascript"
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
                {creative?.media?.length > 1 ? (
                  <LeftOutlined
                    onClick={() => slider.current.prev()}
                    className="slider-left-icon"
                  />
                ) : null}
                <Carousel ref={slider} className={"remove-buttom"}>
                  {creative.length != 0 ? (
                    creative.media.map((media) => {
                      return (
                        <div
                          className="slider-box"
                          key={`media-carousel-${media.id}`}
                        >
                          <Tag color="cyan">{media.versionTag}</Tag>
                          {media.mimeType.includes("image") ? (
                            <img
                              src={`${process.env.REACT_APP_IMAGE_BASE_URL}/${media.slug}`}
                              className="contentStyle"
                              alt={`creative-media-${media.id}`}
                              onError={(e) => {
                                e.target.src = `${
                                  process.env.REACT_APP_MEDIA_ORIGINAL_URL
                                }/${media.slug || "default"}`;
                              }}
                            />
                          ) : (
                            <VideoPlayer
                              url={`${process.env.REACT_APP_VIDEO_BASE_URL}/${media.slug}`}
                              className="video-contentStyle"
                              playing={playing}
                              controls={true}
                            />
                          )}
                          {media.mimeType.includes("image") && (
                            <img
                              src={download}
                              alt="download icon"
                              className="icons-custom cursor-pointer"
                              onClick={() => downloadMedia(media.slug)}
                            />
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )}
                </Carousel>
                {creative?.media?.length > 1 ? (
                  <RightOutlined
                    onClick={() => slider.current.next()}
                    className="slider-right-icon"
                  />
                ) : null}
              </div>
              <div className="comment-section">
                <div className="flex justify-between items-center">
                  <p className="view-title" onClick={() => setShowFiles(true)}>
                    View Attachments{" "}
                    <UpOutlined
                      className={`${
                        showFiles ? "icon-animation" : "trans-icon"
                      } ml-4 `}
                    />
                  </p>

                  <BrandUploadDocumentModal
                    src={paperclip}
                    creative={creative}
                  />
                </div>
                {showFiles ? (
                  <div className="tarnsition">
                    {creative.attachments.length != 0 ? (
                      creative.attachments.map((media) => (
                        <AttachmentFileCard media={media} />
                      ))
                    ) : (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        style={{ margin: "0" }}
                      />
                    )}
                  </div>
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
