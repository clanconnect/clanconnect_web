import React from "react";
import "./styles.scss";
import img from "assets/images/png.svg";
import pdf from "assets/images/pdf.svg";
import download from "assets/images/download.svg";
import { downloadMedia } from "helpers";

const MediaIcon = (mimeType) => {
  const map = {
    image: img,
    audio: "fa-file-audio-o",
    video: "fa-file-video-o",
    "application/pdf": pdf,
    "application/msword": "fa-file-word-o",
    "application/vnd.ms-word": "fa-file-word-o",
    "application/vnd.oasis.opendocument.text": "fa-file-word-o",
    "application/vnd.openxmlformats-officedocument.wordprocessingml":
      "fa-file-word-o",
    "application/vnd.ms-excel": "fa-file-excel-o",
    "application/vnd.openxmlformats-officedocument.spreadsheetml":
      "fa-file-excel-o",
    "application/vnd.oasis.opendocument.spreadsheet": "fa-file-excel-o",
    "application/vnd.ms-powerpoint": "fa-file-powerpoint-o",
    "application/vnd.openxmlformats-officedocument.presentationml":
      "fa-file-powerpoint-o",
    "application/vnd.oasis.opendocument.presentation": "fa-file-powerpoint-o",
    "text/plain": "fa-file-text-o",
    "text/html": "fa-file-code-o",
    "application/json": "fa-file-code-o",
    "application/gzip": "fa-file-archive-o",
    "application/zip": "fa-file-archive-o",
  };

  for (const key in map) {
    if (mimeType.includes(key)) {
      return map[key];
    }
  }
};

const AttachmentFileCard = ({ media }) => {
  return (
    <div className="file-card cursor-pointer">
      <div className="flex ">
        <img
          src={MediaIcon(media.mimeType)}
          alt="download"
          width="25"
          className="mr-10 "
        />
        <div>
          <span className="file-title">{media.originalName || media.id}</span>
          <p className="file-date">
            <span>{new Date(media.createdAt).toISOString().split("T")[0]}</span>
          </p>
        </div>
      </div>

      <span className=" file-size">23 MB</span>
      <img
        src={download}
        alt="download"
        width="16"
        onClick={() => downloadMedia(media.slug)}
      />
    </div>
  );
};

export default AttachmentFileCard;
