import React, { useEffect, useState } from "react";
import { MdSend } from "react-icons/md";
import InitialsRound from "../InitialsRound/InitialsRound.component";
import { InputGroup, Row, FormControl, Button } from "react-bootstrap";
import Comment from "../Comment/Comment.component";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createComment } from "../../redux/actions/commentAction";

const PostComment = ({ comments, postId }) => {
  const [postComment, setPostComment] = useState("");
  const { posts } = useSelector((state) => state.profile);
  const { errorMsg } = useSelector((state) => state.fail);
  const [next, setNext] = useState(2);
  const [showComments, setShowComments] = useState();
  const targetPost = posts.find((item) => item._id === postId);
  const { currentUserDetail } = useSelector((state) => state.auth);

  const dispatch = useDispatch();


  useEffect(() => {
    setShowComments(comments.slice(comments.length - next));
  }, [comments, next]);

  useEffect(() => {
    if (!errorMsg?.error) {
      return;
    }
    toast(errorMsg?.error, { type: "error" });
  }, [errorMsg?.error]);

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!postComment) return;
    dispatch(createComment(targetPost, postComment));
    setPostComment("");
  };

  return (
    <>
      {comments.length - next > 0 ? (
        <div>
          <Row className="mx-3">
            <p
              style={{ color: "#2dcea3", cursor: "pointer" }}
              onClick={() => setNext(next + 10)}
            >
              View more comments
            </p>
          </Row>
        </div>
      ) : (
        comments.length > 2 && (
          <div>
          <Row className="mx-3">
            <p
              style={{ color: "#F50057", cursor: "pointer" }}
              onClick={() => setNext(2)}
            >
              Hide comments
            </p>
          </Row>
        </div>
        )
        )}
      <div>
        {showComments?.map((cmt) => (
          <Row className="mx-3" key={cmt._id}>
            <InitialsRound
              initials={cmt.commentBy.name[0]}
              iWidth="44px"
              iHeight="44px"
            />
            <Comment comment={cmt} post={targetPost} />
          </Row>
        ))}
      </div>
      <div style={{ alignItems: "center" }} className="my-2">
        <form>
          <InputGroup>
            <InitialsRound
              initials={currentUserDetail?.name[0]}
              iWidth="44px"
              iHeight="44px"
            />
            <FormControl
              style={{ height: "42px", borderRadius: "20px" }}
              className="mx-3 px-3"
              type="text"
              placeholder="Write a comment...."
              value={postComment}
              onChange={(e) => setPostComment(e.target.value)}
            />
            <Button
              className="post-comment-btn"
              type="submit"
              onClick={handlePostComment}
            >
              <MdSend size="34" color="#00CEA3" />
            </Button>
          </InputGroup>
        </form>
      </div>
    </>
  );
};

export default PostComment;
