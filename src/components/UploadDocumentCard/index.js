import React from "react";
import "./styles.scss";
import { Upload } from "antd";
import upload from "assets/images/upload.svg";

const UploadDocumentCard = ({ setfileList, multiple }) => {
  const { Dragger } = Upload;

  const props = {
    name: "file",
    multiple: multiple === undefined ? true : multiple,
    beforeUpload: () => false,
    onChange: (info) => setfileList(info.fileList),
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        {/* <InboxOutlined /> */}
        <img src={upload} alt="upload" width="48" />
      </p>
      <p className="upload-text">Drag a image/document here</p>
      <div className="upload-text mb-10">- or -</div>
      <button className="upload-btn">Select a photo from you computer</button>
    </Dragger>
  );
};

export default UploadDocumentCard;
