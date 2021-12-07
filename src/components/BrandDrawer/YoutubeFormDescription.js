import "./styles.scss";
import {
  Button,
  Descriptions,
  Tag,
  Image,
  Popconfirm,
  message,
  Row,
  Col,
  Space,
  Alert,
  Radio,
  Input,
  Modal,
} from "antd";
import { useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { languages } from "../../common/dataManager";
import { ACTIONS } from "../../redux/brands/socials/youtube/actions";
import moment from "moment";
import { cancellationReasons } from "common/dataManager";

const YoutubeFormDescription = ({
  setVisible,
  closeDrawer,
  youtubeData,
  creative,
}) => {
  const dispatch = useDispatch();

  // possible values - "Approved/Not Approved"
  const [approvalStatus, setApprovalStatus] = useState();
  // possible values - "Cancelled/Live/Scheduled/Pending/Errored"
  const [uploadStatus, setUploadStatus] = useState();
  const [isApproveBtnDisabled, setIsApproveBtnDisabled] = useState();
  // cancel btn will be disabled before the post is scheduled to go live or
  // or when the btn has been clicked.
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState(true);
  const [errorText, setErrorText] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState();
  const [isCancelInputDisabled, setIsCancelInputDisabled] = useState(true);
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
    setUploadStatus("Scheduled");
    setIsApproveBtnDisabled(true);
    setIsCancelBtnDisabled(false);
    message.info("Youtube Post Approved");
  };
  const cancelConfirm = () => {
    if (cancelReason) {
      dispatch({
        type: ACTIONS.CANCEL_POST,
        payload: {
          query: { socialId: youtubeData?.id, reason: cancelReason },
        },
      });
      setApprovalStatus(false);
      setUploadStatus("Cancelled");
      setIsCancelBtnDisabled(true);
      message.info("Youtube Post Cancelled");
      setIsCancelModalVisible(false);
    }
  };
  const cancelRadioBtnOnChange = (e) => {
    setCancelReason(e.target.value);
    if (e.target.value === "Other") {
      setIsCancelInputDisabled(false);
    }
  };
  const cancelInputOnChange = (e) => {
    setCancelReason(e.target.value);
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
      setUploadStatus("Live");
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
    } else if (youtubeData?.isErrored) {
      setUploadStatus("Errored");
    } else {
      setUploadStatus("Pending");
    }
    const utcNow = new Date().getTime();
    const timeDelta = 5 * 60 * 60 * 1000;
    const fiveHoursBeforeliveAt =
      new Date(youtubeData?.liveAt).getTime() - timeDelta;
    if (utcNow > fiveHoursBeforeliveAt) {
      setIsCancelBtnDisabled(true);
    }
    const liveAt_ = new Date(youtubeData?.liveAt).getTime();
    if (utcNow > liveAt_) {
      setIsApproveBtnDisabled(true);
    }
    if (
      utcNow > liveAt_ &&
      !youtubeData?.isApprovedByBrand &&
      !youtubeData?.isCancelled
    ) {
      setErrorText(
        <Alert
          message="Since time has passed, you can’t approve the post"
          type="warning"
          showIcon
          closable
        />
      );
    }
  }, [youtubeData]);

  return (
    <>
      <Space direction="vertical" size="middle">
        <Descriptions bordered labelStyle={{ width: "25%" }}>
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
          <Descriptions.Item label="Schedule" span={4}>
            {`${moment(youtubeData?.liveAt).format("DD/MM/YYYY, h:mma")} IST`}
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
          <Descriptions.Item className="license" label="License" span={2}>
            {`${youtubeData?.license.substr(0,3)}${youtubeData?.license.charAt(3).toUpperCase()}${youtubeData?.license.substr(4)}`}
          </Descriptions.Item>
          <Descriptions.Item label="Statistics Visibility" span={2}>
            {youtubeData?.publicStatsVisible ? "Visible" : "Not Visible"}
          </Descriptions.Item>
          <Descriptions.Item label="Notify Subscribers" span={2}>
            {youtubeData?.notifySubscribers ? "Yes" : "No"}
          </Descriptions.Item>
          {youtubeData?.isCancelled && (
            <Descriptions.Item label="Reason For Cancellation">
              {youtubeData?.cancelReason}
            </Descriptions.Item>
          )}
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
            {uploadStatus === "Errored" && (
              <Tag color="#f54">{uploadStatus}</Tag>
            )}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions bordered labelStyle={{ width: "25%" }}>
          {youtubeData?.isCancelled && (
            <Descriptions.Item label="Reason For Cancellation" span={4}>
              {youtubeData?.cancelReason}
            </Descriptions.Item>
          )}
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
          <Button
            danger
            type="primary"
            className="mt-30 mr-10"
            disabled={isCancelBtnDisabled}
            onClick={() => {
              setIsCancelModalVisible(true);
            }}
          >
            Cancel
          </Button>
          <Modal
            title="State Reason For Cancellation"
            visible={isCancelModalVisible}
            onOk={cancelConfirm}
            onCancel={() => {
              setIsCancelModalVisible(false);
            }}
            centered
            cancelText="Close"
          >
            <Space direction="vertical" size="middle">
              <p>Select Reasons</p>
              <Radio.Group
                name="radiogroup"
                defaultValue={cancellationReasons[0]}
                className="flex flex-column"
                onChange={cancelRadioBtnOnChange}
              >
                {cancellationReasons.map((elem, idx) => (
                  <Radio key={idx} value={elem}>
                    {elem}
                  </Radio>
                ))}
              </Radio.Group>
              <Input.TextArea
                showCount
                maxLength={500}
                onChange={cancelInputOnChange}
                disabled={isCancelInputDisabled}
              />
            </Space>
          </Modal>
        </Col>
        <Col>
          <Button
            ref={commentBlockBtn}
            type="primary"
            onClick={handleShowCommentBlock}
            className="mt-30"
          >
            Add Comments
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default YoutubeFormDescription;
