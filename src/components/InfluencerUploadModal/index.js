import React, { useState } from 'react';
import { Modal } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import UploadDocumentCard from '../UploadDocumentCard';
import UploadAttchmentFile from '../UploadAttchmentFile';
import pngImg from 'assets/images/png.svg';
import pdfImg from 'assets/images/pdf.svg';

import './styles.scss';

const CreativeUploadModal = ({
  src,
  btnText,
  style,
  creativeUploads,
  disabled,
}) => {
  const [visible, setVisible] = useState(false);
  const [uploadNewFile, setUploadNewFile] = useState('');
  const [showFile, setShowFile] = useState(false);
  const [showOldFile, setShowOldFile] = useState(false);

  const handleUploadNewFile = (value) => {
    setUploadNewFile(value);
    setShowOldFile(false);
  };

  const showUploadFilesProgress = (value) => {
    setShowFile(value);
  };

  const handleOldVersionFile = () => {
    setShowOldFile(true);
    setUploadNewFile('upload new');
  };

  const closeModal = (val) => {
    setVisible(val);
    setUploadNewFile('');
    setShowOldFile(false);
  };

  return (
    <>
      <button className={style} onClick={() => setVisible(true)}>
        {btnText}
      </button>
      <Modal
        title={
          <>
            {uploadNewFile === '' && <span>Upload Creative</span>}
            {uploadNewFile === 'upload added' && (
              <span>
                <ArrowLeftOutlined
                  onClick={() => handleUploadNewFile('')}
                  className='mr-5'
                />{' '}
                Upload a version
              </span>
            )}
            {uploadNewFile === 'upload new' && (
              <span>
                <ArrowLeftOutlined
                  onClick={
                    !showFile
                      ? () => handleUploadNewFile('')
                      : () => showUploadFilesProgress(false)
                  }
                  className='mr-5'
                />{' '}
                Upload a new creative
              </span>
            )}
          </>
        }
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => closeModal(false)}
        className='influencer-upload-modal'
        centered
        width={700}
      >
        <div className='comapign-text'>
          <span>Campaign Name Here</span>
          {showFile && <span className='text-sm'>1 Files Selected</span>}
        </div>

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
            <p className='text-center mb-30'>
              Please select one creative for which you want to upload a version:
            </p>
            <div className='conatiner-file'>
              <UploadAttchmentFile
                fileName='attachment_name_here.jpg'
                icon={pngImg}
                uploadedFile
                handleClick={handleOldVersionFile}
              />
            </div>
          </div>
        )}

        {uploadNewFile === 'upload new' && (
          <>
            {!showFile ? (
              <>
                {showOldFile && (
                  <div className='mb-30'>
                    <p className='text-center mb-30'>
                      Uploading a new version for the selected creative shown
                      below:
                    </p>
                    <UploadAttchmentFile
                      percenter='0'
                      fileName='attachment_name_here.jpg'
                      icon={pngImg}
                      uploadedFile
                    />
                  </div>
                )}
                <UploadDocumentCard />
              </>
            ) : (
              <div className='conatiner-file'>
                <UploadAttchmentFile
                  percenter='0'
                  fileName='attachment_name_here.jpg'
                  icon={pngImg}
                />
              </div>
            )}
            <div className='comment-btns flex justify-between '>
              <div className=''>
                <button
                  className='btn-submit'
                  onClick={() => showUploadFilesProgress(true)}
                >
                  Send
                </button>
                <button className='btn-cancel'>Cancel</button>
              </div>

              {showFile && (
                <button
                  className='btn-cancel bg-outline'
                  onClick={() => showUploadFilesProgress(false)}
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
