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
  project,
}) => {
  const { TabPane } = Tabs;
  const youtubeData = useSelector((store) => store.CreatorYoutube.data);
  const instagramData = useSelector((store) => store.CreatorInstagram.data);
  const user = useSelector((store) => store.user.user);

  const [isYtFormDescriptionVisible, setIsYtFormDescriptionVisible] =
    useState(false);
  const [isYtScheduleExistForCreative, setIsYtScheduleExistForCreative] =
    useState(true);

  const [isIgFormDescriptionVisible, setIsIgFormDescriptionVisible] =
    useState(false);
  const [isIgScheduleExistForCreative, setIsIgScheduleExistForCreative] =
    useState(true);
  const [isYtTabDisabled, setIsYtTabDisabled] = useState(false);
  const [isIgTabDisabled, setIsIgTabDisabled] = useState(false);

  console.log("creative inside drawer ===> ", creative, project);
  useEffect(() => {
    setIsYtScheduleExistForCreative(youtubeData?.creative === creative.id);
    setIsYtFormDescriptionVisible(youtubeData?.creative === creative.id);
    setIsIgScheduleExistForCreative(instagramData?.creative === creative.id);
    setIsIgFormDescriptionVisible(instagramData?.creative === creative.id);
    setIsYtTabDisabled(
      creative?.media
        ?.find((o) => o.status === "accepted")
        ?.mimeType.includes("image")
    );
    setIsYtTabDisabled(isYtTabDisabled && !user.youtube_auth);
    setIsIgTabDisabled(isIgTabDisabled && !user.instagram_auth);
  }, [creative, youtubeData, instagramData]);

  return (
    <>
      <Drawer
        title="Schedule your post"
        width={Math.min(window.innerWidth, 700)}
        onClose={closeDrawer}
        visible={isDrawerVisible}
        destroyOnClose={true}
        bodyStyle={{ paddingBottom: 20 }}
      >
        <Tabs defaultActiveKey="ig">
          <TabPane tab="Instagram" key="ig" disabled={isIgTabDisabled}>
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
                  creative={creative}
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
          <TabPane tab="Youtube" key="yt" disabled={isYtTabDisabled}>
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
                  creative={creative}
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
        </Tabs>
      </Drawer>
    </>
  );
};

export default InfluencerDrawer;
