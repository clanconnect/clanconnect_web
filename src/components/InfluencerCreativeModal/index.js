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
import axios from "axios";

const MediaView = ({ media, downloadFile }) => {
  return (
    <div className="slider-box" key={`media-${media.id}`}>
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
      <img
        src={download}
        alt=""
        className="icons-custom cursor-pointer"
        onClick={() => downloadFile(media.slug)}
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
  const [showFiles, setShowFiles] = useState(false);
  const slider = useRef(null);

  const showAttachFiles = () => {
    setShowFiles(!showFiles);
  };

  const closeModal = (val) => {
    setVisible(false);
  };

  const downloadFile = (slug) => {
    const url = `${
      process.env.REACT_APP_MEDIA_ORIGINAL_URL
    }/${slug}?${new Date().getTime()}`;
    axios({ url, method: "GET", responseType: "blob" }).then((response) => {
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(
        new Blob([response.data], { type: response.data.type })
      );
      link.setAttribute("download", "");
      document.body.appendChild(link);
      link.click();
    });
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
                    MediaView({ media, downloadFile })
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
