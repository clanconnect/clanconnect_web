import React from "react";
import "./styles.scss";
import CreativeUploadModal from "../InfluencerUploadModal";

const StatusBasedActions = {
  ongoing: (project) => (
    <div className="brand-list-btn">
      <CreativeUploadModal
        btnText={"Upload Creative"}
        style={`view-btn`}
        creativeUploads
      />
    </div>
  ),

  default: (project) => (
    <div className="brand-list-btn">
      <button className={`view-btn`}>View Details</button>
    </div>
  ),
};
const ProjectListCard = ({ project, disableAction }) => {
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
          ? StatusBasedActions[project.status](project)
          : StatusBasedActions["default"](project)}
      </div>
    </div>
  );
};

export default ProjectListCard;
