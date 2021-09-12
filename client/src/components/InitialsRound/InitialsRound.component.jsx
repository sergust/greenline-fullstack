import React from "react";
import "./InitialsRound.styles.scss";

const InitialsRound = ({
  initials,
  iHeight = "64px",
  iWidth = "64px",
  bgColor = "#AEBFBC",
}) => (
  <div
    className="initials-round"
    style={{ height: iHeight, width: iWidth, backgroundColor: bgColor }}
  >
    {initials}
  </div>
);

export default InitialsRound;
