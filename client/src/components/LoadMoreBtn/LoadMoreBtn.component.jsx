import React from "react";
import { Button, Spinner } from "react-bootstrap";
import "./LoadMoreBtn.styles.scss";

const LoadMoreBtn = () => {
  return (
    <div>
      <Button variant="outline-primary" className="load-more-btn" size="md">
        <Spinner as="span" animation="border" size="sm" role="status" />
        <span className="mx-2">Load More</span>
      </Button>{" "}
    </div>
  );
};

export default LoadMoreBtn;
