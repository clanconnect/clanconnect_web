import React from 'react';
import downloadImg from 'assets/images/download.svg';

import './styles.scss';

const AttachmentFileCard = (props) => {
  return (
    <div className='file-card'>
      <div>
        <span className='file-title'>file_name_here.png</span>
        <p className='file-date'>
          <span>12/28/2020</span> <span>at 4:34 pm</span>
        </p>
      </div>
      <div>
        <span className='mr-30 file-size'>23 MB</span>
        <img src={downloadImg} alt='download' width='16' />
      </div>
    </div>
  );
};

export default AttachmentFileCard;
