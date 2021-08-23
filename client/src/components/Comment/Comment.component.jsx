import React, { useEffect, useState } from "react";
import { Card, Dropdown, Form } from "react-bootstrap";
import "./Comment.styles.scss";
import { MdDelete, MdEdit, MdMoreVert } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../../redux/actions/commentAction";

const Comment = ({ comment, post }) => {
  const [onEdit, setOnEdit] = useState(false);
  const {
    commentText,
    commentBy: { name, _id },
  } = comment;
  const {
    userInfo: { userId },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    setNewComment(commentText);
  }, [commentText]);

  const handleDeleteComment = () => {
    dispatch(deleteComment(comment._id, post));
  };

  const handleEditComment = () => {
    setOnEdit(!onEdit);
  };

  const handleSaveComment = () => {
    const updatedComment = {
      commentText: newComment,
      commentBy: {
        name,
        _id
      },
      _id: comment._id
    }
    dispatch(updateComment(updatedComment, post));
    setOnEdit(!onEdit);
  };

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
                <Dropdown.Item onClick={handleEditComment}>
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
        {!onEdit ? (
          <Card.Text>{commentText}</Card.Text>
        ) : (
          <Form>
            <Form.Control
              as="textarea"
              value={newComment}
              style={{resize: "none", height: "40px"}}
              className="mb-2"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
            />
            <span
              className="mx-2"
              style={{ cursor: "pointer" }}
              onClick={handleEditComment}
            >
              Cancel
            </span>
            <span
              className="mx-2"
              style={{ cursor: "pointer" }}
              onClick={handleSaveComment}
            >
              Save
            </span>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default Comment;
