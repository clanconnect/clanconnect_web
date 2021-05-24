import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import CustomScroll from "../CustomScroll/comment";
import { postCommentsAction } from "redux/brands/comments/actions";
import { updateCreativeStats } from "redux/brands/creatives/actions";

import "./styles.scss";

const CommentBox = ({ creativeId, showFiles }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [errorState, setErrorState] = useState(false);

  const handleSubmit = () => {
    if (text === "") {
      setErrorState(true);
    }
    if (text.length > 0) {
      setErrorState(false);
      let payload = {
        text,
        id: creativeId,
      };
      dispatch(postCommentsAction(payload));
      setText("");
    }
  };

  const handleChange = (value) => {
    setText(value);
  };
  // Alter unread comments directly in the store
  useEffect(() => {
    return () => {
      dispatch(updateCreativeStats({ id: creativeId }));
    };
  }, []);
  return (
    <div
      className="comment-box animate__animated animate__fadeIn"
      key={`creative-comments-${creativeId}`}
    >
      <div className="comment-scroll">
        <div className="flex justify-between">
          <h3 className="chat-title">Comments</h3>
        </div>
        <CustomScroll creativeId={creativeId} />
      </div>

      <textarea
        placeholder="Type something here…"
        className="custom-input"
        onChange={(e) => handleChange(e.target.value)}
        value={text}
      />
      {errorState ? (
        <span className="error">Please write a message</span>
      ) : null}
      <div className="comment-btns">
        <button className="btn-submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
