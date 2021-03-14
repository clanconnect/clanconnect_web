import React from "react";
import { Progress } from "antd";
import {
  DeleteOutlined,
  VideoCameraOutlined,
  FileOutlined,
} from "@ant-design/icons";

import "./styles.scss";

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
          {mimeType.includes("video") && <VideoCameraOutlined />}
          {mimeType.includes("image") && (
            <img src={icon} alt="" width="25" className="mr-15" />
          )}
          {mimeType === "" && <FileOutlined />}
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
