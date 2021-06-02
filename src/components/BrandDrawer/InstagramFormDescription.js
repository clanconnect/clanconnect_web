import "./styles.scss";
import { Button, Descriptions, Tag, Popconfirm, message } from "antd";
import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { ACTIONS } from "../../redux/brands/socials/instagram/actions";

const InstagramFormDescription = ({
  setVisible,
  closeDrawer,
  instagramData,
}) => {
  const dispatch = useDispatch();
  // possible values - "Approved/Not Approved"
  const [approvalStatus, setApprovalStatus] = useState();
  // possible values - "Cancelled/Uploaded/Scheduled/Unknown"
  const [uploadStatus, setUploadStatus] = useState();
  const [isApproveBtnDisabled, setIsApproveBtnDisabled] = useState();
  // cancel btn will be disabled before the post is scheduled to go live or
  // or when the btn has been clicked.
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState(true);

  const commentBlockBtn = useRef();
  const handleShowCommentBlock = () => {
    closeDrawer();
    setVisible(true);
  };

  const approveConfirm = () => {
    dispatch({
      type: ACTIONS.APPROVE_POST,
      payload: {
        query: { socialId: instagramData?.id },
      },
    });
    setApprovalStatus(true);
    setUploadStatus("Unknown");
    setIsApproveBtnDisabled(true);
    setIsCancelBtnDisabled(false);
    message.info("Youtube Post Approved");
  };
  const cancelConfirm = () => {
    dispatch({
      type: ACTIONS.CANCEL_POST,
      payload: {
        query: { socialId: instagramData?.id },
      },
    });
    setApprovalStatus(false);
    setUploadStatus("Cancelled");
    setIsCancelBtnDisabled(true);
    message.info("Youtube Post Cancelled");
  };
  useEffect(() => {
    if (instagramData.isApprovedByBrand) {
      setApprovalStatus(true);
      setIsApproveBtnDisabled(true);
    } else {
      setApprovalStatus(false);
      setIsApproveBtnDisabled(false);
    }
    if (instagramData?.isUploaded) {
      setUploadStatus("Uploaded");
      setIsCancelBtnDisabled(true);
    } else if (instagramData?.isCancelled) {
      setUploadStatus("Cancelled");
      setIsCancelBtnDisabled(true);
      setIsApproveBtnDisabled(true);
    } else if (
      instagramData?.isApprovedByInfluencer &&
      instagramData?.isApprovedByBrand
    ) {
      setIsCancelBtnDisabled(false);
      setUploadStatus("Scheduled");
    } else {
      setUploadStatus("Unknown");
    }
    const utcNow = new Date();
    const timeDelta = 5 * 60 * 60 * 1000;
    const fiveHoursBeforeliveAt =
      new Date(instagramData?.liveAt).getTime() - timeDelta;
    if (utcNow > fiveHoursBeforeliveAt) {
      setIsCancelBtnDisabled(true);
    }
  }, [instagramData]);

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
        title="Are you sure you want to Approve?"
        onConfirm={approveConfirm}
        okText="Yes"
        cancelText="No"
      >
        <Button
          type="primary"
          className="mt-30 mr-10"
          disabled={isApproveBtnDisabled}
        >
          Approve
        </Button>
      </Popconfirm>
      <Popconfirm
        placement="topLeft"
        title="Are you sure you want to Cancel?"
        onConfirm={cancelConfirm}
        okText="Yes"
        cancelText="No"
      >
        <Button danger type="primary" disabled={isCancelBtnDisabled}>
          Cancel Scheduled Post
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
