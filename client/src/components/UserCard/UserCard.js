import React from "react";
import { Link } from "react-router-dom";
import { FaImage } from "react-icons/fa";
import InitialsRound from "../InitialsRound/InitialsRound.component";
import "./UserCard.styles.scss";

const UserCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  msg,
}) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };
  return (
    <div
      className={`d-flex justify-content-between p-2 w-100 align-items-center ${border}`}
    >
      <div>
        <Link
          to={`/profile/${user._id}`}
          onClick={handleCloseAll}
          className="d-flex align-items-center"
          style={{ textDecoration: "none" }}
        >
          <div className="big-avatar-cover">
            <InitialsRound
              initials={`${user.name[0].toUpperCase()}`}
              iHeight="50px"
              iWidth="50px"
              bgColor="rgb(45, 206, 163)"
            />
          </div>
          <div className="ms-2" style={{ transform: "translateY(-2px)" }}>
            <span className="d-block text-dark">
              {user.name
                ? `${user.name[0].toUpperCase()}${user.name.slice(1)}`
                : "No Name"}
            </span>

            <small className="d-flex text-muted" style={{ flexWrap: "wrap" }}>
              {msg ? (
                <>
                  <div>{user.text}</div>
                  {user.media.length > 0 && (
                    <div>
                      {user.media.length} <FaImage />
                    </div>
                  )}
                </>
              ) : (
                user.email
              )}
            </small>
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default UserCard;
