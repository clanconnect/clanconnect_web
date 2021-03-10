import React from 'react';
import './styles.scss';
import { Spin } from 'antd';
const Loader = () => {
  return (
    <div className='modal-loader'>
      <div className='modal-content-loader'>
        <div className='spinner-border' role='status'>
          <Spin className='spn' />
        </div>
      </div>
    </div>
  );
};

export default Loader;
