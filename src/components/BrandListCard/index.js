import React from 'react';
import img1 from 'assets/images/project1.jpg';
import CreativeUploadModal from '../InfluencerUploadModal';
import ProposalConfirmModal from '../ProposalConfirmModal';

import './styles.scss';

const BrandListCard = ({ name, uploadCreative, img, disabled }) => {
  console.log(img, 'img');
  return (
    <div className='brand-list'>
      <div className='brand-list-img'>
        <img src={img} alt='' />
      </div>
      <div className='brand-content'>
        <div className='brand-list-content'>
          <span className='list-title'>{name}</span>
        </div>
        {uploadCreative ? (
          <div className='brand-list-btn'>
            {disabled ? null : (
              <CreativeUploadModal
                btnText={disabled ? 'Approval Pending' : 'Upload Creative'}
                style={`view-btn ${disabled && 'disabled'}`}
                creativeUploads
              />
            )}
          </div>
        ) : (
          <div className='brand-list-btn'>
            <button className={`view-btn ${disabled && 'disabled'}`}>
              View Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandListCard;
