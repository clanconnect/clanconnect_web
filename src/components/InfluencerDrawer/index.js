import "./styles.scss";
import { Drawer, Tabs, Empty } from "antd";
import YoutubeUploadForm from "components/YoutubeUploadForm";
import InstagramUploadForm from "components/InstagramUploadForm";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import YoutubeFormDescription from "./YoutubeFormDescription";
import InstagramFormDescription from "./InstagramFormDescription";
import { Instagram, Youtube } from "react-bootstrap-icons";

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
    setIsYtTabDisabled(!user.youtube_auth);
    setIsIgTabDisabled(!user.instagram_auth);

    if (project) {
      setIsIgTabDisabled(
        !user.instagram_auth ||
          !project.primarySocialMedia.includes("Instagram")
      );
      setIsYtTabDisabled(
        !user.youtube_auth || !project.primarySocialMedia.includes("Youtube")
      );
    }
  }, [project, user, creative, youtubeData, instagramData]);

  const showIgForm =
    isIgScheduleExistForCreative &&
    instagramData?.id &&
    isIgFormDescriptionVisible;

  const showYtForm =
    isYtScheduleExistForCreative &&
    youtubeData?.id &&
    isYtFormDescriptionVisible;

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
        {isIgTabDisabled && isYtTabDisabled ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Please log into either Instagram or Youtube to schedule your post"
          />
        ) : (
          <Tabs className="scheduleModal" defaultActiveKey="ig">
            {!isIgTabDisabled && (
              <TabPane
                tab={
                  <span className="icon-instagram">
                    <Instagram className="icon-insta" />
                    &nbsp;Instagram
                  </span>
                }
                key="ig"
              >
                {showIgForm && (
                  <InstagramFormDescription
                    closeDrawer={closeDrawer}
                    setVisible={setVisible}
                    setIsIgFormDescriptionVisible={
                      setIsIgFormDescriptionVisible
                    }
                    setIsIgScheduleExistForCreative={
                      setIsIgScheduleExistForCreative
                    }
                    instagramData={instagramData}
                    creative={creative}
                  />
                )}

                {!isIgScheduleExistForCreative && (
                  <InstagramUploadForm
                    closeDrawer={closeDrawer}
                    setIsIgFormDescriptionVisible={
                      setIsIgFormDescriptionVisible
                    }
                    setIsIgScheduleExistForCreative={
                      setIsIgScheduleExistForCreative
                    }
                    creative={creative}
                  />
                )}
              </TabPane>
            )}
            {!isYtTabDisabled && (
              <TabPane
                tab={
                  <span>
                    <Youtube
                      className="icon-youtube"
                      style={{
                        verticalAlign: "middle",
                        fontSize: "29px",
                        marginRight: "5px",
                      }}
                    />
                    &nbsp;YouTube
                  </span>
                }
                key="yt"
              >
                {showYtForm && (
                  <YoutubeFormDescription
                    closeDrawer={closeDrawer}
                    setVisible={setVisible}
                    setIsYtFormDescriptionVisible={
                      setIsYtFormDescriptionVisible
                    }
                    setIsYtScheduleExistForCreative={
                      setIsYtScheduleExistForCreative
                    }
                    youtubeData={youtubeData}
                    creative={creative}
                  />
                )}
                {!isYtScheduleExistForCreative && (
                  <YoutubeUploadForm
                    setIsYtFormDescriptionVisible={
                      setIsYtFormDescriptionVisible
                    }
                    setIsYtScheduleExistForCreative={
                      setIsYtScheduleExistForCreative
                    }
                    creative={creative}
                  />
                )}
              </TabPane>
            )}
          </Tabs>
        )}
      </Drawer>
    </>
  );
};

export default InfluencerDrawer;
