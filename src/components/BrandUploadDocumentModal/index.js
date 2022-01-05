import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { Modal, Tooltip } from "antd";
import UploadDocumentCard from "../UploadDocumentCard";
import UploadAttchmentFile from "../UploadAttchmentFile";
import pngImg from "assets/images/png.svg";
import { MediaService } from "services/creators";
import { ACTIONS } from "redux/creators/creatives/actions";
import { remove } from "lodash";
import { getCreativesAction } from "redux/brands/creatives/actions";

const UploadDocumentModal = ({ src, creative, project = {} }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [fileUploadStage, setFileUploadStage] = useState(0);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState([]);

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

  const removeFileFromUpload = (file) => {
    const selectedFiles = files;
    remove(selectedFiles, (o) => o.uid === file.uid);
    const uploadedFiles = uploadedMedia;
    remove(uploadedFiles, (o) => o.local.uid === file.uid);
    setUploadedMedia([...uploadedFiles]);
    setFiles([...selectedFiles]);

    if (selectedFiles.length === 0) {
      reset("upload new");
    }
  };

  const handleMediaUpload = () => {
    setShowFile(true);
    setFileUploadStage(1);
    setUploadingFile(true);

    const updateProgress = (fileUid, progress) => {
      setUploadProgress((prevState) => {
        return { ...prevState, ...{ [fileUid]: progress } };
      });
    };

    MediaService.uploadMultiple(files, updateProgress)
      .then((res) => {
        const uploadedFiles = [];
        for (const media of res) {
          uploadedFiles.push(media);
        }

        setUploadedMedia([...uploadedFiles]);
        setUploadingFile(false);
      })
      .catch((e) => console.log(e));
  };

  const handleAttachmentUpload = () => {
    dispatch({
      type: ACTIONS.UPDATE_ATTACHMENTS,
      payload: {
        body: { newAttachments: uploadedMedia.map((m) => m.server.id) },
        path: { id: creative.id },
      },
      onSuccess: () => {
        dispatch(
          getCreativesAction({
            params: { include: "media,user", status: creative.status },
            id: project.id,
          })
        );
        onCancel();
      },
    });
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    if (fileUploadStage === 0) handleMediaUpload();
    if (fileUploadStage === 1) handleAttachmentUpload();
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
              files.map((file, index) => (
                <UploadAttchmentFile
                  key={index}
                  percenter={uploadProgress[file.uid]}
                  fileName={file.originFileObj.name}
                  icon={pngImg}
                  mimeType={file.type}
                  onDelete={() => removeFileFromUpload(file)}
                />
              ))}
          </div>
        ) : (
          <UploadDocumentCard setfileList={setFiles} files={files} />
        )}

        {files.length > 0 && (
          <div className="comment-btns flex justify-between ">
            <div className="">
              <button
                className="btn-submit"
                onClick={handleUpload}
                disabled={uploadingFile}
              >
                {fileUploadStage === 0 &&
                  (uploadingFile ? "Uploading..." : "Upload")}
                {fileUploadStage === 1 &&
                  (uploadingFile ? "Sending...." : "Send")}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UploadDocumentModal;
