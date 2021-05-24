import "./styles.scss";
import { Button, Descriptions, Drawer, Tag, Image, Tabs } from "antd";
import { useDispatch, connect } from "react-redux";
import { useEffect, useRef } from "react";

const BrandDrawer = ({
  setVisible,
  isVisible,
  closeDrawer,
  title,
  description,
  thumbnail,
  tags,
  scheduleDate,
  scheduleTime,
  forChild,
  country,
  category,
  defaultLanguage,
  statsVisible,
  license,
  notifySubscriber,
  approvalStatus,
  uploadStatus,
  caption,
  approvalStatusIG,
  uploadStatusIG,
  scheduleDateIG,
  scheduleTimeIG,
}) => {
  const commentBlockBtn = useRef();

  const { TabPane } = Tabs;

  const handleShowCommentBlock = () => {
    closeDrawer();
    setVisible(true);
  };

  const onTabChange = () => {};

  const approveYTForm = () => {
    alert("Youtube Form Approved");
  };

  const approveIGForm = () => {
    alert("Instagram Form Approved");
  };

  const declineIGForm = () => {
    alert("Instagram Form Declined");
  };

  const declineYTForm = () => {
    alert("Youtube Form Declined");
  };

  return (
    <>
      <Drawer
        title="Schedule Approval"
        width={720}
        onClose={closeDrawer}
        visible={isVisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button
              danger
              type="primary"
              onClick={closeDrawer}
              style={{ marginRight: 8 }}
            >
              Close Drawer
            </Button>
          </div>
        }
      >
        <Button
          ref={commentBlockBtn}
          type="primary"
          onClick={handleShowCommentBlock}
          className="comment-form-btn"
        >
          Add Comment
        </Button>
        <Tabs defaultActiveKey="yt" onChange={onTabChange}>
          <TabPane tab="Youtube" key="yt">
            <Descriptions bordered>
              <Descriptions.Item label="Video Title" span={4}>
                {title}
              </Descriptions.Item>
              <Descriptions.Item label="Video Description" span={4}>
                {description}
              </Descriptions.Item>
              <Descriptions.Item label="Thumbnail" span={4}>
                <Image src="https://www.wyzowl.com/wp-content/uploads/2019/09/YouTube-thumbnail-size-guide-best-practices-top-examples.png" />
              </Descriptions.Item>
              <Descriptions.Item label="Tags" span={4}>
                {tags?.map((tag) => {
                  return <Tag>{tag}</Tag>;
                })}
              </Descriptions.Item>
              <Descriptions.Item
                label="Is the video suitable for childerns?"
                span={4}
              >
                {forChild ? "True" : "False"}
              </Descriptions.Item>
              <Descriptions.Item label="Schedule Date" span={2}>
                {scheduleDate}{" "}
              </Descriptions.Item>
              <Descriptions.Item label="Schedule Time" span={2}>
                {scheduleTime}{" "}
              </Descriptions.Item>
              <Descriptions.Item label="Country" span={2}>
                {country}
              </Descriptions.Item>
              <Descriptions.Item label="Category" span={2}>
                {category}
              </Descriptions.Item>
              <Descriptions.Item label="Default Language" span={4}>
                {defaultLanguage}
              </Descriptions.Item>
              <Descriptions.Item label="License" span={4}>
                {license}
              </Descriptions.Item>
              <Descriptions.Item label="Statistics Visibility" span={2}>
                {statsVisible ? "Visible" : "Not Visible"}
              </Descriptions.Item>
              <Descriptions.Item label="Notify Subscriber" span={2}>
                {notifySubscriber ? "Yes" : "No"}
              </Descriptions.Item>
              <Descriptions.Item label="Approval Status" span={2}>
                {approvalStatus}
              </Descriptions.Item>
              <Descriptions.Item label="Upload Status" span={2}>
                {uploadStatus}
              </Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              onClick={approveYTForm}
              className="mt-30 mr-10"
            >
              Approve
            </Button>
            <Button danger type="primary" onClick={declineYTForm}>
              Cancel
            </Button>
          </TabPane>
          <TabPane tab="Instagram" key="ig">
            <Descriptions bordered>
              <Descriptions.Item label="Caption" span={4}>
                {caption}
              </Descriptions.Item>
              <Descriptions.Item label="Schedule Date" span={2}>
                {scheduleDateIG}{" "}
              </Descriptions.Item>
              <Descriptions.Item label="Schedule Time" span={2}>
                {scheduleTimeIG}{" "}
              </Descriptions.Item>
              <Descriptions.Item label="Approval Status" span={2}>
                {approvalStatusIG}
              </Descriptions.Item>
              <Descriptions.Item label="Upload Status" span={2}>
                {uploadStatusIG}
              </Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              onClick={approveIGForm}
              className="mt-30 mr-10"
            >
              Approve
            </Button>
            <Button danger type="primary" onClick={declineIGForm}>
              Cancel
            </Button>
          </TabPane>
        </Tabs>
      </Drawer>
    </>
  );
};

const mapStateToProps = ({ CreatorYoutube, CreatorInstagram }) => ({
  youtubeData: CreatorYoutube.data,
  instagramData: CreatorInstagram.data,
});

export default connect(mapStateToProps)(BrandDrawer);
