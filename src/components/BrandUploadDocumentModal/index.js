import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { Modal, Tooltip } from "antd";
import UploadDocumentCard from "../UploadDocumentCard";
import UploadAttchmentFile from "../UploadAttchmentFile";
import pngImg from "assets/images/png.svg";
import { MediaService } from "services/creators";
import { ACTIONS } from "redux/creators/creatives/actions";

const UploadDocumentModal = ({ src, creative }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [fileUploadStage, setFileUploadStage] = useState(0);

  const onCancel = () => {
    setVisible(false);
    reset();
  };

  const reset = () => {
    setFiles([]);
    setShowFile(false);
    setFileUploadStage(0);
  };

  useEffect(() => {
    const progress = {};
    files.forEach((f) => (progress[f.uid] = 0));
    setUploadProgress(progress);
  }, [files]);

  const updateProgress = (fileUid, progress) => {
    setUploadProgress({ ...uploadProgress, ...{ [fileUid]: progress } });
  };

  const removeFileFromUpload = (file) => {
    const index = files.indexOf(file);
    const selectedFiles = files;
    if (index > -1) {
      selectedFiles.splice(index, 1);
      setFiles([...selectedFiles]);
      if (selectedFiles.length === 0) {
        reset();
      }
    }
  };

  const handleUpload = () => {
    if (fileUploadStage === 0) {
      setShowFile(true);
      setFileUploadStage(1);
      return;
    }

    MediaService.uploadMultiple(files, updateProgress)
      .then((media) => {
        dispatch({
          type: ACTIONS.UPDATE_ATTACHMENTS,
          payload: {
            body: { newAttachments: media.map((m) => m.id) },
            path: { id: creative.id },
          },
          onSuccess: onCancel,
        });
      })
      .catch((e) => console.log(e));
  };

  const ModalTitle = () => (
    <div className="flex justify-between">
      <span>Upload Attachment</span>
      {showFile && <span>{files.length} file(s) selected</span>}
    </div>
  );

  const ModalProps = {
    title: ModalTitle(),
    visible,
    onCancel: () => onCancel(),
    className: "upload-modal",
    centered: true,
    width: 700,
  };

  return (
    <>
      <Tooltip
        title="Attach any document or reference."
        placement="bottom"
        className="cursor-pointer"
      >
        <img
          width="16"
          src={src}
          onClick={() => setVisible(true)}
          alt={"dfbnjgfjdn"}
        />
      </Tooltip>

      <Modal {...ModalProps}>
        {showFile ? (
          <div className="conatiner-file">
            {files &&
              files.map((file) => (
                <UploadAttchmentFile
                  percenter={uploadProgress[file.uid]}
                  fileName={file.originFileObj.name}
                  icon={pngImg}
                  onDelete={() => removeFileFromUpload(file)}
                />
              ))}
          </div>
        ) : (
          <UploadDocumentCard setfileList={setFiles} files={files} />
        )}

        <div className="comment-btns flex justify-between ">
          <div className="">
            <button
              className={`btn-submit ${files.length === 0 ? "disabled" : null}`}
              onClick={handleUpload}
            >
              {fileUploadStage === 0 ? "Review" : "Upload"}
            </button>
            <button className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UploadDocumentModal;
