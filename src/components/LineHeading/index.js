import React from "react";

import "./styles.scss";

const LineHeading = ({ title, style }) => {
  return (
    <h2 className="title-w-bdr">
      <span>
        {title}
      </span>
    </h2>
  );
};

export default LineHeading;
