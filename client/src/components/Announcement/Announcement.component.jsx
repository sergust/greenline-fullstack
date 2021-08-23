import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import AnnouncementHeader from "./AnnouncementHeader.component";
import AnnouncementFooter from "./AnnouncementFooter.component";
import AnnouncementComment from "./AnnouncementComment.component";
import "./Announcement.styles.scss";



function Announcement({ post }) {
  const {
    body,
    author,
    postPicture,
    createdAt,
    likes,
    comments,
    _id,
  } = post;
  return (
    <Row className="post-row">
      <Col className="post">
        <AnnouncementHeader
          author={author}
          createdAt={createdAt}
          postId={_id}
          postText={body}
          postPicture={postPicture}
        />

        <div
          style={{ textAlign: "left", marginBottom: "10px", color: "#5E5E5E" }}
          className="my-4"
        >
          {body}
        </div>
        {postPicture && (
          <div>
            <img
              src={postPicture}
              style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
            />
          </div>
        )}
        <AnnouncementFooter likes={likes} comments={comments} postId={_id} />
        <AnnouncementComment comments={comments} postId={_id} />
      </Col>
    </Row>
  );
}

export default Announcement;
