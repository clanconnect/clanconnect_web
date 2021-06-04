import "./styles.scss";
import {
  Button,
  Descriptions,
  Image,
  Tag,
  Popconfirm,
  message,
  Row,
  Col,
  Badge,
  Modal,
} from "antd";
import { useEffect, useState, useRef } from "react";
import { languages } from "../../common/dataManager";
import { ACTIONS } from "redux/creators/socials/youtube/actions";
import { useDispatch } from "react-redux";

const YoutubeFormDescription = ({
  closeDrawer,
  setVisible,
  youtubeData,
  creative,
  setIsYtFormDescriptionVisible,
  setIsYtScheduleExistForCreative,
}) => {
  const dispatch = useDispatch();

  // possible values - "Approved/Not Approved"
  const [approvalStatus, setApprovalStatus] = useState();
  // possible values - "Cancelled/Uploaded/Scheduled/Pending"
  const [uploadStatus, setUploadStatus] = useState();

  // 'Edit' will be changed to 'Create New' once the post is cancelled
  // possible values - "Edit/Create New"
  const [editBtnText, setEditBtnText] = useState("Edit");
  const [isGoLiveBtnDisabled, setIsGoLiveBtnDisabled] = useState();
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState();
  const [isEditBtnDisabled, setIsEditBtnDisabled] = useState(false);

  const [isGoLiveModalVisible, setIsGoLiveModalVisible] = useState(false);

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
    setUploadStatus("Scheduled");
    setIsGoLiveModalVisible(false);
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
      setIsGoLiveBtnDisabled(false);
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
      setUploadStatus("Pending");
    }
    const utcNow = new Date().getTime();
    const liveAt_ = new Date(youtubeData?.liveAt).getTime();
    if (utcNow > liveAt_) {
      setIsGoLiveBtnDisabled(true);
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
          {new Date(youtubeData?.liveAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
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
          {uploadStatus === "Uploaded" && (
            <Tag color="#87d068">{uploadStatus}</Tag>
          )}
          {["Pending", "Scheduled"].includes(uploadStatus) && (
            <Tag color="#2db7f5">{uploadStatus}</Tag>
          )}
          {uploadStatus === "Cancelled" && (
            <Tag color="#f50">{uploadStatus}</Tag>
          )}
        </Descriptions.Item>
      </Descriptions>
      <Row justify="space-between">
        <Col>
          <Popconfirm
            placement="topLeft"
            title={`Are you sure you want to ${editBtnText} Form?`}
            onConfirm={() => {
              setIsYtFormDescriptionVisible(false);
              setIsYtScheduleExistForCreative(false);
            }}
            okText="Yes"
            cancelText="No"
            disabled={isEditBtnDisabled}
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
            disabled={isCancelBtnDisabled}
          >
            <Button danger type="primary" disabled={isCancelBtnDisabled}>
              Cancel
            </Button>
          </Popconfirm>
          <Button
            type="primary"
            className="mt-30 mr-10"
            disabled={isGoLiveBtnDisabled}
          >
            Go Live
          </Button>
          <Modal
            title="Consent Form"
            visible={isGoLiveModalVisible}
            onOk={goLiveConfirm}
            onCancel={() => {
              setIsGoLiveModalVisible(false);
            }}
            centered
            cancelText="Close"
          >
            <p>
              By clicking on OK, you give your consent to Clanconnect to publish
              this creative on your Instagram at the scheduled time on your
              behalf.
            </p>
          </Modal>
        </Col>
        <Col>
          <Badge
            size="small"
            style={{ background: "mediumseagreen", fontSize: "11px" }}
            count={creative.stats.unreadComments}
            offset={[-8, +30]}
          >
            <Button
              ref={commentBlockBtn}
              type="primary"
              onClick={handleShowCommentBlock}
              className="mt-30"
            >
              Add Comments
            </Button>
          </Badge>
        </Col>
      </Row>
    </>
  );
};
export default YoutubeFormDescription;
