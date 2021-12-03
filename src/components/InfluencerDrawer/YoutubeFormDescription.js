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
  Modal,
  Space,
  Alert,
  Radio,
  Input,
} from "antd";
import { useEffect, useState, useRef } from "react";
import { languages } from "../../common/dataManager";
import { ACTIONS } from "redux/creators/socials/youtube/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { cancellationReasons } from "common/dataManager";

const YoutubeFormDescription = ({
  closeDrawer,
  setVisible,
  youtubeData,
  creative,
  setIsYtFormDescriptionVisible,
  setIsYtScheduleExistForCreative,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);

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
  const [errorText, setErrorText] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState();
  const [isCancelInputDisabled, setIsCancelInputDisabled] = useState(true);

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
    if (cancelReason) {
      dispatch({
        type: ACTIONS.CANCEL_POST,
        payload: {
          query: { socialId: youtubeData?.id, reason: cancelReason },
        },
      });

      setIsEditBtnDisabled(false);
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
    } else if (youtubeData?.isErrored) {
      setUploadStatus("Errored");
    } else {
      setUploadStatus("Pending");
    }
    const utcNow = new Date().getTime();
    const liveAt_ = new Date(youtubeData?.liveAt).getTime();
    if (utcNow > liveAt_) {
      setIsGoLiveBtnDisabled(true);
      setIsCancelBtnDisabled(true);
    }
    if (
      utcNow > liveAt_ &&
      youtubeData?.isApprovedByBrand &&
      !youtubeData?.isApprovedByInfluencer &&
      !youtubeData?.isCancelled
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
          <Descriptions.Item label="License" span={2}>
            {youtubeData?.license}
          </Descriptions.Item>
          <Descriptions.Item label="Statistics Visibility" span={2}>
            {youtubeData?.publicStatsVisible ? "Visible" : "Not Visible"}
          </Descriptions.Item>
          <Descriptions.Item label="Notify Subscribers" span={2}>
            {youtubeData?.notifySubscribers ? "Yes" : "No"}
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
            {uploadStatus === "Uploaded" && (
              <Tag color="#87d068">{uploadStatus}</Tag>
            )}
            {["Pending", "Scheduled"].includes(uploadStatus) && (
              <Tag color="#2db7f5">{uploadStatus}</Tag>
            )}
            {uploadStatus === "Cancelled" && (
              <Tag color="#f50">{uploadStatus}</Tag>
            )}
            {uploadStatus === "Errored" && (
              <span>{youtubeData?.errorUserMessage}</span>
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
          {user.user_type !== "influencer" && (
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
          )}
          <Modal
            title="Consent Notice"
            visible={isGoLiveModalVisible}
            onOk={goLiveConfirm}
            onCancel={() => {
              setIsGoLiveModalVisible(false);
            }}
            centered
            cancelText="Close"
          >
            <p>
              By clicking OK, you give consent to ClanConnect to publish this
              creative on your YouTube channel at the scheduled time.
            </p>
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
