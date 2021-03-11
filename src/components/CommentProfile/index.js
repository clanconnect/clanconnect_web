import React from "react";
import { Badge, Checkbox } from "antd";
import user from "assets/images/user.jpg";
import moment from "moment";

import "./styles.scss";
import { getImageUrl } from "helpers";

const CommentProfile = ({ data }) => {
  return (
    <div className="comment-profile">
      <img
        src={data?.author?.image || getImageUrl("default-user.jpg")}
        className="user-icon"
      />
      <div className="user-chat">
        <div className="flex justify-between">
          <h4 className="msg-title">{data?.author?.name}</h4>
          <span className="msg-date">
            {moment(data?.createdAt).format("DD/MM/YYYY")}
          </span>
        </div>
        <p className="msg-para" style={{ whiteSpace: "pre-line" }}>
          {data?.text}
        </p>
      </div>
    </div>
  );
};

export default CommentProfile;
