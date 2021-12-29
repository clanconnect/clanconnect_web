import React, { useState, useRef, useEffect } from "react";
import "./styles.scss";
import { Modal } from "antd";

const PopupModal = ({ imageUrl, openModal = false, setOpenModal }) => {
  const [visible, setVisible] = useState(false);
  //   useEffect(() => {
  //     setVisible(openModal);
  //   }, [openModal]);
  const closeModal = () => {
    setOpenModal(false);
    console.log(" clicked close button");
    openModal = false;
  };
  return (
    <div className="">
      <Modal
        title=""
        visible={openModal}
        onOk={() => closeModal()}
        onCancel={() => closeModal()}
        afterClose={() => closeModal()}
        width={1100}
        centered
        className="new-popup-modal"
      >
        <div className="creative-modal">
          <div className="creative-modal-header flex justify-between">
            <p className="title"></p>
          </div>
          <div className="flex align-items full-screen-img">
            <img src={imageUrl} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PopupModal;
