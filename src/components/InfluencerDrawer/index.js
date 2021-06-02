import "./styles.scss";
import { Drawer, Tabs } from "antd";
import YoutubeUploadForm from "components/YoutubeUploadForm";
import InstagramUploadForm from "components/InstagramUploadForm";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import YoutubeFormDescription from "./YoutubeFormDescription";
import InstagramFormDescription from "./InstagramFormDescription";
const InfluencerDrawer = ({
  isDrawerVisible,
  closeDrawer,
  setVisible,
  creative,
}) => {
  const { TabPane } = Tabs;
  const youtubeData = useSelector((store) => store.CreatorYoutube.data);
  const instagramData = useSelector((store) => store.CreatorInstagram.data);

  console.log("youtubeData", youtubeData);
  console.log("instagram", instagramData);

  const [isYtFormDescriptionVisible, setIsYtFormDescriptionVisible] = useState(
    false
  );
  const [
    isYtScheduleExistForCreative,
    setIsYtScheduleExistForCreative,
  ] = useState(true);

  const [isIgFormDescriptionVisible, setIsIgFormDescriptionVisible] = useState(
    false
  );
  const [
    isIgScheduleExistForCreative,
    setIsIgScheduleExistForCreative,
  ] = useState(true);
  useEffect(() => {
    setIsYtScheduleExistForCreative(youtubeData?.creative === creative.id);
    setIsYtFormDescriptionVisible(youtubeData?.creative === creative.id);
    setIsIgScheduleExistForCreative(instagramData?.creative === creative.id);
    setIsIgFormDescriptionVisible(instagramData?.creative === creative.id);
  }, [creative.id, youtubeData, instagramData]);

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
              isYtFormDescriptionVisible && (
                <YoutubeFormDescription
                  closeDrawer={closeDrawer}
                  setVisible={setVisible}
                  setIsYtFormDescriptionVisible={setIsYtFormDescriptionVisible}
                  setIsYtScheduleExistForCreative={
                    setIsYtScheduleExistForCreative
                  }
                  youtubeData={youtubeData}
                />
              )}
            {!isYtScheduleExistForCreative && (
              <YoutubeUploadForm
                setIsYtFormDescriptionVisible={setIsYtFormDescriptionVisible}
                setIsYtScheduleExistForCreative={
                  setIsYtScheduleExistForCreative
                }
                creative={creative}
              />
            )}
          </TabPane>
          <TabPane tab="Instagram" key="ig">
            {isIgScheduleExistForCreative &&
              instagramData?.id &&
              isIgFormDescriptionVisible && (
                <InstagramFormDescription
                  closeDrawer={closeDrawer}
                  setVisible={setVisible}
                  setIsIgFormDescriptionVisible={setIsIgFormDescriptionVisible}
                  setIsIgScheduleExistForCreative={
                    setIsIgScheduleExistForCreative
                  }
                  instagramData={instagramData}
                />
              )}
            {!isIgScheduleExistForCreative && (
              <InstagramUploadForm
                setIsIgFormDescriptionVisible={setIsIgFormDescriptionVisible}
                setIsIgScheduleExistForCreative={
                  setIsIgScheduleExistForCreative
                }
                creative={creative}
              />
            )}
          </TabPane>
        </Tabs>
      </Drawer>
    </>
  );
};

export default InfluencerDrawer;
