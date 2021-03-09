import React from "react";
import "./styles.scss";
import InfluencerUploadModal from "../InfluencerUploadModal";

const StatusBasedActions = {
  ongoing: (project, creatives) => (
    <div className="brand-list-btn">
      <InfluencerUploadModal
        btnText={"Upload Creative"}
        style={`view-btn`}
        creativeUploads
        project={project}
        creatives={creatives}
      />
    </div>
  ),

  default: (project) => (
    <div className="brand-list-btn">
      <button className={`view-btn`}>View Details</button>
    </div>
  ),
};
const ProjectListCard = ({ project, disableAction, creatives }) => {
  return (
    <div className="brand-list">
      <div className="brand-list-img">
        <img src={project.coverPictureUrl} alt="" />
      </div>
      <div className="brand-content">
        <div className="brand-list-content">
          <span className="list-title">{project.title}</span>
        </div>

        {!disableAction && StatusBasedActions[project.status]
          ? StatusBasedActions[project.status](project, creatives || [])
          : StatusBasedActions["default"](project, creatives || [])}
      </div>
    </div>
  );
};

export default ProjectListCard;
