import React from "react";
import "./styles.scss";
import { Upload } from "antd";
import upload from "assets/images/upload.svg";

const allowedAccepts = {
  image: ".png,.jpg,.jpeg",
  audio: "audio/*",
  video: "video/*",
  pdf: ".pdf",
  excel: "",
  doc:
    ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

const UploadDocumentCard = ({
  setfileList,
  multiple,
  files = [],
  accept = Object.keys(allowedAccepts),
}) => {
  const { Dragger } = Upload;
  let fileTypes = "";
  if (accept.length < 1) {
    fileTypes = Object.values(allowedAccepts).join(",");
  } else {
    fileTypes = accept.map((type) => allowedAccepts[type]).join(",");
  }

  const props = {
    name: "file",
    fileList: files,
    multiple: multiple === undefined ? true : multiple,
    beforeUpload: () => false,
    onChange: (info) => setfileList(info.fileList),
    accept: fileTypes,
  };

  function hidenewCreativeTab () {
    document.querySelector('.upload-older-creative').style.setProperty('display', 'none', 'important')
  }

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        {/* <InboxOutlined /> */}
        <img src={upload} alt="upload" width="48" />
      </p>
      <p className="upload-text">Drag a image/document here</p>
      <div className="upload-text mb-10">- or -</div>
      <button onClick={hidenewCreativeTab} className="upload-btn">Select a photo from your computer</button>
    </Dragger>
  );
};

export default UploadDocumentCard;
