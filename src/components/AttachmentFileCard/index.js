import React from 'react';
import img from 'assets/images/png.svg';

import './styles.scss';

const AttachmentFileCard = (props) => {
  return (
    <div className='file-card cursor-pointer'>
      <div className='flex '>
        <img src={img} alt='download' width='25' className='mr-10 ' />
        <div>
          <span className='file-title'>file_name_here.png</span>
          <p className='file-date'>
            <span>12/28/2020</span> <span>at 4:34 pm</span>
          </p>
        </div>
      </div>

      <span className=' file-size'>23 MB</span>
      {/* <img src={downloadImg} alt='download' width='16' /> */}
    </div>
  );
};

export default AttachmentFileCard;
