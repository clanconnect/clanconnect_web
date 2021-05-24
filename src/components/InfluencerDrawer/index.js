import "./styles.scss";
import { Button, Drawer, Tabs } from "antd";
import YoutubeUploadForm from "components/YoutubeUploadForm";
import InstagramUploadForm from "components/InstagramUploadForm";

const InfluencerDrawer = ({ isDrawerVisible, closeDrawer }) => {
  const { TabPane } = Tabs;

  const triggerScheduler = () => {
    alert("Scheduler Triggered");
  };

  return (
    <>
      <Drawer
        title="Schedule your post"
        width={720}
        onClose={closeDrawer}
        visible={isDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button
              type="primary"
              onClick={triggerScheduler}
              style={{ marginRight: 8 }}
            >
              Go Live!
            </Button>
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
        <Tabs defaultActiveKey="yt">
          <TabPane tab="Youtube" key="yt">
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
