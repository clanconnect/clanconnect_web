import React from 'react';
import './styles.scss';
const Loader = () => {
  return (
    <div className='modal-loader'>
      <div className='modal-content-loader'>
        <div className='spinner-border' role='status'></div>
      </div>
    </div>
  );
};

export default Loader;
