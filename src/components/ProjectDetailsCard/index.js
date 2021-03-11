import React from 'react';
import { Empty } from 'antd';
import img1 from 'assets/images/project1.jpg';

import './styles.scss';

const ProjectDetailsCard = ({ projectDetail }) => {
  return projectDetail.length != 0 ? (
    <div className='card-wrapper'>
      <div className='img-card'>
        <img src={projectDetail?.coverPictureUrl} alt='img' />
      </div>
      <div className='card-content'>
        <h2 className='project-title'>{projectDetail?.title}</h2>
        <p className='project-para'>{projectDetail?.shortDesc}</p>
      </div>
    </div>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  );
};

export default ProjectDetailsCard;
