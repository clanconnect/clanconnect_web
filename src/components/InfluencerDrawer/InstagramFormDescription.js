import "./styles.scss";
import { Button, Descriptions, Tag, Popconfirm, message } from "antd";
import { useEffect, useState, useRef } from "react";
import { ACTIONS } from "redux/creators/socials/instagram/actions";
import { useDispatch } from "react-redux";

const InstagramFormDescription = ({
  closeDrawer,
  setVisible,
  instagramData,
  setIsIgFormDescriptionVisible,
  setIsIgScheduleExistForCreative,
}) => {
  const dispatch = useDispatch();

  // possible values - "Approved/Not Approved"
  const [approvalStatus, setApprovalStatus] = useState();
  // possible values - "Cancelled/Uploaded/Scheduled/Unknown"
  const [uploadStatus, setUploadStatus] = useState();

  // 'Edit' will be changed to 'Create New' once the post is cancelled
  // possible values - "Edit/Create New"
  const [editBtnText, setEditBtnText] = useState("Edit");
  const [isGoLiveBtnDisabled, setIsGoLiveBtnDisabled] = useState();
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState();
  const [isEditBtnDisabled, setIsEditBtnDisabled] = useState(false);

  const commentBlockBtn = useRef();
  const handleShowCommentBlock = () => {
    closeDrawer();
    setVisible(true);
  };
  const goLiveConfirm = () => {
    dispatch({
      type: ACTIONS.FINAL_APPROVE,
      payload: {
        query: { socialId: instagramData?.id },
      },
    });
    setUploadStatus("Unknown");
    message.info("Youtube Post Scheduled To Go Live");
    setIsGoLiveBtnDisabled(true);
    setIsEditBtnDisabled(true);
  };
  const cancelConfirm = () => {
    dispatch({
      type: ACTIONS.CANCEL_POST,
      payload: {
        query: { socialId: instagramData?.id },
      },
    });
    setIsEditBtnDisabled(false);
    setUploadStatus("Cancelled");
    setIsCancelBtnDisabled(true);
    message.info("Youtube Post Cancelled");
  };
  useEffect(() => {
    setEditBtnText("Edit");
    if (instagramData?.isApprovedByBrand) {
      setApprovalStatus(true);
      setIsEditBtnDisabled(true);
    } else if (instagramData?.isApprovedByBrand === false) {
      setApprovalStatus(false);
      setIsGoLiveBtnDisabled(true);
    }
    if (instagramData?.isUploaded) {
      setUploadStatus("Uploaded");
      setIsCancelBtnDisabled(true);
      setIsGoLiveBtnDisabled(true);
      setIsEditBtnDisabled(true);
    } else if (instagramData?.isCancelled) {
      setUploadStatus("Cancelled");
      setIsCancelBtnDisabled(true);
      setIsGoLiveBtnDisabled(true);
      setIsEditBtnDisabled(false);
      setEditBtnText("Create New");
    } else if (
      instagramData?.isApprovedByBrand &&
      instagramData?.isApprovedByInfluencer
    ) {
      setIsEditBtnDisabled(true);
      setIsCancelBtnDisabled(false);
      setIsGoLiveBtnDisabled(true);
      setUploadStatus("Scheduled");
    } else {
      setUploadStatus("Unknown");
    }
  }, [instagramData]);

  useEffect(() => {
    const utcNow = new Date().getTime();
    const fiveHoursBeforeliveAt = new Date(instagramData?.liveAt).getTime();
    if (utcNow > fiveHoursBeforeliveAt) {
      setIsGoLiveBtnDisabled(true);
    }
  }, []);
  return (
    <>
      <Descriptions bordered>
        <Descriptions.Item label="Instagram Account" span={4}>
          {instagramData?.account.name}
        </Descriptions.Item>
        <Descriptions.Item label="Caption" span={4}>
          {instagramData?.caption}
        </Descriptions.Item>
        <Descriptions.Item label="Schedule Date" span={2}>
          {new Date(instagramData?.liveAt).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Schedule Time" span={2}>
          {new Date(instagramData?.liveAt).toLocaleTimeString()}
        </Descriptions.Item>
        <Descriptions.Item label="Approval Status" span={2}>
          {approvalStatus ? (
            <Tag color="#87d068">Approved</Tag>
          ) : (
            <Tag color="#f50">Not Approved</Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Upload Status" span={2}>
          {uploadStatus === "Uploaded" ? (
            <Tag color="#87d068">{uploadStatus}</Tag>
          ) : (
            <Tag color="#f50">{uploadStatus}</Tag>
          )}
        </Descriptions.Item>
      </Descriptions>
      <Popconfirm
        placement="topLeft"
        title={`Are you sure you want to ${editBtnText} Form?`}
        onConfirm={() => {
          setIsIgFormDescriptionVisible(false);
          setIsIgScheduleExistForCreative(false);
        }}
        okText="Yes"
        cancelText="No"
      >
        <Button
          danger
          type="primary"
          className="mt-30 mr-10"
          disabled={isEditBtnDisabled}
        >
          {editBtnText}
        </Button>
      </Popconfirm>
      <Popconfirm
        placement="topLeft"
        title="Are you sure you want to Cancel?"
        onConfirm={cancelConfirm}
        className="mt-30 mr-10"
        okText="Yes"
        cancelText="No"
      >
        <Button danger type="primary" disabled={isCancelBtnDisabled}>
          Cancel
        </Button>
      </Popconfirm>
      <Popconfirm
        placement="topLeft"
        title="Are you sure you want to Go Live?"
        onConfirm={goLiveConfirm}
        okText="Yes"
        cancelText="No"
      >
        <Button
          type="primary"
          className="mt-30 mr-10"
          disabled={isGoLiveBtnDisabled}
        >
          Go Live
        </Button>
      </Popconfirm>
      <Button
        ref={commentBlockBtn}
        type="primary"
        onClick={handleShowCommentBlock}
        className="comment-form-btn"
      >
        Add Comments
      </Button>
    </>
  );
};
export default InstagramFormDescription;
