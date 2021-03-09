import React from "react";

import "./styles.scss";

const LineHeading = ({ title, style }) => {
  return (
    <div className={`title-lineRow ${style}`}>
      <div className="hdtitle">
        <h2 className="line-title">{title}</h2>
      </div>
    </div>
  );
};

export default LineHeading;
