import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Modal, Empty, Result } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import UploadDocumentCard from "../UploadDocumentCard";
import UploadAttchmentFile from "../UploadAttchmentFile";
import { connect } from "react-redux";
import { ACTIONS } from "redux/creators/creatives/actions";
import { MediaService } from "services/creators";
import { remove } from "lodash";

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
            onClick={(event) => {
              handleUploadNewFile(o.value);
              event.stopPropagation();
            }}
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
  uploadingFile,
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
                mimeType={selectedCreative?.media[0]?.mimeType || ""}
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
          {files.map((file) => {
            return (
              <UploadAttchmentFile
                key={`file-${file.uid}`}
                percenter={uploadProgress[file.uid]}
                fileName={file.name}
                mimeType={file.type}
                icon={URL.createObjectURL(file.originFileObj)}
                onDelete={() => removeFileFromUpload(file)}
              />
            );
          })}
        </div>
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
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [selectedCreative, setSelectedCreative] = useState({});
  const [fileUploadStage, setFileUploadStage] = useState(0);
  const [uploadedMedia, setUploadedMedia] = useState([]);

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
      handleUploadNewFile("upload new");
    }
  };

  const handleUploadNewFile = (value) => {
    setUploadNewFile(value);
    setUploadedMedia([]);
    setFiles([]);
    resetUpload();
  };

  const resetUpload = () => {
    setFileUploadStage(0);
    setSelectedCreative({});
    setShowOldFile(false);
    setShowFile(false);
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
    handleUploadNewFile("");
  };

  const handleMediaUpload = () => {
    setShowFile(true);
    setUploadingFile(true);

    const updateProgress = (fileUid, progress) => {
      setUploadProgress((prevState) => {
        return { ...prevState, ...{ [fileUid]: progress } };
      });
    };

    MediaService.uploadMultiple(files, updateProgress)
      .then((res) => {
        setFileUploadStage(1);
        const uploadedFiles = [];
        for (const media of res) {
          uploadedFiles.push(media);
        }

        setUploadedMedia([...uploadedFiles]);
        setUploadingFile(false);
      })
      .catch((e) => console.log(e));
  };

  const handleCreativeUpload = () => {
    setUploadingFile(true);
    const onSuccess = () => {
      setUploadingFile(false);
      setFileUploadStage(2);
    };
    const selectedStatus = creatives[0]?.status;

    for (const media of uploadedMedia) {
      if (selectedCreative && selectedCreative.id) {
        const payload = {
          body: { mediaId: media.server.id },
          path: { id: selectedCreative.id },
        };
        dispatch({ type: ACTIONS.UPDATE, payload, onSuccess, selectedStatus });
        return;
      }
      const payload = {
        body: { mediaId: media.server.id, projectId: project.id },
      };
      dispatch({ type: ACTIONS.ADD, payload, onSuccess, selectedStatus });
    }
    return;
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    if (fileUploadStage === 0) handleMediaUpload();
    if (fileUploadStage === 1) handleCreativeUpload();
  };

  const ModalTitle = (
    <>
      {fileUploadStage < 2 && (
        <>
          {uploadNewFile === "" && <span>Upload Creative</span>}
          {uploadNewFile === "upload added" && (
            <span>
              <ArrowLeftOutlined
                onClick={() => handleUploadNewFile("")}
                className="mr-5"
              />{" "}
              Upload a version
            </span>
          )}

          {uploadNewFile === "upload new" && (
            <span>
              <ArrowLeftOutlined
                onClick={() => {
                  resetUpload();
                  showUploadFilesProgress(false);
                }}
                className="mr-5"
              />{" "}
              Upload a new creative
            </span>
          )}
        </>
      )}
    </>
  );

  const ModalProps = {
    title: ModalTitle,
    maskClosable: false,
    visible,
    onOk: () => setVisible(false),
    onCancel: (event) => {
      onCancel(false);
      event.stopPropagation();
    },
    className: "influencer-upload-modal",
    centered: true,
    width: 700,
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button
        className={style}
        onClick={(event) => {
          setVisible(true);
          event.stopPropagation();
        }}
      >
        {btnText}
      </button>
      <Modal {...ModalProps}>
        {fileUploadStage < 2 && (
          <div className="comapign-text">
            <span>{project.title}</span>
            {showFile && (
              <span className="text-sm">{files.length} File(s) Selected</span>
            )}
          </div>
        )}

        <ShowUploadConsentView
          key="show-upload-consent-view"
          disablePreviousVersionUpload={disablePreviousVersionUpload}
          handleUploadNewFile={handleUploadNewFile}
          uploadNewFile={uploadNewFile}
        />

        {uploadNewFile === "upload new" &&
          fileUploadStage < 2 &&
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
            uploadingFile,
          })}

        {fileUploadStage === 2 && (
          <Result
            status="success"
            title="All creatives sucesfully uploaded"
            subTitle="Would you like to upload more creatives?"
            extra={[
              <button
                className="btn-submit"
                onClick={() => handleUploadNewFile("")}
              >
                Yes, Upload More{" "}
              </button>,
              <button className="btn-cancel" onClick={() => onCancel()}>
                No, Thanks!
              </button>,
            ]}
          />
        )}

        {uploadNewFile === "upload added" && (
          <div>
            <p className="text-center mb-30">
              Please select one creative for which you want to upload a version:
            </p>
            <div className="conatiner-file">
              {creatives.length !== 0 ? (
                creatives.map((creative) => (
                  <UploadAttchmentFile
                    key={`previous-creative-version-${creative.id}`}
                    fileName={creative.id}
                    icon={`${process.env.REACT_APP_IMAGE_BASE_URL}/${
                      creative?.media[0]?.slug || "default"
                    }`}
                    mimeType={creative?.media[0]?.mimeType}
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
    </div>
  );
};

const mapStateToProps = ({ CreatorCreatives }) => ({
  progressList: CreatorCreatives.progressList || {},
});

export default connect(mapStateToProps)(InfluencerUploadModal);
