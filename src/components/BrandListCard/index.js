import React from 'react';
import img1 from 'assets/images/project1.jpg';
import CreativeUploadModal from '../InfluencerUploadModal';

import './styles.scss';

const BrandListCard = ({ name, uploadCreative }) => {
  return (
    <div className='brand-list'>
      <div className='brand-list-img'>
        <img src={img1} alt='' />
      </div>
      <div className='brand-content'>
        <div className='brand-list-content'>
          <span className='list-title'>{name}</span>
        </div>
        {uploadCreative ? (
          <div className='brand-list-btn'>
            <CreativeUploadModal
              btnText='Upload Creative'
              style='view-btn'
              creativeUploads
            />
          </div>
        ) : (
          <div className='brand-list-btn'>
            <button className='view-btn'>View Proposal</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandListCard;
