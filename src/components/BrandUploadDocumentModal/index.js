import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Tooltip } from 'antd';
import axios from 'axios';
import axiosInstance from 'services/configureAxios';

import UploadDocumentCard from '../UploadDocumentCard';
import UploadAttchmentFile from '../UploadAttchmentFile';
import pngImg from 'assets/images/png.svg';
import pdfImg from 'assets/images/pdf.svg';
import { getUploadUrlsApi, registerMediaApi } from 'services/media';

import { setState } from 'redux/media/actions';

import './styles.scss';

const UploadDocumentModal = ({ src }) => {
  const dispatch = useDispatch();
  const { uploadProgress, fileData } = useSelector((store) => store.media);
  const [visible, setVisible] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const [fileList, setfileList] = useState([]);
  const [progress, setProgress] = useState(0);

  const showUploadFiles = (value) => {
    setShowFile(value);

    getUploadUrlsApi(fileList).then((response) => {
      if (response.success) {
        for (let i = 0; i < response.data.length; i++) {
          axios
            .put(response.data[i].url, fileList[i].originFileObj, {
              onUploadProgress: (progressEvent) => {
                const progress = (
                  (progressEvent.loaded / progressEvent.total) *
                  100
                ).toFixed(2);

                setProgress(progress);
              },
              headers: {
                'content-type': fileList[i].originFileObj.type,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
                'Access-Control-Allow-Headers':
                  'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
              },
            })
            .then(() => {
              registerMediaApi({ key: response.data[i].key }).then((res) => {
                dispatch(
                  setState({
                    fileData: [...fileList, ...fileData],
                  })
                );
                setfileList([]);
              });
            });
        }
      }
    });
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
            {showFile && <span>{fileData.length} files selected</span>}
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
            {fileData &&
              fileData.map((file) => {
                return (
                  <UploadAttchmentFile
                    percenter={100}
                    fileName={file.originFileObj.name}
                    icon={pngImg}
                  />
                );
              })}

            {fileList &&
              fileList.map((file) => {
                return (
                  <UploadAttchmentFile
                    percenter={progress}
                    fileName={file.originFileObj.name}
                    icon={pngImg}
                  />
                );
              })}
          </div>
        ) : (
          <UploadDocumentCard setfileList={setfileList} />
        )}

        <div className='comment-btns flex justify-between '>
          {showFile ? null : (
            <div className=''>
              <button
                className={`btn-submit ${
                  fileList.length === 0 ? 'disabled' : null
                }`}
                onClick={() => showUploadFiles(true)}
              >
                Send
              </button>
              {/* <button className='btn-cancel'>Cancel</button> */}
            </div>
          )}

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
