import React, { useState } from "react";
import { downloadMedia } from "helpers";
import { Checkbox, Tag, Empty } from "antd";
import {
  CalendarOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import VideoPlayer from "react-player";
import CreativeModal from "../CreativeModal";
import download from "assets/images/download.svg";
import fullScreen from "assets/images/full-screen.svg";
import moment from "moment";
import chat from "assets/images/chat.svg";
import "./styles.scss";
import { useParams } from "react-router";

const InfluncerFile = ({
  showSelectAllActive,
  creativeDetails,
  selectedCreatives,
  setSelectedCreatives,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const handleSelect = (creativeId) => {
    const uppdatedCreative = new Set(selectedCreatives);
    if (uppdatedCreative.has(creativeId)) {
      uppdatedCreative.delete(creativeId);
    } else {
      uppdatedCreative.add(creativeId);
    }
    setSelectedCreatives(Array.from(uppdatedCreative));
  };

  const projectId = useParams();
  return creativeDetails && creativeDetails.length > 0 ? (
    creativeDetails.map((data, index) => {
      return (
        <div
          className="common-uploads"
          key={`creative-influencer-block-${data.user.id}`}
        >
          {data?.creatives[0]?.media?.length !== 0 && (
            <h2 className="title">{data.user.name}</h2>
          )}
          <div className="influncer-file-row">
            {data.creatives.map((item, index) => {
              return item.media[0]?.mimeType ? (
                <div
                  className="influncer-file-container"
                  key={`influencer-creative-block-${item.id}`}
                  onClick={() => setOpenModal(true)}
                >
                  <div className="img-box-download">
                    {item.media[0].mimeType &&
                    item.media[0]?.mimeType.includes("image") ? (
                      <img
                        src={`${process.env.REACT_APP_IMAGE_BASE_URL}/${
                          item?.media[0]?.slug || "default"
                        }`}
                        alt=""
                        className="full-img"
                        onError={(e) => {
                          e.target.src = `${
                            process.env.REACT_APP_MEDIA_ORIGINAL_URL
                          }/${item?.media[0]?.slug || "default"}`;
                        }}
                      />
                    ) : (
                      <VideoPlayer
                        url={`${process.env.REACT_APP_VIDEO_BASE_URL}/${item?.media[0]?.slug}`}
                        className=" full-video"
                        controls={false}
                      />
                    )}

                    {showSelectAllActive ? (
                      <Checkbox
                        className="chat-icon"
                        onChange={() => {
                          handleSelect(item.id);
                        }}
                        checked={selectedCreatives.includes(item.id)}
                      ></Checkbox>
                    ) : (
                      <div className="chat-icon">
                        {item?.stats?.unreadComments ? (
                          <span className="number">
                            {" "}
                            {item?.stats?.unreadComments}
                          </span>
                        ) : null}
                        <CreativeModal
                          src={chat}
                          className="icons-custom"
                          creative={item}
                          projectId={projectId}
                          influncerName={data.user.name}
                        />
                      </div>
                    )}
                    {!showSelectAllActive && (
                      <div className="icons-row">
                        <CreativeModal
                          src={fullScreen}
                          className="icons-custom icon-sec"
                          creative={item}
                          projectId={projectId}
                          influncerName={data.user.name}
                          openModal={openModal}
                          setOpenModal={setOpenModal}
                        />
                        <div className="icon-sec">
                          <img
                            src={download}
                            alt="download icon"
                            className="icons-custom cursor-pointer"
                            onClick={() => downloadMedia(item?.media[0]?.slug)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="creative-footer">
                    <div className="date-box">
                      <CalendarOutlined />
                      <span className="date-text">
                        {moment(item.media[0].createdAt).format("DD/MM/YYYY")}
                      </span>
                    </div>
                    <div className="versions">
                      Versions: {item.latestVersion}
                    </div>
                  </div>
                  {(item.socials.youtube || item.socials.instagram) && (
                    <SocialList creative={item} />
                  )}
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
  ) : (
    <Empty />
  );
};

export default InfluncerFile;

const SocialList = ({ creative }) => {
  const instagramSocial = creative?.socials?.instagram;
  const youtubeSocial = creative?.socials?.youtube;

  return (
    <div className="approved-schedules">
      {instagramSocial && youtubeSocial && (
        <>
          <p>
            <Tag color="red">
              <YoutubeOutlined style={{ color: "#FF0000", fontSize: "14px" }} />{" "}
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
            {moment(instagramSocial.liveAt).format("DD/MM/YYYY, h:mma")} IST
          </p>
        </>
      )}
      {instagramSocial && !youtubeSocial && (
        <p>
          <Tag color="purple">
            <InstagramOutlined style={{ color: "#833AB4", fontSize: "14px" }} />{" "}
            Scheduled at
          </Tag>
          {moment(instagramSocial.liveAt).format("DD/MM/YYYY, h:mma")} IST
        </p>
      )}
      {!instagramSocial && youtubeSocial && (
        <p>
          <Tag color="red">
            <YoutubeOutlined style={{ color: "#FF0000", fontSize: "14px" }} />{" "}
            Scheduled At
          </Tag>
          {moment(youtubeSocial.liveAt).format("DD/MM/YYYY, h:mma")} IST
        </p>
      )}
    </div>
  );
};
