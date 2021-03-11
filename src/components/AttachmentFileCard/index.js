import React from "react";
import "./styles.scss";
import download from "assets/images/download.svg";
import { convertSizeForHuman, downloadMedia } from "helpers";
import {
  VideoCameraOutlined,
  FileImageOutlined,
  AudioOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  FilePptOutlined,
  FileZipOutlined,
  FileOutlined,
  Html5Outlined,
} from "@ant-design/icons";

const MediaIcon = (mimeType) => {
  const map = {
    image: (props = {}) => <FileImageOutlined {...props} />,
    audio: (props = {}) => <AudioOutlined {...props} />,
    video: (props = {}) => <VideoCameraOutlined {...props} />,
    "application/pdf": (props = {}) => <FilePdfOutlined {...props} />,
    "application/msword": (props = {}) => <FileTextOutlined {...props} />,
    "application/vnd.ms-word": (props = {}) => <FileTextOutlined {...props} />,
    "application/vnd.oasis.opendocument.text": (props = {}) => (
      <FileTextOutlined {...props} />
    ),
    "application/vnd.openxmlformats-officedocument.wordprocessingml": (
      props = {}
    ) => <FileTextOutlined {...props} />,
    "application/vnd.ms-excel": (props = {}) => (
      <FileExcelOutlined {...props} />
    ),
    "application/vnd.openxmlformats-officedocument.spreadsheetml": (
      props = {}
    ) => <FileExcelOutlined {...props} />,
    "application/vnd.oasis.opendocument.spreadsheet": (props = {}) => (
      <FileExcelOutlined {...props} />
    ),
    "application/vnd.ms-powerpoint": (props = {}) => (
      <FilePptOutlined {...props} />
    ),
    "application/vnd.openxmlformats-officedocument.presentationml": (
      props = {}
    ) => <FilePptOutlined {...props} />,
    "application/vnd.oasis.opendocument.presentation": (props = {}) => (
      <FilePptOutlined {...props} />
    ),
    "text/plain": (props = {}) => <FileOutlined {...props} />,
    "text/html": (props = {}) => <Html5Outlined {...props} />,
    "application/zip": (props = {}) => <FileZipOutlined {...props} />,
  };

  for (const key in map) {
    if (mimeType.includes(key)) {
      const icon = map[key];
      return <>{icon({ style: { fontSize: "25px", color: "#5d5d5d" } })}</>;
    }
  }
};

const AttachmentFileCard = ({ media = {} }) => {
  return (
    <div
      className="file-card cursor-pointer"
      onClick={() => downloadMedia(media.slug)}
    >
      <div className="flex">
        {MediaIcon(media.mimeType || "")}
        <div>
          <p className="file-title">{media.originalName || media.id}</p>
          <p className="file-date">
            <span>{new Date(media.createdAt).toISOString().split("T")[0]}</span>
          </p>
        </div>
      </div>

      <span className=" file-size">{convertSizeForHuman(media.size || 0)}</span>
      <img src={download} alt="download" width="16" />
    </div>
  );
};

export default AttachmentFileCard;
