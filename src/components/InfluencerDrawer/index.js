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
const InfluencerDrawer = ({ isDrawerVisible, closeDrawer, setVisible }) => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const youtubeData = useSelector((store) => store.creatorYoutube.data);

  console.log("youtubeData", youtubeData);
  // possible values - "Approved/Not Approved"
  const [approvalStatus, setApprovalStatus] = useState();
  // possible values - "Cancelled/Uploaded/Unknown"
  const [uploadStatus, setUploadStatus] = useState();
  const [isGoLiveBtnDisabled, setIsGoLiveBtnDisabled] = useState();
  const [isCancelBtnDisabled, setIsCancelBtnDisabled] = useState(
    youtubeData.isCancelled
  );

  const triggerScheduler = () => {
    alert("Scheduler Triggered");
  };

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
    setApprovalStatus(true);
    setUploadStatus("Unknown");
    message.info("Youtube Post Scheduled To Go Live");
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
      setIsGoLiveBtnDisabled(true);
    } else {
      setApprovalStatus(false);
      setIsGoLiveBtnDisabled(false);
    }
    if (youtubeData?.isUploaded) {
      setUploadStatus("Uploaded");
    } else if (youtubeData?.isCancelled) {
      setUploadStatus("Cancelled");
      setIsCancelBtnDisabled(true);
      setIsGoLiveBtnDisabled(true);
    } else {
      setUploadStatus("Unknown");
    }
  }, [
    youtubeData?.isApprovedByBrand,
    youtubeData?.isCancelled,
    youtubeData?.isUploaded,
  ]);
  return (
    <>
      <Drawer
        title="Schedule your post"
        width={720}
        onClose={closeDrawer}
        visible={isDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        // footer={
        //   <div
        //     style={{
        //       textAlign: "right",
        //     }}
        //   >
        //     <Button
        //       type="primary"
        //       onClick={triggerScheduler}
        //       style={{ marginRight: 8 }}
        //     >
        //       Go Live!
        //     </Button>
        //     <Button
        //       danger
        //       type="primary"
        //       onClick={closeDrawer}
        //       style={{ marginRight: 8 }}
        //     >
        //       Close Drawer
        //     </Button>
        //   </div>
        // }
      >
        <Tabs defaultActiveKey="yt">
          <TabPane tab="Youtube" key="yt">
            {youtubeData?.id && (
              <div>
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
                <Popconfirm
                  placement="topLeft"
                  title="Are you sure you want to Cancel?"
                  onConfirm={cancelConfirm}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger type="primary" disabled={isCancelBtnDisabled}>
                    Cancel
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
            <YoutubeUploadForm />
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
