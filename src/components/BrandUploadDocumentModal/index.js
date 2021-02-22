import React, { useState } from 'react';
import { Modal, Tooltip } from 'antd';

import UploadDocumentCard from '../UploadDocumentCard';
import UploadAttchmentFile from '../UploadAttchmentFile';
import pngImg from 'assets/images/png.svg';
import pdfImg from 'assets/images/pdf.svg';

import './styles.scss';

const UploadDocumentModal = ({ src }) => {
  const [visible, setVisible] = useState(false);
  const [showFile, setShowFile] = useState(false);

  const showUploadFiles = (value) => {
    setShowFile(value);
  };

  return (
    <>
      <Tooltip
        title='Attach any document or reference.'
        placement='bottom'
        className='cursor-pointer'
      >
        <img width='16' src={src} onClick={() => setVisible(true)} />
      </Tooltip>

      <Modal
        title={
          <div className='flex justify-between'>
            <span>Upload Attachment</span>
            {showFile && <span>3 files selected</span>}
          </div>
        }
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        className='upload-modal'
        centered
        width={700}
      >
        {showFile ? (
          <div className='conatiner-file'>
            <UploadAttchmentFile
              percenter='30'
              fileName='attachment_name_here.png'
              icon={pngImg}
            />
            <UploadAttchmentFile
              percenter='100'
              fileName='attachment_name_here.pdf'
              icon={pdfImg}
            />
            <UploadAttchmentFile
              percenter='0'
              fileName='attachment_name_here.jpg'
              icon={pngImg}
            />
          </div>
        ) : (
          <UploadDocumentCard />
        )}

        <div className='comment-btns flex justify-between '>
          <div className=''>
            <button
              className='btn-submit'
              onClick={() => showUploadFiles(true)}
            >
              Send
            </button>
            <button className='btn-cancel'>Cancel</button>
          </div>

          {showFile ? (
            <button
              className='btn-cancel bg-outline'
              onClick={() => showUploadFiles(false)}
            >
              Upload More
            </button>
          ) : null}
        </div>
      </Modal>
    </>
  );
};

export default UploadDocumentModal;
