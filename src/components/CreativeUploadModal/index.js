import React, { useState } from 'react';
import { Modal } from 'antd';

import UploadDocumentCard from '../UploadDocumentCard';
import UploadAttchmentFile from '../UploadAttchmentFile';
import pngImg from 'assets/images/png.svg';
import pdfImg from 'assets/images/pdf.svg';

import './styles.scss';

const CreativeUploadModal = ({ src, btnText, style, creativeUploads }) => {
  const [visible, setVisible] = useState(false);
  const [uploadNewFile, setUploadNewFile] = useState('');
  const [showFile, setShowFile] = useState(false);

  const handleUploadNewFile = (value) => {
    setUploadNewFile(value);
  };

  const showUploadFiles = (value) => {
    setShowFile(value);
  };

  return (
    <>
      <button className={style} onClick={() => setVisible(true)}>
        {btnText}
      </button>
      <Modal
        title={<span>Upload Creative</span>}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        className='upload-modal'
        centered
        width={700}
      >
        <div className='comapign-text'>Campaign Name Here</div>

        {uploadNewFile === 'upload added' ||
        uploadNewFile === 'upload new' ? null : (
          <div>
            <p className='text-center mt-30'>Please select one option:</p>
            <div className='flex justify-between'>
              <button
                className='select-upload'
                onClick={() => handleUploadNewFile('upload new')}
              >
                Uploading a new creative
              </button>
              <button
                className='select-upload'
                onClick={() => handleUploadNewFile('upload added')}
              >
                A version of previously sent creative
              </button>
            </div>
          </div>
        )}

        {uploadNewFile === 'upload added' && (
          <div>
            <p className='text-center'>
              Please select one creative for which you want to upload a version:
            </p>
            <UploadAttchmentFile
              fileName='attachment_name_here.jpg'
              icon={pngImg}
              uploadedFile
            />
          </div>
        )}

        {uploadNewFile === 'upload new' && (
          <>
            {!showFile ? (
              <UploadDocumentCard />
            ) : (
              <UploadAttchmentFile
                percenter='0'
                fileName='attachment_name_here.jpg'
                icon={pngImg}
              />
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

              {showFile && (
                <button
                  className='btn-cancel bg-outline'
                  onClick={() => showUploadFiles(false)}
                >
                  Upload More
                </button>
              )}
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default CreativeUploadModal;
