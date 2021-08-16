import React, {useEffect, useState} from "react";
import { MdSend } from "react-icons/md" 
import InitialsRound from "../InitialsRound/InitialsRound.component";
import { InputGroup, Row, FormControl, Button } from "react-bootstrap";
import Comment from "../Comment/Comment.component";
import { createComment } from "../../redux/actions/commentAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const PostComment = ({comments, postId}) => {
  const [postComment, setPostComment] = useState("");
  const {posts} = useSelector(state => state.homePosts);
  const {errorMsg} = useSelector(state => state.fail);
  const dispatch = useDispatch();
  const targetPost = posts.find(item => item._id === postId);
  const {currentUserDetail} = useSelector(state => state.auth);

  useEffect(() => {
    if(!errorMsg?.error) {
      return;
    } 
    toast(errorMsg?.error, {type: 'error'})
  }, [errorMsg?.error])


  const handlePostComment = (e) => {
    e.preventDefault();
    if(!postComment) return;
    dispatch(createComment(targetPost, postComment));
    setPostComment("");
  };

  return (
    <>
      <div>
        <Row className="mx-3">
          <p style={{ color: "#2dcea3", cursor: "pointer" }}>View more comments</p>
        </Row>
      </div>
      <div>
        {comments.map((cmt) => (
          <Row className="mx-3" key={cmt._id}>
            <InitialsRound initials={cmt.commentBy.name[0]} iWidth="44px" iHeight="44px" />
          <Comment comment={cmt} post={targetPost} />
        </Row>
        ))}
      </div>
      <div style={{ alignItems: "center" }} className="my-2">
        <form>
          <InputGroup>
            <InitialsRound initials={currentUserDetail?.name[0]} iWidth="44px" iHeight="44px" />
            <FormControl
              style={{ height: "42px", borderRadius: "20px" }}
              className="mx-3 px-3"
              type="text"
              placeholder="Write a comment...."
              value={postComment}
              onChange={e => setPostComment(e.target.value)}
            />
            <Button className="post-comment-btn" type="submit" onClick={handlePostComment}>
            <MdSend size="34" color="#00CEA3" />
            </Button>
          </InputGroup>
        </form>
      </div>
    </>
  );
};

export default PostComment;
