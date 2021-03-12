import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CustomScroll from '../CustomScroll/comment';
import {
  getCommentsAction,
  postCommentsAction,
} from 'redux/brands/comments/actions';

import './styles.scss';

const CommentBox = ({ creativeId, showFiles }) => {
  const dispatch = useDispatch();
  const { commentData } = useSelector((store) => store.comments);
  const [text, setText] = useState('');
  const [page] = useState(1);
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
      setText('');
    }
  };

  const handleChange = (value) => {
    setText(value);
  };

  useEffect(() => {
    dispatch(getCommentsAction({ page, id: creativeId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className='comment-box animate__animated animate__fadeIn'
      key={`creative-comments-${creativeId}`}
    >
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
