import React, { useState } from "react";
import "./styles.scss";
import { Tag } from "antd";

import {
  CalendarOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import InfluencerCreativeModal from "../InfluencerCreativeModal";
import download from "assets/images/download.svg";
import fullScreen from "assets/images/full-screen.svg";
import chat from "assets/images/chat.svg";
import VideoPlayer from "react-player";
import { downloadMedia } from "helpers";
import moment from "moment";

const DownLoadedFile = ({ creative = {}, project }) => {
  const media = creative.media ? creative.media[0] : {};
  const [imageUrl, setImageUrl] = useState(
    `${process.env.REACT_APP_IMAGE_BASE_URL}/${media?.slug || "default"}`
  );
  const [openModal, setOpenModal] = useState(false);

  const instagramSocial = creative?.socials?.instagram;
  const youtubeSocial = creative?.socials?.youtube;

  return (
    <div
      className="influncer-file-container "
      onClick={() => {
        setOpenModal(true);
      }}
    >
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
              openModal={openModal}
              setOpenModal={(value) => setOpenModal(value)}
            />
            {creative.status === "accepted" && (
              <div className="icon-sec">
                <img
                  src={download}
                  alt=""
                  className="icons-custom cursor-pointer"
                  onClick={() => {
                    downloadMedia(media.slug);
                    setOpenModal(false);
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="creative-footer">
          <div className="date-box">
            <CalendarOutlined />
            <span className="date-text">
              {moment(creative?.media[0]?.createdAt).format("DD/MM/YYYY")}
            </span>
          </div>
          <div className="versions">Versions: {creative.latestVersion}</div>
        </div>
        {(instagramSocial || youtubeSocial) && (
          <div className="approved-schedules">
            {instagramSocial && youtubeSocial && (
              <>
                <p>
                  <Tag color="red">
                    <YoutubeOutlined
                      style={{ color: "#FF0000", fontSize: "14px" }}
                    />{" "}
                    Scheduled At
                  </Tag>
                  {moment(youtubeSocial.liveAt).format("DD/MM/YYYY, h:mma")} IST
                </p>
                <p>
                  <Tag color="purple">
                    <InstagramOutlined
                      style={{ color: "#833AB4", fontSize: "14px" }}
                    />{" "}
                    Scheduled at
                  </Tag>
                  {moment(instagramSocial.liveAt).format("DD/MM/YYYY, h:mma")}{" "}
                  IST
                </p>
              </>
            )}
            {instagramSocial && !youtubeSocial && (
              <p>
                <Tag color="purple">
                  <InstagramOutlined
                    style={{ color: "#833AB4", fontSize: "14px" }}
                  />{" "}
                  Scheduled at
                </Tag>
                {moment(instagramSocial.liveAt).format("DD/MM/YYYY, h:mma")} IST
              </p>
            )}
            {!instagramSocial && youtubeSocial && (
              <p>
                <Tag color="red">
                  <YoutubeOutlined
                    style={{ color: "#FF0000", fontSize: "14px" }}
                  />{" "}
                  Scheduled At
                </Tag>
                {moment(youtubeSocial.liveAt).format("DD/MM/YYYY, h:mma")} IST
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DownLoadedFile;
