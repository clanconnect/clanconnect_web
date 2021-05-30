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
import YoutubeFormDescription from "./YoutubeFormDescription";
const InfluencerDrawer = ({
  isDrawerVisible,
  closeDrawer,
  setVisible,
  creative,
}) => {
  const { TabPane } = Tabs;
  const youtubeData = useSelector((store) => store.CreatorYoutube.data);

  console.log("youtubeData", youtubeData);

  const [isFormDescriptionVisible, setIsFormDescriptionVisible] = useState(
    false
  );
  const [
    isYtScheduleExistForCreative,
    setIsYtScheduleExistForCreative,
  ] = useState(true);
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
                <YoutubeFormDescription
                  closeDrawer={closeDrawer}
                  setVisible={setVisible}
                  setIsFormDescriptionVisible={setIsFormDescriptionVisible}
                  setIsYtScheduleExistForCreative={
                    setIsYtScheduleExistForCreative
                  }
                  youtubeData={youtubeData}
                />
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
