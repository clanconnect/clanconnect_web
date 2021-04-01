import React, { useState } from "react";
import "./styles.scss";
import { CalendarOutlined } from "@ant-design/icons";
import InfluencerCreativeModal from "../InfluencerCreativeModal";
import download from "assets/images/download.svg";
import fullScreen from "assets/images/full-screen.svg";
import chat from "assets/images/chat.svg";
import VideoPlayer from "react-player";
import { downloadMedia } from "helpers";

const DownLoadedFile = ({ creative = {}, project }) => {
  const media = creative.media ? creative.media[0] : {};
  const [imageUrl, setImageUrl] = useState(
    `${process.env.REACT_APP_IMAGE_BASE_URL}/${media?.slug || "default"}`
  );
  console.log("stats", creative.stats, project);
  return (
    <div className="influncer-file-container">
      <div className="influncer-file-subcontainer">
        <div className="img-box-download">
          {media?.mimeType?.includes("image") ? (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={imageUrl}
              alt=""
              className="full-img"
              onError={() => {
                setImageUrl(
                  `${process.env.REACT_APP_MEDIA_ORIGINAL_URL}/${
                    media?.slug || "default"
                  }`
                );
              }}
            />
          ) : (
            <VideoPlayer
              url={`${process.env.REACT_APP_VIDEO_BASE_URL}/${media?.slug}`}
              className="full-video"
              controls={false}
            />
          )}
          <div className="chat-icon">
            {creative.stats.unreadComments ? (
              <span className="number"> {creative.stats.unreadComments}</span>
            ) : null}
            <InfluencerCreativeModal
              src={chat}
              project={project}
              className="icons-custom"
              creative={creative}
            />
          </div>
          <div className="icons-row">
            <InfluencerCreativeModal
              src={fullScreen}
              project={project}
              className="icons-custom cursor-pointer"
              creative={creative}
            />
            <div className="icon-sec">
              <img
                src={download}
                alt=""
                className="icons-custom cursor-pointer"
                onClick={() => downloadMedia(media.slug)}
              />
            </div>
          </div>
        </div>
        <p className="date-box">
          <CalendarOutlined />
          <span className="date-text">
            {new Date(creative.createdAt).toISOString().split("T")[0]}
          </span>
        </p>
      </div>
    </div>
  );
};

export default DownLoadedFile;
