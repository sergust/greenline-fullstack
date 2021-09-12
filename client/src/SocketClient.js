import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MESSAGE_TYPES } from "./redux/actions/messageAction";

import audioTone from "./audio/pristine-609.mp3";

const SocketClient = () => {
  const { auth, socket } = useSelector((state) => state);
  const { userInfo } = auth;
  const dispatch = useDispatch();

  const audioRef = useRef();

  //!connection
  useEffect(() => {
    if (socket.length !== 0) {
      socket.emit("joinUser", userInfo.userId);
    }
  }, [socket, userInfo.userId, socket.length]);

  //!Messages
  useEffect(() => {
    if (socket.length !== 0) {
      socket.on("addMessageToClient", (msg) => {
        dispatch({ type: MESSAGE_TYPES.ADD_MESSAGE, payload: msg });
      });
      return () => socket.off("addMessageToClient");
    }
  }, [dispatch, socket]);

  return (
    <>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src={audioTone} type="audio/mp3" />
      </audio>
    </>
  );
};

export default SocketClient;
