import React from 'react';
import img1 from 'assets/images/project1.jpg';

import './styles.scss';

const ProjectDetailsCard = (props) => {
  return (
    <div className='card-wrapper'>
      <div className='img-card'>
        <img src={img1} alt='img' />
      </div>
      <div className='card-content'>
        <h2 className='project-title'>Nestle Advertisement</h2>
        <p className='project-para'>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, kasd gubergren, no
          sea.
        </p>
        <p className='project-para'>
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit
          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea.
        </p>
      </div>
    </div>
  );
};

export default ProjectDetailsCard;
