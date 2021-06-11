import "./styles.scss";
import {
  Button,
  Descriptions,
  Tag,
  Popconfirm,
  message,
  Row,
  Col,
  Badge,
  Modal,
  Space,
  Alert,
} from "antd";
import { useEffect, useState, useRef } from "react";
import { ACTIONS } from "redux/creators/socials/instagram/actions";
import { useDispatch } from "react-redux";
import moment from "moment";

const InstagramFormDescription = ({
  closeDrawer,
  setVisible,
  instagramData,
  creative,
  setIsIgFormDescriptionVisible,
  setIsIgScheduleExistForCreative,
}) => {
  const dispatch = useDispatch();

  // possible values - "Approved/Not Approved"
  const [approvalStatus, setApprovalStatus] = useState();
  // possible values - "Cancelled/Live/Scheduled/Pending
  const [uploadStatus, setUploadStatus] = useState();

  // 'Edit' will be changed to 'Create New' once the post is cancelled
  // possible values - "Edit/Create New"
  const [editBtnText, setEditBtnText] = useState("Edit");
  const [isGoLiveBtnDisabled, setIsGoLiveBtnDisabled] = useState();
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState();
  const [isEditBtnDisabled, setIsEditBtnDisabled] = useState(false);
  const [isGoLiveModalVisible, setIsGoLiveModalVisible] = useState(false);

  const [errorText, setErrorText] = useState(false);
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
    setIsGoLiveModalVisible(false);
    setUploadStatus("Scheduled");
    message.info("Instagram Post Scheduled To Go Live");
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
    message.info("Instagram Post Cancelled");
  };
  useEffect(() => {
    setEditBtnText("Edit");
    if (instagramData?.isApprovedByBrand) {
      setApprovalStatus(true);
      setIsEditBtnDisabled(true);
      setIsGoLiveBtnDisabled(false);
    } else if (instagramData?.isApprovedByBrand === false) {
      setApprovalStatus(false);
      setIsGoLiveBtnDisabled(true);
    }
    if (instagramData?.isUploaded) {
      setUploadStatus("Live");
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
      setUploadStatus("Pending");
    }
    const utcNow = new Date().getTime();
    const liveAt_ = new Date(instagramData?.liveAt).getTime();
    if (utcNow > liveAt_) {
      setIsGoLiveBtnDisabled(true);
    }
    if (
      utcNow > liveAt_ &&
      instagramData?.isApprovedByBrand &&
      !instagramData?.isApprovedByInfluencer
    ) {
      setErrorText(
        <Alert
          message="Since time has passed, you can’t make the post go live!"
          type="warning"
          showIcon
          closable
        />
      );
    }
  }, [instagramData]);
  return (
    <>
      <Space direction="vertical" size="middle">
        <Descriptions bordered labelStyle={{ width: "25%" }}>
          <Descriptions.Item label="Instagram Account" span={4}>
            {instagramData?.account.name}
          </Descriptions.Item>
          <Descriptions.Item label="Caption" span={4}>
            {instagramData?.caption}
          </Descriptions.Item>
          <Descriptions.Item label="Schedule" span={4}>
            {moment(instagramData?.liveAt).format("h:mm A, DD/MM/YYYY")}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions bordered labelStyle={{ width: "25%" }}>
          <Descriptions.Item label="Approval Status" span={4}>
            {approvalStatus ? (
              <Tag color="#87d068">Approved</Tag>
            ) : (
              <Tag color="#f50">Not Approved</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Upload Status" span={4}>
            {uploadStatus === "Live" && (
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
      </Space>
      {errorText && <div style={{ marginTop: "16px" }}>{errorText}</div>}
      <Row justify="space-between">
        <Col>
          <Popconfirm
            placement="topLeft"
            title={`Are you sure you want to ${editBtnText} Form?`}
            onConfirm={() => {
              setIsIgFormDescriptionVisible(false);
              setIsIgScheduleExistForCreative(false);
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
            onClick={() => {
              setIsGoLiveModalVisible(true);
            }}
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
export default InstagramFormDescription;
