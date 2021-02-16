import React from 'react';
import img1 from 'assets/images/project1.jpg';

import './styles.scss';

const BrandListCard = ({ name }) => {
  return (
    <div className='brand-list'>
      <div className='brand-list-img'>
        <img src={img1} alt='' />
      </div>
      <div className='brand-content'>
        <div className='brand-list-content'>
          <span className='list-title'>{name}</span>
        </div>
        <div className='brand-list-btn'>
          <button className='view-btn'>View Proposal</button>
        </div>
      </div>
    </div>
  );
};

export default BrandListCard;
