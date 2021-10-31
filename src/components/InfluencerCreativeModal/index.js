import React, { useState, useRef, useEffect } from "react";
import "./styles.scss";
import VideoPlayer from "react-player";
import { Modal, Carousel, Tag, Empty } from "antd";
import { UpOutlined, RightOutlined, LeftOutlined } from "@ant-design/icons";
import CommentBox from "../CommentBox";
import AttachmentFileCard from "../AttachmentFileCard";
import BrandUploadDocumentModal from "../BrandUploadDocumentModal";
import download from "assets/images/download.svg";
import paperclip from "assets/images/paperclip.svg";
import { downloadMedia } from "helpers";
import InfluencerDrawer from "components/InfluencerDrawer";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { ACTIONS as YT_ACTIONS } from "redux/creators/socials/youtube/actions";
import { ACTIONS as IG_ACTIONS } from "redux/creators/socials/instagram/actions";

const statusTags = {
  rejected: (
    <Tag color="#f50" style={{ position: "relative", top: 0, left: 0 }}>
      Rejected
    </Tag>
  ),
  pending: (
    <Tag color="#2db7f5" style={{ position: "relative", top: 0, left: 0 }}>
      Pending
    </Tag>
  ),
  accepted: (
    <Tag color="#87d068" style={{ position: "relative", top: 0, left: 0 }}>
      Approved
    </Tag>
  ),
};

const MediaView = ({ media, imageUrl, onImageError }) => {
  return (
    <div className="slider-box" key={`media-${media.id}`}>
      <Tag color="cyan">{media.versionTag}</Tag>
      {media.mimeType.includes("image") ? (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img
          alt={`creative-image-${media.id}`}
          src={imageUrl}
          onError={(e) => {
            e.target.src = onImageError(media.slug);
          }}
          className="contentStyle"
        />
      ) : (
        <VideoPlayer
          url={`${process.env.REACT_APP_VIDEO_BASE_URL}/${media.slug}`}
          className="video-contentStyle"
          controls={true}
        />
      )}
      {media.mimeType.includes("image") && (
        <img
          src={download}
          alt=""
          className="icons-custom cursor-pointer"
          onClick={() => downloadMedia(media.slug)}
        />
      )}
    </div>
  );
};

const InfluencerCreativeModal = ({
  src,
  className,
  creative = {},
  project = {},
  compactView,
  onAllCreativesPage,
}) => {
  const [visible, setVisible] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [creativeStatus, setCreativeStatus] = useState("");
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setCreativeStatus(creative?.media[0]?.status || "pending");
  }, []);

  const getImageUrl = (slug) => {
    return `${process.env.REACT_APP_IMAGE_BASE_URL}/${slug || "default"}`;
  };

  const onImageError = (slug) => {
    return `${process.env.REACT_APP_MEDIA_ORIGINAL_URL}/${slug || "default"}`;
  };

  const slider = useRef(null);

  const showAttachFiles = () => {
    setShowAttachments(!showAttachments);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const showDrawer = () => {
    dispatch({
      type: YT_ACTIONS.GET_INDEX,
      payload: {
        query: { creativeId: creative.id },
      },
    });
    dispatch({
      type: IG_ACTIONS.GET_INDEX,
      payload: {
        query: { creativeId: creative.id },
      },
    });
    setIsDrawerVisible(true);
  };

  const closeModal = (val) => setVisible(false);

  const handleCreativeChange = (val) => {
    const media = creative.media ? creative.media[val] : null;
    console.log("media ====> ", media);
    setCreativeStatus(media?.status || "pending");
  };

  return (
    <>
      {compactView ? (
        <div className="version-text" onClick={() => setVisible(true)}>
          {creative?.media[0]?.mimeType.includes("image") ? (
            <img
              src={`${process.env.REACT_APP_IMAGE_BASE_URL}/${creative?.media[0]?.slug}`}
              width="80"
              height="80"
              className="version-img"
              alt="n m"
              onError={(e) => {
                e.target.src = `${process.env.REACT_APP_MEDIA_ORIGINAL_URL}/${
                  creative?.media[0]?.slug || "default"
                }`;
              }}
            />
          ) : (
            <VideoPlayer
              url={`${process.env.REACT_APP_VIDEO_BASE_URL}/${creative?.media[0]?.slug}`}
              controls={false}
              style={{ height: "80px", width: "80px" }}
              className="short-video"
            />
          )}
          <span className={"version-title"}>
            {creative.media.length} version
          </span>
          <RightOutlined className="ml-4" />
        </div>
      ) : (
        <img
          alt=""
          onClick={() => setVisible(true)}
          src={src}
          className={`cursor-pointer ${className}`}
        />
      )}

      {creative?.status === "accepted" && (
        <InfluencerDrawer
          isDrawerVisible={isDrawerVisible}
          closeDrawer={closeDrawer}
          setVisible={setVisible}
          creative={creative}
          project={project}
        />
      )}

      <Modal
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => closeModal(false)}
        width={1100}
        centered
        className="custom-modal"
      >
        <div className="creative-modal">
          <div className="creative-modal-header flex justify-between">
            <p className="title">
              {_.startCase(_.camelCase(project.title))}
              {creative?.status === "accepted" && (
                <button
                  className="btn-submit"
                  onClick={() => {
                    showDrawer();
                    setVisible(false);
                  }}
                >
                  Schedule
                </button>
              )}
            </p>
            <div className="flex align-items">
              <span>Status: </span>
              <div className="" style={{ marginLeft: "10px" }}>
                {statusTags[creativeStatus || "pending"]}
              </div>
            </div>
          </div>

          <div className="creative-modal-body">
            <div className="flex justify-center mobile-section">
              <div className="carousal-section">
                {creative?.media?.length > 1 ? (
                  <LeftOutlined
                    onClick={() => slider.current.prev()}
                    className="slider-left-icon"
                  />
                ) : null}
                <Carousel
                  ref={slider}
                  beforeChange={(f, t) => handleCreativeChange(t)}
                >
                  {creative.media.length !== 0 ? (
                    creative.media.map((media) =>
                      MediaView({
                        media,
                        imageUrl: getImageUrl(media.slug),
                        onImageError,
                      })
                    )
                  ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )}
                </Carousel>
                {creative?.media?.length > 1 ? (
                  <RightOutlined
                    onClick={() => slider.current.next()}
                    className="slider-right-icon"
                  />
                ) : null}
              </div>
              {/* Remove comment section when not on `All Creatives` Page */}
              {!onAllCreativesPage && (
                <div className="comment-section">
                  <div className="flex justify-between items-center">
                    <p className="view-title" onClick={showAttachFiles}>
                      View Attachments{" "}
                      <UpOutlined
                        className={`${
                          showAttachments ? "icon-animation" : "trans-icon"
                        } ml-4 `}
                      />
                    </p>

                    <BrandUploadDocumentModal
                      src={paperclip}
                      project={project}
                      creative={creative}
                    />
                  </div>

                  {showAttachments ? (
                    <div
                      className={`tarnsition animate__animated animate__fadeIn`}
                    >
                      {creative.attachments.length !== 0 ? (
                        creative.attachments.map((media) => (
                          <AttachmentFileCard media={media} />
                        ))
                      ) : (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          style={{ margin: "0px" }}
                        />
                      )}
                    </div>
                  ) : (
                    <CommentBox creativeId={creative.id} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InfluencerCreativeModal;
