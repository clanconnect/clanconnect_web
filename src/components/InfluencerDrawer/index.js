import "./styles.scss";
import {
  Button,
  Drawer,
  Tabs,
  Descriptions,
  Image,
  Tag,
  Popconfirm,
  message,
} from "antd";
import YoutubeUploadForm from "components/YoutubeUploadForm";
import InstagramUploadForm from "components/InstagramUploadForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { languages } from "../../common/dataManager";
import { ACTIONS } from "redux/creators/socials/youtube/actions";
const InfluencerDrawer = ({
  isDrawerVisible,
  closeDrawer,
  setVisible,
  creative,
}) => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const youtubeData = useSelector((store) => store.CreatorYoutube.data);

  console.log("youtubeData", youtubeData);
  // possible values - "Approved/Not Approved"
  const [approvalStatus, setApprovalStatus] = useState();
  // possible values - "Cancelled/Uploaded/Scheduled/Unknown"
  const [uploadStatus, setUploadStatus] = useState();
  const [isGoLiveBtnDisabled, setIsGoLiveBtnDisabled] = useState();
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState();
  const [isEditBtnDisabled, setIsEditBtnDisabled] = useState(false);
  const [isFormDescriptionVisible, setIsFormDescriptionVisible] = useState(
    false
  );
  const [
    isYtScheduleExistForCreative,
    setIsYtScheduleExistForCreative,
  ] = useState(true);
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
  useEffect(() => {
    setIsYtScheduleExistForCreative(youtubeData?.creative === creative.id);
    setIsFormDescriptionVisible(youtubeData?.creative === creative.id);
  }, [creative.id, youtubeData]);
  return (
    <>
      <Drawer
        title="Schedule your post"
        width={720}
        onClose={closeDrawer}
        visible={isDrawerVisible}
        destroyOnClose={true}
        bodyStyle={{ paddingBottom: 20 }}
      >
        <Tabs defaultActiveKey="yt">
          <TabPane tab="Youtube" key="yt">
            {isYtScheduleExistForCreative &&
              youtubeData?.id &&
              isFormDescriptionVisible && (
                <div>
                  <Descriptions bordered>
                    <Descriptions.Item label="Video Title" span={4}>
                      {youtubeData?.title}
                    </Descriptions.Item>
                    <Descriptions.Item label="Video Description" span={4}>
                      {youtubeData?.description}
                    </Descriptions.Item>
                    <Descriptions.Item label="Thumbnail" span={4}>
                      <Image
                        width={300}
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
                      {youtubeData?.publicStatsVisible
                        ? "Visible"
                        : "Not Visible"}
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
                      Edit
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
                    <Button
                      danger
                      type="primary"
                      disabled={isCancelBtnDisabled}
                    >
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
                </div>
              )}
            {!isYtScheduleExistForCreative && (
              <YoutubeUploadForm
                setIsFormDescriptionVisible={setIsFormDescriptionVisible}
                setIsYtScheduleExistForCreative={
                  setIsYtScheduleExistForCreative
                }
                creative={creative}
              />
            )}
          </TabPane>
          <TabPane tab="Instagram" key="ig">
            <InstagramUploadForm />
          </TabPane>
        </Tabs>
      </Drawer>
    </>
  );
};

export default InfluencerDrawer;
