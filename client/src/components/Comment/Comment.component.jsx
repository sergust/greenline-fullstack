import React from "react";
import { Card } from "react-bootstrap";
import "./Comment.styles.scss";

const Comment = () => {
  return (
    <Card className="user-comment">
      <Card.Body>
        <Card.Title>John Doe</Card.Title>
        <Card.Text>This is the test comment!</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Comment;
