import React from 'react';

import './styles.scss';

const LineHeading = ({ title }) => {
  return (
    <div class='title-lineRow'>
      <div class='hdtitle'>
        <h2 className='line-title'>{title}</h2>
      </div>
    </div>
  );
};

export default LineHeading;
