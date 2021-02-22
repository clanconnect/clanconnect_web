import React from 'react';
import { Progress } from 'antd';

import './styles.scss';

const UploadAttchmentFile = ({
  percenter,
  icon,
  fileName,
  uploadedFile,
  handleClick,
}) => {
  return (
    <>
      <div className='file-card cursor-pointer' onClick={handleClick}>
        <div>
          <img src={icon} alt='' width='25' className='mr-15' />
          <span className='file-title'>{fileName}</span>
        </div>
        {uploadedFile ? null : (
          <div style={{ width: '35%' }}>
            <Progress percent={percenter} size='small' />
          </div>
        )}
      </div>
    </>
  );
};

export default UploadAttchmentFile;
