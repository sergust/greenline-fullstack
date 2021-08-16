import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import InitialsRound from "../InitialsRound/InitialsRound.component";
import Comment from "../Comment/Comment.component";
import moment from "moment";
import "./Announcement.styles.scss";

function Announcement({ post }) {
  const {
    body,
    author: { name, avatar },
    postPicture,
    createdAt,
    likes,
    comments
  } = post;
  return (
    <Row className="post-row">
      <Col className="post">
        <div style={{ display: "flex" }}>
          <InitialsRound
            initials="J"
            iWidth="44px"
            iHeight="44px"
            bgColor="#2dcea3"
          />
          <div
            style={{
              marginLeft: "10px",
              textAlign: "left",
            }}
          >
            <div style={{ color: "#2dcea3", fontWeight: "600" }}>{name}</div>
            <div style={{ fontSize: "14px" }} className="text-secondary">
              {moment(createdAt).format("DD MMM YYYY")}
            </div>
          </div>
        </div>

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
            <span className="like-count mx-1">{likes.length}</span>Like
          </div>
          <div style={{ color: "#808080" }}>
            <span className="comment-count mx-1">{comments.length}</span>Comment
          </div>
          <div style={{ color: "#808080" }}>
            <span className="share-count mx-1">10</span>Share
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }} className="my-2">
          <InitialsRound initials="J" iWidth="44px" iHeight="44px" />
          <Form.Control
            as="Input"
            place
            style={{ width: "90%", height: "48px", borderRadius: 30 }}
            className="mx-3"
            placeholder="write a comment..."
          />
        </div>
      </Col>
    </Row>
  );
}

export default Announcement;
