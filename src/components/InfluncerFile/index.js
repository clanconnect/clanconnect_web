import React from "react";
import { downloadMedia } from "helpers";
import { Checkbox } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import VideoPlayer from "react-player";
import CreativeModal from "../CreativeModal";
import download from "assets/images/download.svg";
import fullScreen from "assets/images/full-screen.svg";
import moment from "moment";
import "./styles.scss";

const InfluncerFile = ({
  showSelectAllActive,
  creativeDetails,
  selectedCreatives,
  setSelectedCreatives,
}) => {
  const handleSelect = (creativeId) => {
    const uppdatedCreative = new Set(selectedCreatives);
    if (uppdatedCreative.has(creativeId)) {
      uppdatedCreative.delete(creativeId);
    } else {
      uppdatedCreative.add(creativeId);
    }
    setSelectedCreatives(Array.from(uppdatedCreative));
  };

  return creativeDetails
    ? creativeDetails.map((data, index) => {
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
                      ) : // <div className="chat-icon">
                      //   <CreativeModal
                      //     src={chat}
                      //     className="icons-custom"
                      //     creative={item}
                      //     influncerName={data.user.name}
                      //   />
                      // </div>
                      null}
                      {!showSelectAllActive && (
                        <div className="icons-row">
                          <CreativeModal
                            src={fullScreen}
                            className="icons-custom icon-sec"
                            creative={item}
                            influncerName={data.user.name}
                          />
                          <div className="icon-sec">
                            <img
                              src={download}
                              alt="download icon"
                              className="icons-custom cursor-pointer"
                              onClick={() =>
                                downloadMedia(item?.media[0]?.slug)
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="date-box">
                      <CalendarOutlined />
                      <span className="date-text">
                        {moment(
                          item.media[0].createdAt && item.media[0].createdAt
                        ).format("DD/MM/YYYY")}
                      </span>
                    </p>
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
    : null;
};

export default InfluncerFile;
