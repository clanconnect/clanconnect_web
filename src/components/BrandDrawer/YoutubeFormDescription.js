import "./styles.scss";
import { Button, Descriptions, Tag, Image, Popconfirm, message } from "antd";
import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { languages } from "../../common/dataManager";
import { ACTIONS } from "../../redux/brands/socials/youtube/actions";

const YoutubeFormDescription = ({ setVisible, closeDrawer, youtubeData }) => {
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
        query: { socialId: youtubeData?.id },
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
        query: { socialId: youtubeData?.id },
      },
    });
    setApprovalStatus(false);
    setUploadStatus("Cancelled");
    setIsCancelBtnDisabled(true);
    message.info("Youtube Post Cancelled");
  };
  useEffect(() => {
    if (youtubeData.isApprovedByBrand) {
      setApprovalStatus(true);
      setIsApproveBtnDisabled(true);
    } else {
      setApprovalStatus(false);
      setIsApproveBtnDisabled(false);
    }
    if (youtubeData?.isUploaded) {
      setUploadStatus("Uploaded");
      setIsCancelBtnDisabled(true);
    } else if (youtubeData?.isCancelled) {
      setUploadStatus("Cancelled");
      setIsCancelBtnDisabled(true);
      setIsApproveBtnDisabled(true);
    } else if (
      youtubeData?.isApprovedByInfluencer &&
      youtubeData?.isApprovedByBrand
    ) {
      setIsCancelBtnDisabled(false);
      setUploadStatus("Scheduled");
    } else {
      setUploadStatus("Unknown");
    }
    const utcNow = new Date().getTime();
    const timeDelta = 5 * 60 * 60 * 1000;
    const fiveHoursBeforeliveAt =
      new Date(youtubeData?.liveAt).getTime() - timeDelta;
    if (utcNow > fiveHoursBeforeliveAt) {
      setIsCancelBtnDisabled(true);
    }
  }, [youtubeData]);

  return (
    <>
      <Descriptions bordered>
        <Descriptions.Item label="Video Title" span={4}>
          {youtubeData?.title}
        </Descriptions.Item>
        <Descriptions.Item label="Video Description" span={4}>
          {youtubeData?.description}
        </Descriptions.Item>
        <Descriptions.Item label="Thumbnail" span={4}>
          {
            <Image
              width={200}
              src={`${process.env.REACT_APP_IMAGE_BASE_URL}/${youtubeData?.thumbnail?.slug}`}
            />
          }
        </Descriptions.Item>
        <Descriptions.Item label="Tags" span={4}>
          {youtubeData?.tags?.map((tag, index) => {
            return <Tag key={index}>#{tag}</Tag>;
          })}
        </Descriptions.Item>
        <Descriptions.Item label="Schedule Date" span={2}>
          {new Date(youtubeData?.liveAt).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Schedule Time" span={2}>
          {new Date(youtubeData?.liveAt).toLocaleTimeString()}
        </Descriptions.Item>
        <Descriptions.Item label="Made for Kids" span={2}>
          {youtubeData?.madeForKids ? "Yes" : "No"}
        </Descriptions.Item>
        <Descriptions.Item label="Category" span={2}>
          {youtubeData?.category}
        </Descriptions.Item>
        <Descriptions.Item label="Default Language" span={2}>
          {
            languages.find((item) => {
              return item.value === "en";
            })?.name
          }
        </Descriptions.Item>
        <Descriptions.Item label="License" span={2}>
          {youtubeData?.license}
        </Descriptions.Item>
        <Descriptions.Item label="Statistics Visibility" span={2}>
          {youtubeData?.publicStatsVisible ? "Visible" : "Not Visible"}
        </Descriptions.Item>
        <Descriptions.Item label="Notify Subscribers" span={2}>
          {youtubeData?.notifySubscribers ? "Yes" : "No"}
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

export default YoutubeFormDescription;
