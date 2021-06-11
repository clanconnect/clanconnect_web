import "./styles.scss";
import {
  Button,
  Descriptions,
  Tag,
  Popconfirm,
  message,
  Badge,
  Row,
  Col,
  Space,
  Alert,
} from "antd";
import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { ACTIONS } from "../../redux/brands/socials/instagram/actions";
import moment from "moment";

const InstagramFormDescription = ({
  setVisible,
  closeDrawer,
  instagramData,
  creative,
}) => {
  const dispatch = useDispatch();
  // possible values - "Approved/Not Approved"
  const [approvalStatus, setApprovalStatus] = useState();
  // possible values - "Cancelled/Live/Scheduled/Pending"
  const [uploadStatus, setUploadStatus] = useState();
  const [isApproveBtnDisabled, setIsApproveBtnDisabled] = useState();
  // cancel btn will be disabled before the post is scheduled to go live or
  // or when the btn has been clicked.
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState(true);

  const [errorText, setErrorText] = useState(false);
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
    setUploadStatus("Scheduled");
    setIsApproveBtnDisabled(true);
    setIsCancelBtnDisabled(false);
    message.info("Instagram Post Approved");
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
    message.info("Instagram Post Cancelled");
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
      setUploadStatus("Live");
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
      setUploadStatus("Pending");
    }
    const utcNow = new Date();
    const timeDelta = 5 * 60 * 60 * 1000;
    const fiveHoursBeforeliveAt =
      new Date(instagramData?.liveAt).getTime() - timeDelta;
    if (utcNow > fiveHoursBeforeliveAt) {
      setIsCancelBtnDisabled(true);
    }
    const liveAt_ = new Date(instagramData?.liveAt).getTime();
    if (utcNow > liveAt_) {
      setIsApproveBtnDisabled(true);
    }
    if (utcNow > liveAt_ && !instagramData?.isApprovedByBrand) {
      setErrorText(
        <Alert
          message="Since time has passed, you can’t approve the post"
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
            title="Are you sure you want to Approve?"
            onConfirm={approveConfirm}
            okText="Yes"
            cancelText="No"
            disabled={isApproveBtnDisabled}
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
            disabled={isCancelBtnDisabled}
          >
            <Button
              danger
              type="primary"
              disabled={isCancelBtnDisabled}
              className="mt-30"
            >
              Cancel Scheduled Post
            </Button>
          </Popconfirm>
        </Col>
        <Col>
          <Badge
            size="small"
            style={{
              background: "mediumseagreen",
              fontSize: "11px",
            }}
            count={creative.stats.unreadComments}
            offset={[-8, +30]}
          >
            <Button
              ref={commentBlockBtn}
              type="primary"
              onClick={handleShowCommentBlock}
              className="mt-30 mr-3"
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
