import "./styles.scss";
import { Drawer, Tabs, Empty } from "antd";
import { useSelector } from "react-redux";
import YoutubeFormDescription from "./YoutubeFormDescription";
import InstagramFormDescription from "./InstagramFormDescription";

const BrandDrawer = ({ setVisible, isDrawerVisible, closeDrawer }) => {
  const youtubeData = useSelector((store) => store.BrandYoutube.data);
  const instagramData = useSelector((store) => store.BrandInstagram.data);
  console.log("instagramData", instagramData);

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
        <Tabs defaultActiveKey="yt" onChange={onTabChange}>
          <TabPane tab="Youtube" key="yt">
            {!youtubeData?.id && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            {youtubeData?.id && (
              <YoutubeFormDescription
                setVisible={setVisible}
                closeDrawer={closeDrawer}
                youtubeData={youtubeData}
              />
            )}
          </TabPane>
          <TabPane tab="Instagram" key="ig">
            {!instagramData?.id && (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
            {instagramData?.id && (
              <InstagramFormDescription
                setVisible={setVisible}
                closeDrawer={closeDrawer}
                instagramData={instagramData}
              />
            )}
          </TabPane>
        </Tabs>
      </Drawer>
    </>
  );
};
export default BrandDrawer;
