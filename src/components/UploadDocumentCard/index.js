import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import upload from 'assets/images/upload.svg';

import './styles.scss';

const UploadDocumentCard = () => {
  const { Dragger } = Upload;
  const [fileList, setFilelist] = useState();

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Dragger {...props}>
      <p className='ant-upload-drag-icon'>
        {/* <InboxOutlined /> */}
        <img src={upload} alt='upload' width='48' />
      </p>
      <p className='upload-text'>Drag a image/document here</p>
      <div className='upload-text mb-10'>- or -</div>
      <button className='upload-btn'>Select a photo from you computer</button>
    </Dragger>
  );
};

export default UploadDocumentCard;
