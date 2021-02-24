import React from 'react';

import CustomScroll from '../CustomScroll';

import './styles.scss';

const CommentBox = ({ name }) => {
  return (
    <div className='comment-box'>
      <div className='comment-scroll'>
        <div className='flex justify-between'>
          <h3 className='chat-title'>Comments</h3>
        </div>
        <CustomScroll />
      </div>

      <textarea
        placeholder='Type something here…'
        className='custom-input'
      ></textarea>
      <div className='comment-btns'>
        <button className='btn-submit'>Submit</button>
      </div>
    </div>
  );
};

export default CommentBox;
