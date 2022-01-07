import React, { useState, useEffect, useRef } from "react";
import Header from "components/DemoHeader";
import SideNav from "components/DemoSideNav";
import { useHistory, useParams } from "react-router-dom";
import "./styles.scss";
import { ACTIONS as PROJECT_ACTIONS } from "redux/creators/projects/actions";
import { ACTIONS as CREATIVE_ACTIONS } from "redux/creators/creatives/actions";
import { connect, useDispatch } from "react-redux";
import { Tabs, Empty, Collapse, Row, Col, Drawer, Alert } from "antd";
import InfluencerDrawer from "components/InfluencerDrawer";
import InfluencerCreativeModal from "components/InfluencerCreativeModal";

import { Instagram, Youtube } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import InstagramFormDescription from "components/BrandDrawer/InstagramFormDescription";
import InstagramUploadForm from "components/InstagramUploadForm";
import YoutubeFormDescription from "components/BrandDrawer/YoutubeFormDescription";
import YoutubeUploadForm from "components/YoutubeUploadForm";
import VideoPlayer from "react-player";
import {
  UpOutlined,
  RightOutlined,
  LeftOutlined,
  DownOutlined,
} from "@ant-design/icons";
import fullScreen from "assets/images/full-screen.svg";
import { getCommentsAction } from "redux/brands/comments/actions";
import { Tag, Dropdown, Menu, Carousel } from "antd";
import { downloadMedia } from "helpers";
import download from "assets/images/download.svg";
import { ACTIONS as YT_ACTIONS } from "redux/brands/socials/youtube/actions";
import { ACTIONS as IG_ACTIONS } from "redux/brands/socials/instagram/actions";
import BrandUploadDocumentModal from "components/BrandUploadDocumentModal";
import paperclip from "assets/images/paperclip.svg";
import AttachmentFileCard from "components/AttachmentFileCard";
import NewCommentBox from "components/NewCommentBox";
import PopupModal from "components/PopupModal";

