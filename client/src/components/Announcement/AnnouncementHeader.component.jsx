import React, { useState } from "react";
import moment from "moment";
import InitialsRound from "../InitialsRound/InitialsRound.component";
import { useSelector, useDispatch } from "react-redux";
import { MdMoreHoriz, MdDelete, MdEdit } from "react-icons/md";
import { Dropdown } from "react-bootstrap";
import UpdatePostModal from "../Modal/UpdatePostModal.component";
import { deleteProfilePost } from "../../redux/actions/profileAction";

const AnnouncementHeader = ({ author, createdAt, postId, postText, postPicture }) => {
  const {
    userInfo: { userId },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDeletePost = () => {
    dispatch(deleteProfilePost(postId));
  };
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        marginBottom: "10px",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex" }}>
        <InitialsRound
          initials={author.name[0].toUpperCase()}
          iWidth="44px"
          iHeight="44px"
          bgColor="#2dcea3"
        />
        <div
          style={{
            margin: "auto 10px",
            textAlign: "left",
          }}
        >
          <div style={{ color: "#2dcea3", fontWeight: "600" }}>
            {author.name}
          </div>
          <div style={{ fontSize: "14px" }} className="text-secondary">
            {moment(createdAt).format("DD MMM YYYY")}
          </div>
        </div>
      </div>
      {userId === author._id && (
        <Dropdown direction="end">
          <Dropdown.Toggle id="dropdown-basic">
            <span>
              <MdMoreHoriz size="24px" />
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setVisible(true)}>
              <span className="text-primary">
                <MdEdit />
              </span>{" "}
              Edit Post
            </Dropdown.Item>
            <UpdatePostModal
              show={visible}
              hide={() => setVisible(false)}
              postText={postText}
              postPicture={postPicture}
              postId={postId}
            />
            <Dropdown.Item onClick={handleDeletePost}>
              <span className="text-danger">
                <MdDelete />
              </span>{" "}
              Delete Post
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default AnnouncementHeader;
