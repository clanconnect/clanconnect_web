import React from "react";
import "./styles.scss";
import InfluencerUploadModal from "../InfluencerUploadModal";

const StatusBasedActions = {
  ongoing: (project, creatives, disablePreviousVersionUpload) => (
    <div className="brand-list-btn">
      <InfluencerUploadModal
        btnText={"Upload Creative"}
        style={`view-btn`}
        creativeUploads
        project={project}
        creatives={creatives}
        disablePreviousVersionUpload={disablePreviousVersionUpload}
      />
    </div>
  ),
  active: (project, creatives, disablePreviousVersionUpload) => (
    <div className="brand-list-btn">
      <InfluencerUploadModal
        btnText={"Upload Creative"}
        style={`view-btn`}
        creativeUploads
        project={project}
        creatives={creatives}
        disablePreviousVersionUpload={disablePreviousVersionUpload}
      />
    </div>
  ),

  default: (project) => (
    <div className="brand-list-btn">
      <a
        href={`${process.env.REACT_APP_WEB_HOST}/clan_project_show?id=${project?.id}`}
      >
        <button className={`view-btn`}>View Details</button>
      </a>
    </div>
  ),
};
const ProjectListCard = ({
  project,
  disableAction,
  creatives,
  disablePreviousVersionUpload,
  className,
  rightspace,
}) => {
  console.log(project, disableAction);
  return (
    <div className={`brand-list ${className}`}>
      <div className="brand-list-img">
        <img src={project.coverPictureUrl} alt="" />
      </div>
      <div className={`brand-content ${rightspace ? "wid-50" : ""}`}>
        <div className="brand-list-content">
          <span className="list-title">{project.title}</span>
        </div>

        {!disableAction && StatusBasedActions[project.status]
          ? StatusBasedActions[project.status](
              project,
              creatives || [],
              disablePreviousVersionUpload
            )
          : StatusBasedActions["default"](
              project,
              creatives || [],
              disablePreviousVersionUpload
            )}
      </div>
    </div>
  );
};

export default ProjectListCard;
