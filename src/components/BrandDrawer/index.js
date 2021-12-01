import "./styles.scss";
import { Drawer, Tabs, Empty } from "antd";
import { useSelector } from "react-redux";
import YoutubeFormDescription from "./YoutubeFormDescription";
import InstagramFormDescription from "./InstagramFormDescription";

const BrandDrawer = ({
  setVisible,
  isDrawerVisible,
  closeDrawer,
  creative,
}) => {
  const youtubeData = useSelector((store) => store.BrandYoutube.data);
  const instagramData = useSelector((store) => store.BrandInstagram.data);

  const onTabChange = () => {};

  const { TabPane } = Tabs;
  return (
    <>
      <Drawer
        title="Scheduled Creative"
        width={720}
        onClose={closeDrawer}
        visible={isDrawerVisible}
        bodyStyle={{ paddingBottom: 20 }}
        destroyOnClose={true}
      >
        <Tabs defaultActiveKey="ig" onChange={onTabChange}>
          <TabPane tab="Instagram" key="ig">
            {!instagramData?.id && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span>No Creative Scheduled By Influencer</span>}
              />
            )}
            {instagramData?.id && (
              <InstagramFormDescription
                setVisible={setVisible}
                closeDrawer={closeDrawer}
                instagramData={instagramData}
                creative={creative}
              />
            )}
          </TabPane>
          <TabPane tab="Youtube" key="yt">
            {!youtubeData?.id && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span>No Creative Scheduled By Influencer</span>}
              />
            )}
            {youtubeData?.id && (
              <YoutubeFormDescription
                setVisible={setVisible}
                closeDrawer={closeDrawer}
                youtubeData={youtubeData}
                creative={creative}
              />
            )}
          </TabPane>
        </Tabs>
      </Drawer>
    </>
  );
};
export default BrandDrawer;
