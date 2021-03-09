import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CustomScroll from '../CustomScroll/comment';
import {
  getCommentsAction,
  postCommentsAction,
} from 'redux/brands/comments/actions';

import './styles.scss';

const CommentBox = ({ creativeId }) => {
  const dispatch = useDispatch();
  const { meta, commentData } = useSelector((store) => store.comments);
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const [errorState, setErrorState] = useState(false);

  const handleSubmit = () => {
    if (text === '') {
      setErrorState(true);
    }
    if (text.length > 0) {
      setErrorState(false);
      let payload = {
        text,
        id: creativeId,
      };
      dispatch(postCommentsAction(payload));
    }
  };

  const handleChange = (value) => {
    setText(value);
  };

  // useEffect(() => {
  //   dispatch(getCommentsAction({ page, id: creativeId }));
  // }, []);

  console.log(creativeId, 'commentData');

  return (
    <div className='comment-box'>
      <div className='comment-scroll'>
        <div className='flex justify-between'>
          <h3 className='chat-title'>Comments</h3>
        </div>
        <CustomScroll creativeId={creativeId} commentData={commentData} />
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
