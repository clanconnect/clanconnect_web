import React from 'react';

import './styles.scss';

const Breadcrumb = ({ text }) => {
  return (
    <div className='breadcrumb-custom'>
      <span>Dashboard </span>
      <span className='mlr-5'>{'>'}</span>
      <span>{text}</span>
    </div>
  );
};

export default Breadcrumb;
