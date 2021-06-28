import React from "react";
import { Collapse } from "antd";
import { WarningOutlined, CaretRightOutlined } from "@ant-design/icons";
import { imageRequirements, videoRequirements } from "./dataManager";

import "./styles.scss";

const { Panel } = Collapse;

const MediaRequirementAlert = ({ files }) => {
  const imageFile = files?.[0]?.type.includes("image") ? files[0] : null;
  const videoFile = files?.[0]?.type.includes("video") ? files[0] : null;
  console.log(imageFile, videoFile);
  let mediaRequirements;
  if (imageFile) {
    mediaRequirements = imageRequirements;
  }
  if (videoFile) {
    mediaRequirements = videoRequirements;
  }

  return (
    <div className="media-requirement-collapse">
      <Collapse
        expandIconPosition="right"
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel
          header={
            <div>
              <WarningOutlined
                style={{
                  color: "#f0ac19",
                  fontSize: "20px",
                }}
              />
              <span className="collapse-header-text">
                {imageFile && "Image Requirements"}
                {videoFile && "Video Requirements"}
              </span>
            </div>
          }
          key="1"
        >
          {mediaRequirements?.map((o, idx) => (
            <div key={idx}>
              <h4>{o.socialMedia}</h4>
              <ul>
                {o.requirements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </Panel>
      </Collapse>
    </div>
  );
};

export default MediaRequirementAlert;
