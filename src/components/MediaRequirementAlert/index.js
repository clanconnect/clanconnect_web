import React from "react";
import { Collapse } from "antd";
import { WarningOutlined, CaretRightOutlined } from "@ant-design/icons";
import { imageRequirements, videoRequirements } from "./dataManager";

import "./styles.scss";

const { Panel } = Collapse;

const MediaRequirementAlert = ({ files }) => {
  const imageFile = files?.[0]?.type.includes("image") ? files[0] : null;
  const videoFile = files?.[0]?.type.includes("video") ? files[0] : null;

  let mediaRequirements = imageRequirements;
  if (imageFile) {
    mediaRequirements = imageRequirements;
  }
  if (videoFile) {
    mediaRequirements = videoRequirements;
  }

  return (
    <div className="media-requirement-collapse" >
      <Collapse
        expandIconPosition="right"
        defaultActiveKey={['1']}
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
                {"Media Requirements"}
                {/* {videoFile && "Video Requirements"} */}
              </span>
            </div>
          }
          key="1"
        >
          <tr>
            <td>
              {imageRequirements?.map((o, idx) => (
                <div key={idx}>
                  <h4>{o.socialMedia} Image</h4>
                  <ul>
                    {o.requirements.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </td>
            <td>
              {videoRequirements?.map((o, idx) => (
                <div key={idx}>
                  <h4>{o.socialMedia} Video</h4>
                  <ul>
                    {o.requirements.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </td>
          </tr>
        </Panel>
      </Collapse>
    </div>
  );
};

export default MediaRequirementAlert;
