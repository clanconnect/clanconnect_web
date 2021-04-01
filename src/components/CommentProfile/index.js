import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";

import "./styles.scss";
import { getImageUrl } from "helpers";

const CommentProfile = ({ data, user }) => {
  const [hasRead, setHasRead] = useState(false);
  console.log("data", data);
  useEffect(() => {
    if (user.user_type === "influencer") {
      setHasRead(data.has_influencer_read);
    }
    if (user.user_type === "advertiser") {
      setHasRead(data.has_advertiser_read);
    }
  }, []);
  return (
    <div className="comment-profile" key={`comment-detail-${data.id}`}>
      <img
        alt="hgbn"
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
        <div
          className={
            hasRead ? "comment-status" : "comment-status status-active"
          }
        >
          <div className="dotgreen" />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ user }, ownProps) => {
  return {
    user: user.user,
  };
};

export default connect(mapStateToProps)(CommentProfile);
// export default CommentProfile;
