import React from "react";
import "./post.styles.scss";
import {
  Col,
  Row,
} from "react-bootstrap";
import PostHeader from "./PostHeader.component";
import PostBody from "./PostBody.component";
import PostFooter from "./PostFooter.component";
import PostComment from "./PostComment.component";

const Post = ({
  body,
  postPicture,
  author,
  createdAt,
  likes,
  comments,
  _id,
}) => {
  return (
    <Row className="post-row">
      <Col className="post">
        <PostHeader
          author={author}
          createdAt={createdAt}
          postId={_id}
          postText={body}
          postPicture={postPicture}
        />
        <PostBody body={body} postPicture={postPicture} />
        <PostFooter likes={likes} comments={comments} postId={_id} />
        <PostComment comments={comments} postId={_id} />
      </Col>
    </Row>
  );
};

export default Post;
