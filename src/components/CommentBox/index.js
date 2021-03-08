import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CustomScroll from '../CustomScroll';
import {
  getCommentsAction,
  postCommentsAction,
} from 'redux/brands/comments/actions';

import './styles.scss';

const CommentBox = ({ commentData, setPage }) => {
  const { meta } = useSelector((store) => store.comments);
  const [text, setText] = useState('');
  const [errorState, setErrorState] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (text === '') {
      setErrorState(true);
    }
    if (text.length > 0) {
      setErrorState(false);
      let payload = {
        text,
      };
      dispatch(postCommentsAction(payload));
    }
  };

  const handleChange = (value) => {
    setText(value);
  };
  return (
    <div className='comment-box'>
      <div className='comment-scroll'>
        <div className='flex justify-between'>
          <h3 className='chat-title'>Comments</h3>
        </div>
        <CustomScroll commentData={commentData} setPage={setPage} meta={meta} />
      </div>

      <textarea
        placeholder='Type something here…'
        className='custom-input'
        onChange={(e) => handleChange(e.target.value)}
        value={text}
      />
      {errorState ? (
        <span className='error'>filed should not be empty.</span>
      ) : null}
      <div className='comment-btns'>
        <button className='btn-submit' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
