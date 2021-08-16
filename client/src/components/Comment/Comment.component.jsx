import React, {useState} from "react";
import { Card, Dropdown } from "react-bootstrap";
import "./Comment.styles.scss";
import { MdDelete, MdEdit, MdMoreVert } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../redux/actions/commentAction";

const Comment = ({ comment, post }) => {
  const {
    commentText,
    commentBy: { name, _id },
  } = comment;
  const {
    userInfo: { userId },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDeleteComment = () => {
    dispatch(deleteComment(comment._id, post));
  }

  return (
    <Card className="user-comment">
      <Card.Body>
        <Card.Title>
          {name}
          {userId === _id && (
            <Dropdown direction="end" className="float-right my-2">
              <Dropdown.Toggle id="comment-dropdown">
                <span>
                  <MdMoreVert size="20px" />
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <span className="text-primary">
                    <MdEdit />
                  </span>{" "}
                  Edit Comment
                </Dropdown.Item>
               
                <Dropdown.Item onClick={handleDeleteComment}>
                  <span className="text-danger">
                    <MdDelete />
                  </span>{" "}
                  Delete Comment
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Card.Title>
        <Card.Text>{commentText}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Comment;
