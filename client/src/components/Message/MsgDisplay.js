import React from "react";
import moment from "moment";
import { imageShow } from "../../utils/mediaShow";
import InitialsRound from "../InitialsRound/InitialsRound.component";
import "./Message.styles.scss";

const MsgDisplay = ({ user, msg, theme }) => {
  return (
    <>
      <div className="chat_title">
        <InitialsRound initials={user.name && user.name[0]} iHeight="24px" iWidth="24px" />
        <span className="text-dark">{user?.name}</span>
      </div>
      {msg.text && (
        <div
          className="chat_text"
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
        >
          {msg.text}
        </div>
      )}

      {msg.media &&
        msg.media.map((item, index) => (
          <div key={index} style={{ maxWidth: "380px", maxHeight: "380px" }}>
            {imageShow(item.url, theme)}
          </div>
        ))}

      <div className="chat_time">
        {moment(new Date(msg.createdAt).toLocaleString()).fromNow()}
      </div>
    </>
  );
};

export default MsgDisplay;
