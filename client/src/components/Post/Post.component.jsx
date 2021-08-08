import React from "react";
import "./post.styles.scss";
import { Col, Row } from "react-bootstrap";
import InitialsRound from "../InitialsRound/InitialsRound.component";
import { Form } from "react-bootstrap";
import Comment from "../Comment/Comment.component";

const Post = ({ user, date, text, media }) => (
  <Row className="post-row">
    <Col lg="8" className="post">
      <div style={{ width: "100%", display: "flex", marginBottom: "10px" }}>
        <div style={{ display: "flex" }}>
          <InitialsRound
            initials="M"
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
            <div style={{ color: "#2dcea3", fontWeight: "600" }}>{user}</div>
            <div>{date}</div>
          </div>
        </div>
      </div>
      <div
        style={{ textAlign: "left", marginBottom: "10px", color: "#5E5E5E" }}
        className="my-4"
      >
        {text}
      </div>
      {media && (
        <div>
          <img src={media} style={{ width: "100%", maxHeight: "300px" }} />
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          borderTop: "1px solid #e5e0e0",
          borderBottom: "1px solid #e5e0e0",
          padding: "10px 0",
        }}
        className="my-4"
      >
        <div style={{ color: "#808080" }}>
          <span className="like-count mx-1">1</span>Like
        </div>
        <div style={{ color: "#808080" }}>
          <span className="comment-count mx-1">3</span>Comment
        </div>
        <div style={{ color: "#808080" }}>
          <span className="share-count mx-1">10</span>Share
        </div>
      </div>
      <div>
        <Row className="mx-3">
          <p style={{ color: "#2dcea3" }}>View all comments</p>
        </Row>
      </div>
      <div>
        <Row className="mx-3">
          <InitialsRound initials="J" iWidth="44px" iHeight="44px" />
          <Comment />
        </Row>
        <Row className="mx-3">
          <InitialsRound initials="K" iWidth="44px" iHeight="44px" />
          <Comment />
        </Row>
      </div>
      <div style={{ display: "flex", alignItems: "center" }} className="my-2">
        <InitialsRound initials="M" iWidth="44px" iHeight="44px" />
        <Form.Control
          type="input"
          style={{ width: "90%", height: "48px" }}
          className="mx-3"
          placeholder="Leave a comment..."
        />
      </div>
    </Col>
  </Row>
);

export default Post;
