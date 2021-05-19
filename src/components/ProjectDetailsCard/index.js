import React from "react";
import { Empty } from "antd";
import * as _ from "lodash";
import img1 from "assets/images/project1.jpg";
import { FaEdit } from "react-icons/fa";

import "./styles.scss";

const ProjectDetailsCard = ({ projectDetail }) => {
  return projectDetail.length != 0 ? (
    <div className="card-wrapper">
      {/* <div className="img-card">
        <img src={projectDetail?.coverPictureUrl} alt="img" />
      </div> */}
      <div className="card-content">
        <div className="card-header">
          <h2 className="project-title">
            {_.startCase(_.camelCase(projectDetail?.title))}
          </h2>
          {/* <span className="edit-icon">
            <a
              href={`${process.env.REACT_APP_WEB_HOST}/projects/${projectDetail?.slugs[0]}/edit`}
            >
              <FaEdit />
            </a>
          </span> */}
        </div>
        {/* <p className="project-para">{projectDetail?.shortDesc}</p> */}
      </div>
    </div>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  );
};

export default ProjectDetailsCard;
