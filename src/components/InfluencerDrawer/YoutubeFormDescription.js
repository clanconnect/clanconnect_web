import "./styles.scss";
import { Button, Descriptions, Image, Tag, Popconfirm, message } from "antd";
import { useEffect, useState, useRef } from "react";
import { languages } from "../../common/dataManager";
import { ACTIONS } from "redux/creators/socials/youtube/actions";
import { useDispatch } from "react-redux";

const YoutubeFormDescription = ({
  closeDrawer,
  setVisible,
  youtubeData,
  setIsFormDescriptionVisible,
  setIsYtScheduleExistForCreative,
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
        query: { socialId: youtubeData?.id },
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
        query: { socialId: youtubeData?.id },
      },
    });
    setIsEditBtnDisabled(false);
    setUploadStatus("Cancelled");
    setIsCancelBtnDisabled(true);
    message.info("Youtube Post Cancelled");
  };
  useEffect(() => {
    setEditBtnText("Edit");
    if (youtubeData?.isApprovedByBrand) {
      setApprovalStatus(true);
      setIsEditBtnDisabled(true);
    } else if (youtubeData?.isApprovedByBrand === false) {
      setApprovalStatus(false);
      setIsGoLiveBtnDisabled(true);
    }
    if (youtubeData?.isUploaded) {
      setUploadStatus("Uploaded");
      setIsCancelBtnDisabled(true);
      setIsGoLiveBtnDisabled(true);
      setIsEditBtnDisabled(true);
    } else if (youtubeData?.isCancelled) {
      setUploadStatus("Cancelled");
      setIsCancelBtnDisabled(true);
      setIsGoLiveBtnDisabled(true);
      setIsEditBtnDisabled(false);
      setEditBtnText("Create New");
    } else if (
      youtubeData?.isApprovedByBrand &&
      youtubeData?.isApprovedByInfluencer
    ) {
      setIsEditBtnDisabled(true);
      setIsCancelBtnDisabled(false);
      setIsGoLiveBtnDisabled(true);
      setUploadStatus("Scheduled");
    } else {
      setUploadStatus("Unknown");
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
          <Image
            width={200}
            src={`${process.env.REACT_APP_IMAGE_BASE_URL}/${youtubeData?.thumbnail?.slug}`}
          />
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
        title="Are you sure you want to Edit Form?"
        onConfirm={() => {
          setIsFormDescriptionVisible(false);
          setIsYtScheduleExistForCreative(false);
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
export default YoutubeFormDescription;
