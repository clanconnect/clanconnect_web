import React from "react";
import "./styles.scss";
import { Progress } from "antd";
import {
  DeleteOutlined,
  VideoCameraOutlined,
  FileOutlined,
  FileImageOutlined,
  AudioOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  FilePptOutlined,
  FileZipOutlined,
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

const UploadAttchmentFile = ({
  percenter,
  icon,
  fileName,
  uploadedFile,
  handleClick,
  onDelete,
  mimeType = "",
}) => {
  return (
    <>
      <div className="file-card cursor-pointer" onClick={handleClick}>
        <div className="flex">
          {mimeType.includes("image") ? (
            <img src={icon} alt="" width="25" className="mr-15" />
          ) : (
            MediaIcon(mimeType)
          )}
          <p className="file-title">{fileName}</p>
        </div>
        {uploadedFile ? null : (
          <div style={{ width: "35%" }} className="progress-custom">
            <Progress percent={percenter} size="small" />
            <DeleteOutlined onClick={onDelete} />
          </div>
        )}
      </div>
    </>
  );
};

export default UploadAttchmentFile;