const CreativePage = ({
  closeDrawer,
  setVisible,
  creatives,
  onAllCreativesPage,
  user,
  creativeInstagram,
  creativeYoutube,
  compactView,
}) => {
  const [activeTab, setActiveTab] = useState("Creatives");
  const { id, creativeId } = useParams();
  let history = useHistory();
  const [isYtTabDisabled, setIsYtTabDisabled] = useState(true);
  const [isIgTabDisabled, setIsIgTabDisabled] = useState(true);
  const { TabPane } = Tabs;
  const [isIgScheduleExistForCreative, setIsIgScheduleExistForCreative] =
    useState(true);
  const instagramData = useSelector((store) => store.CreatorInstagram.data);

  const showIgForm =
    isIgScheduleExistForCreative &&
    instagramData?.id &&
    isIgFormDescriptionVisible;

  const [isIgFormDescriptionVisible, setIsIgFormDescriptionVisible] =
    useState(false);
  const [isYtScheduleExistForCreative, setIsYtScheduleExistForCreative] =
    useState(true);
  const [isYtFormDescriptionVisible, setIsYtFormDescriptionVisible] =
    useState(false);
  const youtubeData = useSelector((store) => store.CreatorYoutube.data);
  const showYtForm =
    isYtScheduleExistForCreative &&
    youtubeData?.id &&
    isYtFormDescriptionVisible;
  const [creativeStatus, setCreativeStatus] = useState("");
  const [playing, setPlaying] = useState(false);
  const dispatch = useDispatch();
  const [creative, setCreative] = useState({});
  const [viewScheduleBtnDisabled, setViewSheduleBtnDisabled] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  // const user = useSelector((store) => store.user.user);
  const [openModal, setOpenModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const statusMap = {
    accepted: {
      label: "Approved",
      style: {
        color: "white",
        borderColor: "white",
        backgroundColor: "#87d068",
      },
    },
    rejected: {
      label: "Rejected",
      style: { color: "white", borderColor: "white", backgroundColor: "#f50" },
    },
  };
  const slider = useRef(null);
  const backToAll = () => {
    history.push(`/v2/influencer/campaigns/${id}`);
  };
  const loadProjects = ({ proposalStatus }) => {
    dispatch(getCommentsAction({ page: 1, id: creativeId }));

    const handleActiveTab = (index) => {
      setActiveTab(index);
    };
  };
  const setPopupVisible = () => {
    setShowPopup(true);
  };
  const loadCreatives = ({ status }) => {
    dispatch({
      type: CREATIVE_ACTIONS.GET_BY_ID,
      payload: { query: { status: null, include: "project" }, id },
    });
    loadCreative();
  };
  function callback(key) {
    loadProjects({ proposalStatus: "accepted" });
    loadCreatives({ status: "" });
    showDrawer();
  }

  const loadCreative = () => {
    if (creatives.length > 0) {
      setIsIgTabDisabled(
        !creatives[0].project.primarySocialMedia.includes("Instagram")
      );
      setIsYtTabDisabled(
        !creatives[0].project.primarySocialMedia.includes("Youtube")
      );
    }
    const creativeData = creatives[0]?.creatives?.find(
      (data) => data.id === creativeId
    );
    if (creativeData) {
      setCreative({ ...creativeData });
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    callback("pending");
  }, []);

  useEffect(() => {
    const creativeData = creatives[0]?.creatives?.find(
      (data) => data.id === creativeId
    );
    if (creativeData) {
      setIsYtScheduleExistForCreative(
        youtubeData?.creative === creativeData.id
      );
      setIsYtFormDescriptionVisible(youtubeData?.creative === creativeData.id);
      setIsIgScheduleExistForCreative(
        instagramData?.creative === creativeData.id
      );
      setIsIgFormDescriptionVisible(
        instagramData?.creative === creativeData.id
      );
      setIsYtTabDisabled(
        creative?.media
          ?.find((o) => o.status === "accepted")
          ?.mimeType.includes("image")
      );
    }
  }, [
    user,
    creativeYoutube,
    creativeInstagram,
    creative,
    youtubeData,
    instagramData,
  ]);
  const handleCreativeChange = (val) => {
    const media = creative.media ? creative.media[val] : null;
    setCreativeStatus(media?.status || "pending");
  };

  const handleModalVisibility = (v) => {
    // setOpenModal && setOpenModal(v);
    setVisible(v);
  };

  const menu = (status) => {
    return (
      <Menu>
        <Menu.Item key="accepted">
          <div className="flex">
            <label className="flex justify-between items-center cursor-pointer">
              <input
                type="radio"
                name="status"
                value="accepted"
                checked={status === "accepted"}
                className="cursor-pointer"
              />
              <span className="menu-item-status-text">Approve</span>
            </label>
          </div>
        </Menu.Item>
        <Menu.Item key="rejected">
          <div className="flex">
            <label className="flex justify-between items-center cursor-pointer">
              <input
                type="radio"
                name="status"
                value="rejected"
                checked={status === "rejected"}
                className="cursor-pointer"
              />
              <span className="menu-item-status-text">Reject</span>
            </label>
          </div>
        </Menu.Item>
      </Menu>
    );
  };

  const showDrawer = () => {
    dispatch({
      type: YT_ACTIONS.GET_INDEX,
      payload: {
        query: { creativeId: creativeId },
      },
    });
    dispatch({
      type: IG_ACTIONS.GET_INDEX,
      payload: {
        query: { creativeId: creativeId },
      },
    });
    setIsDrawerVisible(true);
  };

  const closeModal = () => {
    setPlaying(false);
    setCurrentMedia(null);
    handleModalVisibility(false);
  };
  return (
    <div className="main-wrapper-influncer">
      {console.log(user, " checking user")}
      <Header />
      <div className="flex top-space-commom">
        <SideNav />
        <div className="content-wrapper">
          <div className="tabs-container">
            <div className={`brand-list brand-list-card`}>
              <div className="brand-list-img">
                <img src={creatives[0]?.project?.coverPictureUrl} alt="" />
              </div>
              <div className={`brand-content`}>
                <div className="brand-list-content">
                  <span className="list-title">
                    {creatives[0]?.project?.title}
                  </span>
                </div>
              </div>
              <div className="back-to-campaigns" onClick={backToAll}>
                View all Posts
              </div>
            </div>
            <div className="creative-container">
              <div className="p-2">
                {creatives.length !== 0 ? (
                  creatives[0]?.creatives.map((creative, index) => (
                    <div key={index}>
                      {creative.id === creativeId && (
                        <Row>
                          <Col xs={24} md={12}>
                            <div
                              className="slider-box"
                              key={`media-carousel-${creative?.media[0]?.id}`}
                            >
                              <div className="creative-modal">
                                <div className="creative-modal-header flex justify-between">
                                  <div className="">
                                    {/* {influencerStatus ? ( */}
                                    {user?.user_type === "influencer" ? (
                                      <div>
                                        <span>Status: </span>
                                        <button className="bg-green-outline">
                                          {creative?.status === "accepted"
                                            ? "Approved"
                                            : creative?.status}
                                        </button>
                                      </div>
                                    ) : (
                                      <Dropdown
                                        overlay={menu(creativeStatus)}
                                        trigger={["click"]}
                                      >
                                        <a
                                          href="#javascript"
                                          className="ant-dropdown-link"
                                          style={
                                            statusMap[creativeStatus]?.style ||
                                            {}
                                          }
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          {statusMap[creativeStatus]?.label ||
                                            "Select a status"}
                                          <DownOutlined />
                                        </a>
                                      </Dropdown>
                                    )}
                                  </div>
                                </div>
                                <div className="creative-modal-body">
                                  <div className="justify-center mobile-section">
                                    <div className="carousal-section">
                                      {creative?.media?.length > 1 ? (
                                        <LeftOutlined
                                          onClick={() => slider.current.prev()}
                                          className="slider-left-icon"
                                        />
                                      ) : null}
                                      <Carousel
                                        ref={slider}
                                        className={"remove-buttom"}
                                        beforeChange={(f, t) =>
                                          handleCreativeChange(t)
                                        }
                                      >
                                        {creative.length !== 0 ? (
                                          creative.media.map((media) => {
                                            return (
                                              <div
                                                className="slider-box media-inner-container"
                                                key={`media-carousel-${media.id}`}
                                              >
                                                {/* <Tag color="cyan">{media.versionTag}</Tag> */}
                                                {media.mimeType.includes(
                                                  "image"
                                                ) ? (
                                                  <img
                                                    src={`${process.env.REACT_APP_IMAGE_BASE_URL}/${media.slug}`}
                                                    className="contentStyle"
                                                    alt={`creative-media-${media.id}`}
                                                    onError={(e) => {
                                                      e.target.src = `${
                                                        process.env
                                                          .REACT_APP_MEDIA_ORIGINAL_URL
                                                      }/${
                                                        media.slug || "default"
                                                      }`;
                                                    }}
                                                  />
                                                ) : (
                                                  <VideoPlayer
                                                    url={`${process.env.REACT_APP_VIDEO_BASE_URL}/${media.slug}`}
                                                    className="video-contentStyle"
                                                    playing={playing}
                                                    controls={true}
                                                  />
                                                )}
                                                {media.mimeType.includes(
                                                  "image"
                                                ) && (
                                                  <div className="img-full-screen-relative">
                                                    <img
                                                      className="img-full-screen"
                                                      src={fullScreen}
                                                      onClick={setPopupVisible}
                                                    />

                                                    <PopupModal
                                                      imageUrl={`${process.env.REACT_APP_IMAGE_BASE_URL}/${media.slug}`}
                                                      openModal={showPopup}
                                                      setOpenModal={(value) =>
                                                        setShowPopup(value)
                                                      }
                                                    />
                                                  </div>
                                                  //creative={creative}
                                                  // openModal={true}
                                                  // setOpenModal={(value) =>
                                                  //   setOpenModal(value)
                                                  // }
                                                  // />
                                                  // <InfluencerCreativeModal
                                                  //   src={fullScreen}
                                                  //   project={
                                                  //     creatives[0]?.project
                                                  //   }
                                                  //   className="icons-custom cursor-pointer"
                                                  //   creative={creative}
                                                  //   openModal={openModal}
                                                  //   setOpenModal={(value) =>
                                                  //     setOpenModal(value)
                                                  //   }
                                                  //   compactView={false}
                                                  // />
                                                  // <img
                                                  //   src={download}
                                                  //   alt="download icon"
                                                  //   className="icons-custom cursor-pointer"
                                                  //   onClick={() =>
                                                  //     downloadMedia(media.slug)
                                                  //   }
                                                  // />
                                                )}
                                              </div>
                                            );
                                          })
                                        ) : (
                                          <Empty
                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                          />
                                        )}
                                      </Carousel>
                                      {creative?.media?.length > 1 ? (
                                        <RightOutlined
                                          onClick={() => slider.current.next()}
                                          className="slider-right-icon"
                                        />
                                      ) : null}

                                      {/* Remove comment section when not on `All Creatives` Page */}
                                      {!onAllCreativesPage && (
                                        <div className="comment-section">
                                          {showFiles ? (
                                            <div
                                              className={`tarnsition animate__animated animate__fadeIn`}
                                            >
                                              {creative.attachments.length !==
                                              0 ? (
                                                creative.attachments.map(
                                                  (media) => (
                                                    <AttachmentFileCard
                                                      media={media}
                                                      key={`attachment-media-${media.id}`}
                                                    />
                                                  )
                                                )
                                              ) : (
                                                <Empty
                                                  image={
                                                    Empty.PRESENTED_IMAGE_SIMPLE
                                                  }
                                                  style={{ margin: "0" }}
                                                />
                                              )}
                                            </div>
                                          ) : (
                                            <NewCommentBox
                                              creativeId={creative.id}
                                              showFiles={showFiles}
                                            />
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {creative && creatives.length > 0 ? (
                              <div
                                className="version-text"
                                onClick={() => handleCreativeChange(true)}
                              ></div>
                            ) : (
                              <img
                                alt=""
                                onClick={() => handleModalVisibility(true)}
                                src={fullScreen}
                                className={`cursor-pointer icons-custom cursor-pointer`}
                              />
                            )}
                          </Col>
                          <Col className="p-2" xs={24} md={12}>
                            {creative.media[0].status === "pending" && (
                              <div className="p-2">
                                <Alert
                                  description={
                                    "Only approved creatives can be scheduled."
                                  }
                                  type="warning"
                                  showIcon
                                />
                              </div>
                            )}
                            <div className="creative-page-rs-title">
                              Schedule your post
                            </div>
                            {isIgTabDisabled && isYtTabDisabled ? (
                              <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description="Please log into either Instagram or Youtube to schedule your post"
                              />
                            ) : (
                              <Tabs
                                className="scheduleModal"
                                defaultActiveKey="ig"
                              >
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
                                        creativepage={true}
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
                                        creativepage={true}
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
                                        creativepage={true}
                                      />
                                    )}
                                    {!isYtScheduleExistForCreative && (
                                      <YoutubeUploadForm
                                        closeDrawer={closeDrawer}
                                        setIsYtFormDescriptionVisible={
                                          setIsYtFormDescriptionVisible
                                        }
                                        setIsYtScheduleExistForCreative={
                                          setIsYtScheduleExistForCreative
                                        }
                                        creative={creative}
                                        creativepage={true}
                                      />
                                    )}
                                  </TabPane>
                                )}
                              </Tabs>
                            )}
                            {/* </Drawer> */}
                          </Col>
                        </Row>
                      )}
                    </div>
                  ))
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  CreatorProjects,
  CreatorCreatives,
  user,
  CreatorInstagram,
  CreatorYoutube,
}) => ({
  projects: CreatorProjects.list,
  creatives: CreatorCreatives.list,
  user: user.user,
  creativeInstagram: CreatorInstagram,
  creativeYoutube: CreatorYoutube,
});

export default connect(mapStateToProps)(CreativePage);
// export default InfluencerPage;
