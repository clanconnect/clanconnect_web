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
//bootstrap icons
import * as Icon from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";

const DownLoadedFile = ({
  creative = {},
  project,
  projectCard = { status: false },
}) => {
  const media = creative.media ? creative.media[0] : {};
  const [imageUrl, setImageUrl] = useState(
    `${process.env.REACT_APP_IMAGE_BASE_URL}/${media?.slug || "default"}`
  );
  const [openModal, setOpenModal] = useState(false);

  const instagramSocial = creative?.socials?.instagram;
  const youtubeSocial = creative?.socials?.youtube;
  let history = useHistory();
  const onShowCreativeView = () => {
    if (project.id) {
      history.push(`/v2/influencer/campaigns/${project.id}/${creative.id}`);
    }
  };
  return (
    <div
      className={`influncer-file-container ${
        projectCard.status ? "project-one-card" : ""
      }`}
    >
      <span
        className={`project-card-status creatives-${projectCard["creative-status"]}`}
      >
        {projectCard["creative-status"]}
      </span>
      <div className="influncer-file-subcontainer">
        <div
          className={`img-box-download main-creatives-${projectCard["creative-status"]}`}
        >
          <div onClick={onShowCreativeView}>
            {media?.mimeType?.includes("image") ? (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              // onClick={() => setOpenModal(true)}
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
          </div>
          <div className="chat-icon">
            {creative.stats.unreadComments ? (
              <span className="number"> {creative.stats.unreadComments}</span>
            ) : null}
            {projectCard.status ? (
              <Icon.ChatLeftFill color="#5acffb" size="18" />
            ) : (
              <img
                alt=""
                src={chat}
                className={`cursor-pointer icons-custom`}
              />
            )}
          </div>
          {
            <div
              className="icons-row"
              style={{ opacity: `${projectCard.status ? 0 : 1}` }}
            >
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
          }
        </div>
        <div className="creative-footer">
          <div className="absolute-box">
            <div className="date-box">
              <CalendarOutlined />
              <span className="date-text">
                {moment(creative?.media[0]?.createdAt).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="versions">Versions: {creative.latestVersion}</div>
          </div>
        </div>
        {instagramSocial || youtubeSocial ? (
          <div className="approved-schedules">
            {instagramSocial && youtubeSocial && (
              <>
                <p>
                  {projectCard.status ? (
                    <span>
                      <span
                        style={{
                          verticalAlign: "middle",
                          position: "relative",
                          top: "2px",
                        }}
                      >
                        <Icon.Youtube color="red" size="16" />
                      </span>{" "}
                      Scheduled At{" "}
                      {projectCard["creative-status"] != "live" && (
                        <span>
                          <Icon.Pencil color="#0078b3"></Icon.Pencil>
                        </span>
                      )}
                    </span>
                  ) : (
                    <span>
                      <Tag color="red">
                        <YoutubeOutlined
                          style={{ color: "#FF0000", fontSize: "14px" }}
                        />{" "}
                        Scheduled At
                      </Tag>
                    </span>
                  )}{" "}
                </p>
                <p>
                  {projectCard.status ? (
                    <span>
                      <Icon.Instagram color="#d6249f" /> Scheduled At
                    </span>
                  ) : (
                    <span>
                      <Tag color="purple">
                        <InstagramOutlined
                          style={{ color: "#833AB4", fontSize: "14px" }}
                        />{" "}
                        Scheduled At
                      </Tag>
                    </span>
                  )}{" "}
                  {moment(instagramSocial.liveAt).format("DD/MM/YYYY, h:mma")}{" "}
                  IST{" "}
                  {projectCard["creative-status"] != "live" && (
                    <span>
                      <Icon.Pencil color="#0078b3"></Icon.Pencil>
                    </span>
                  )}
                </p>
              </>
            )}
            {instagramSocial && !youtubeSocial && (
              <p>
                {projectCard.status ? (
                  <span>
                    <Icon.Instagram color="#d6249f" /> Scheduled At
                  </span>
                ) : (
                  <span>
                    <Tag color="purple">
                      <InstagramOutlined
                        style={{ color: "#833AB4", fontSize: "14px" }}
                      />{" "}
                      Scheduled At
                    </Tag>
                  </span>
                )}{" "}
                {moment(instagramSocial.liveAt).format("DD/MM/YYYY, h:mma")} IST{" "}
                {projectCard["creative-status"] != "live" && (
                  <span>
                    <Icon.Pencil color="#0078b3"></Icon.Pencil>
                  </span>
                )}
              </p>
            )}
            {!instagramSocial && youtubeSocial && (
              <p>
                {projectCard.status ? (
                  <span>
                    <span
                      style={{
                        verticalAlign: "middle",
                        position: "relative",
                        top: "2px",
                      }}
                    >
                      <Icon.Youtube color="red" size="16" />
                    </span>{" "}
                    Scheduled At{" "}
                    {projectCard["creative-status"] != "live" && (
                      <span>
                        <Icon.Pencil color="#0078b3"></Icon.Pencil>
                      </span>
                    )}
                  </span>
                ) : (
                  <span>
                    <Tag color="red">
                      <YoutubeOutlined
                        style={{ color: "#FF0000", fontSize: "14px" }}
                      />{" "}
                      Scheduled At
                    </Tag>
                  </span>
                )}{" "}
                {moment(youtubeSocial.liveAt).format("DD/MM/YYYY, h:mma")} IST
              </p>
            )}
          </div>
        ) : (
          <button
            className="btn-submit btn-outline"
            onClick={onShowCreativeView}
          >
            Schedule
          </button>
        )}
      </div>
    </div>
  );
};

export default DownLoadedFile;
