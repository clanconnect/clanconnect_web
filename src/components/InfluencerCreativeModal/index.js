import React, { useState, useRef } from "react";
import "./styles.scss";
import VideoPlayer from "react-player";
import { Modal, Carousel, Tag } from "antd";
import {
  DownOutlined,
  UpOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import CommentBox from "../CommentBox";
import AttachmentFileCard from "../AttachmentFileCard";
import UploadDocumentModal from "../BrandUploadDocumentModal";
import download from "assets/images/download.svg";
import paperclip from "assets/images/paperclip.svg";

const MediaView = ({ media }) => {
  return (
    <div className="slider-box">
      <Tag color="cyan">{media.versionTag}</Tag>
      {media.mimeType.includes("image") ? (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img
          alt={`creative-image-${media.id}`}
          src={`${process.env.REACT_APP_IMAGE_BASE_URL}/${
            media.slug || "default"
          }`}
          className="contentStyle"
        />
      ) : (
        <VideoPlayer
          url={`${process.env.REACT_APP_VIDEO_BASE_URL}/${media.slug}`}
          className="video-contentStyle"
          controls={true}
        />
      )}
      <img src={download} alt="" className="icons-custom cursor-pointer" />
    </div>
  );
};

const InfluencerCreativeModal = ({
  src,
  className,
  creative = {},
  project = {},
}) => {
  const [visible, setVisible] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const slider = useRef(null);

  function onChange(a, b, c) {
    console.log(a, b, c);
  }

  const showAttachFiles = () => {
    setShowFiles(!showFiles);
  };

  const closeModal = (val) => {
    setVisible(false);
  };

  return (
    <>
      <img
        alt=""
        onClick={() => setVisible(true)}
        src={src}
        className={`cursor-pointer ${className}`}
      />

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
            <p className="title">{project.title}</p>
          </div>

          <div className="creative-modal-body">
            <div className="flex mobile-section">
              <div className="carousal-section">
                <LeftOutlined
                  onClick={() => slider.current.prev()}
                  className="slider-left-icon"
                />
                <Carousel afterChange={onChange} ref={slider}>
                  {creative.media.map((media) => MediaView({ media }))}
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

export default InfluencerCreativeModal;
