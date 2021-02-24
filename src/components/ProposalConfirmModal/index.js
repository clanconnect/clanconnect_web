import React, { useState } from 'react';
import { Modal } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import UploadDocumentCard from '../UploadDocumentCard';
import UploadAttchmentFile from '../UploadAttchmentFile';
import pngImg from 'assets/images/png.svg';
import pdfImg from 'assets/images/pdf.svg';

import './styles.scss';

const ProposalConfirmModal = ({ className }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button className={className} onClick={() => setVisible(true)}>
        View Details
      </button>
      <Modal
        title='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        className='influencer-upload-modal'
        centered
        width={700}
      >
        <div className='mt-30'>
          <button className='outline-btn bg-green-outline'>Approve</button>
          <button className='outline-btn bg-red'>Reject</button>
        </div>
      </Modal>
    </>
  );
};

export default ProposalConfirmModal;
