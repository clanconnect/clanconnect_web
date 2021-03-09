import React from "react";
import { CalendarOutlined } from "@ant-design/icons";

import download from "assets/images/download.svg";

import "./styles.scss";

const DownLoadedFile = ({ creative = {} }) => {
  const media = creative.media ? creative.media[0] : undefined;
  const imageUrl = `${process.env.REACT_APP_MEDIA_BASE_URL}/${
    media ? media.slug : ""
  }`;

  return (
    <div className="influncer-file-container">
      <div className="influncer-file-subcontainer">
        <div className="img-box-download">
          <img src={imageUrl} alt="" className="full-img" />
          <div className="chat-icon">
            {/* <CreativeModal src={chat} className="icons-custom" /> */}
          </div>
          <div className="icons-row">
            {/* <CreativeModal
              src={fullScreen}
              className='icons-custom'
              influencerStatus
            /> */}
            <img src={download} alt="" className="icons-custom" />
          </div>
        </div>
        <p className="date-box">
          <CalendarOutlined />
          <span className="date-text">{creative.createdAt}</span>
        </p>
      </div>
    </div>
  );
};

export default DownLoadedFile;
