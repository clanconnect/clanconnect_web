import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import NewCustomScroll from "../NewCustomScroll/comment";
import { postCommentsAction } from "redux/brands/comments/actions";
import { updateCreativeStats } from "redux/brands/creatives/actions";

import "./styles.scss";

const NewCommentBox = ({ creativeId, showFiles }) => {
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
      <div className="d-flex creative-page-chat-box">
        <textarea
          placeholder="Type something here…"
          className="custom-input"
          onChange={(e) => handleChange(e.target.value)}
          value={text}
        ></textarea>
        {errorState ? (
          <span className="error">Please write a message</span>
        ) : null}
        <div className="comment-btns">
          <button className="btn-submit " onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>
      <div className="comment-scroll">
        <div className="flex justify-between">
          <h3 className="chat-title">Comments</h3>
        </div>
        <NewCustomScroll creativeId={creativeId} />
      </div>
    </div>
  );
};

export default NewCommentBox;
