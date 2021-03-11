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
import BrandUploadDocumentModal from "../BrandUploadDocumentModal";
import download from "assets/images/download.svg";
import paperclip from "assets/images/paperclip.svg";
import { downloadMedia } from "helpers";

const MediaView = ({ media, imageUrl, onImageError }) => {
  return (
    <div className="slider-box" key={`media-${media.id}`}>
      <Tag color="cyan">{media.versionTag}</Tag>
      {media.mimeType.includes("image") ? (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img
          alt={`creative-image-${media.id}`}
          src={imageUrl}
          onError={(e) => {
            e.target.src = onImageError(media.slug);
          }}
          className="contentStyle"
        />
      ) : (
        <VideoPlayer
          url={`${process.env.REACT_APP_VIDEO_BASE_URL}/${media.slug}`}
          className="video-contentStyle"
          controls={true}
        />
      )}
      <img
        src={download}
        alt=""
        className="icons-custom cursor-pointer"
        onClick={() => downloadMedia(media.slug)}
      />
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
  const [showAttachments, setShowAttachments] = useState(false);

  const getImageUrl = (slug) => {
    return `${process.env.REACT_APP_IMAGE_BASE_URL}/${slug || "default"}`;
  };

  const onImageError = (slug) => {
    return `${process.env.REACT_APP_MEDIA_ORIGINAL_URL}/${slug || "default"}`;
  };

  const slider = useRef(null);

  const showAttachFiles = () => {
    setShowAttachments(!showAttachments);
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
                <Carousel ref={slider}>
                  {creative.media.map((media) =>
                    MediaView({
                      media,
                      imageUrl: getImageUrl(media.slug),
                      onImageError,
                    })
                  )}
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
                    {showAttachments ? (
                      <UpOutlined className="ml-4" />
                    ) : (
                      <DownOutlined className="ml-4" />
                    )}
                  </p>

                  <BrandUploadDocumentModal
                    src={paperclip}
                    creative={creative}
                  />
                </div>

                {showAttachments ? (
                  creative.attachments.map((media) => (
                    <AttachmentFileCard media={media} />
                  ))
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
