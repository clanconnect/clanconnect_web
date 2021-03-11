import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Modal, Empty } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import UploadDocumentCard from "../UploadDocumentCard";
import UploadAttchmentFile from "../UploadAttchmentFile";
import { connect } from "react-redux";
import { ACTIONS } from "redux/creators/creatives/actions";
import { MediaService } from "services/creators";

const UploadTypes = [
  { label: "Uploading a new creative", value: "upload new" },
  { label: "A version of previously sent creative", value: "upload added" },
];

const ShowUploadConsentView = ({
  uploadNewFile,
  handleUploadNewFile,
  disablePreviousVersionUpload,
}) => {
  const types = disablePreviousVersionUpload
    ? UploadTypes.filter((f) => f.value !== "upload added")
    : UploadTypes;

  return ["upload added", "upload new"].includes(uploadNewFile) ? null : (
    <div>
      <p className="text-center mt-30">Please select one option:</p>
      <div
        className={`flex ${
          disablePreviousVersionUpload ? "justify-center" : "justify-between"
        }`}
      >
        {types.map((o) => (
          <button
            key={`upload-type-${o.value}`}
            className="select-upload"
            onClick={() => handleUploadNewFile(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const UploadNewCreatives = ({
  onCancel,
  selectedCreative,
  files,
  setFiles,
  handleUpload,
  showFile,
  showOldFile,
  uploadProgress,
  fileUploadStage,
  removeFileFromUpload,
}) => {
  return (
    <>
      {!showFile ? (
        <>
          {showOldFile && (
            <div className="mb-30">
              <p className="text-center mb-30">
                Uploading a new version for the selected creative shown below:
              </p>
              <UploadAttchmentFile
                fileName={selectedCreative.id}
                icon={`${process.env.REACT_APP_IMAGE_BASE_URL}/${
                  selectedCreative?.media[0]?.slug || "default"
                }`}
                uploadedFile
              />
            </div>
          )}
          <UploadDocumentCard
            setfileList={setFiles}
            files={files}
            multiple={!!!Object.keys(selectedCreative).length}
            accept={["image", "video"]}
          />
        </>
      ) : (
        <div className="conatiner-file">
          {files.map((file) => (
            <UploadAttchmentFile
              key={`file-${file.uid}`}
              percenter={uploadProgress[file.uid]}
              fileName={file.name}
              icon={URL.createObjectURL(file.originFileObj)}
              onDelete={() => removeFileFromUpload(file)}
            />
          ))}
        </div>
      )}

      <div className="comment-btns flex justify-between ">
        <div className="">
          <button
            className="btn-submit"
            onClick={handleUpload}
            disabled={files.length < 1}
          >
            {!fileUploadStage ? "Review" : "Upload"}
          </button>
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

const InfluencerUploadModal = ({
  btnText,
  style,
  project,
  dispatch,
  creatives,
  disablePreviousVersionUpload,
}) => {
  const [visible, setVisible] = useState(false);
  const [uploadNewFile, setUploadNewFile] = useState("");
  const [showFile, setShowFile] = useState(false);
  const [showOldFile, setShowOldFile] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [selectedCreative, setSelectedCreative] = useState({});
  const [fileUploadStage, setFileUploadStage] = useState(0);

  useEffect(() => {
    const progress = {};
    files.forEach((f) => (progress[f.uid] = 0));
    setUploadProgress(progress);
  }, [files]);

  const removeFileFromUpload = (file) => {
    const index = files.indexOf(file);
    const selectedFiles = files;
    if (index > -1) {
      selectedFiles.splice(index, 1);
      setFiles([...selectedFiles]);
      if (selectedFiles.length === 0) {
        handleUploadNewFile("upload new");
      }
    }
  };
  const handleUploadNewFile = (value) => {
    setSelectedCreative({});
    setFiles([]);
    setUploadNewFile(value);
    setShowOldFile(false);
    setShowFile(false);
    setFileUploadStage(0);
  };

  const showUploadFilesProgress = (value) => {
    setShowFile(value);
  };

  const selectCreative = (creative) => {
    setSelectedCreative(creative);
    setShowOldFile(true);
    setUploadNewFile("upload new");
  };

  const onCancel = () => {
    setVisible(false);
    setFiles([]);
    setUploadNewFile("");
    setShowOldFile(false);
    setShowFile(false);
    setFileUploadStage(0);
  };

  const updateProgress = (fileUid, progress) => {
    setUploadProgress({ ...uploadProgress, ...{ [fileUid]: progress } });
  };

  const handleUpload = () => {
    if (files.length === 0) return;

    if (fileUploadStage === 0) {
      setShowFile(true);
      setFileUploadStage(1);
      return;
    }

    MediaService.uploadMultiple(files, updateProgress)
      .then((res) => {
        for (const media of res) {
          if (!selectedCreative || !selectedCreative.id) {
            const payload = {
              body: { mediaId: media.id, projectId: project.id },
            };
            dispatch({
              type: ACTIONS.ADD,
              payload,
              onSuccess: onCancel,
              selectedStatus: creatives[0].status,
            });
          } else {
            const payload = {
              body: { mediaId: media.id },
              path: { id: selectedCreative.id },
            };
            dispatch({
              type: ACTIONS.UPDATE,
              payload,
              onSuccess: onCancel,
              selectedStatus: creatives[0].status,
            });
          }
        }
      })
      .catch((e) => console.log(e));
  };

  const ModalTitle = (
    <>
      {uploadNewFile === "" && <span>Upload Creative</span>}
      {uploadNewFile === "upload added" && (
        <span>
          <ArrowLeftOutlined
            onClick={() => {
              handleUploadNewFile("");
              setFileUploadStage(0);
            }}
            className="mr-5"
          />{" "}
          Upload a version
        </span>
      )}

      {uploadNewFile === "upload new" && (
        <span>
          <ArrowLeftOutlined
            onClick={
              !showFile
                ? () => handleUploadNewFile("")
                : () => showUploadFilesProgress(false)
            }
            className="mr-5"
          />{" "}
          Upload a new creative
        </span>
      )}
    </>
  );

  const ModalProps = {
    title: ModalTitle,
    visible,
    onOk: () => setVisible(false),
    onCancel: () => onCancel(false),
    className: "influencer-upload-modal",
    centered: true,
    width: 700,
  };

  return (
    <>
      <button className={style} onClick={() => setVisible(true)}>
        {btnText}
      </button>
      <Modal {...ModalProps}>
        <div className="comapign-text">
          <span>{project.title}</span>
          {showFile && (
            <span className="text-sm">{files.length} File(s) Selected</span>
          )}
        </div>

        <ShowUploadConsentView
          key="show-upload-consent-view"
          disablePreviousVersionUpload={disablePreviousVersionUpload}
          handleUploadNewFile={handleUploadNewFile}
          uploadNewFile={uploadNewFile}
        />

        {uploadNewFile === "upload new" &&
          UploadNewCreatives({
            onCancel,
            setFiles,
            handleUpload,
            removeFileFromUpload,
            fileUploadStage,
            showFile,
            showOldFile,
            files,
            uploadProgress,
            selectedCreative,
          })}

        {uploadNewFile === "upload added" && (
          <div>
            <p className="text-center mb-30">
              Please select one creative for which you want to upload a version:
            </p>
            <div className="conatiner-file">
              {creatives.length != 0 ? (
                creatives.map((creative) => (
                  <UploadAttchmentFile
                    key={`previous-creative-version-${creative.id}`}
                    fileName={creative.id}
                    icon={`${process.env.REACT_APP_IMAGE_BASE_URL}/${
                      creative?.media[0]?.slug || "default"
                    }`}
                    uploadedFile
                    handleClick={() => selectCreative(creative)}
                  />
                ))
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

const mapStateToProps = ({ CreatorCreatives }) => ({
  progressList: CreatorCreatives.progressList || {},
});

export default connect(mapStateToProps)(InfluencerUploadModal);
