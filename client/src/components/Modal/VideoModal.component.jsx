import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import { Card, Button } from "react-bootstrap";
import { RiVideoLine } from "react-icons/ri";
import "./Modal.styles.scss";

function VideoModal({ description, thumbnail, src }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: 50 }}>
      <ModalVideo
        channel="custom"
        autoplay
        isOpen={isOpen}
        url={`${src}`}
        onClose={() => setOpen(false)}
      />
      <Card
        style={{
          width: "20rem",
          minHeight: "22rem",
          position: "relative",
          border: "none",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
        className="card-container"
      >
        <Card.Img
          className="thumbnail-img"
          variant="top"
          src={`${thumbnail}`}
        />
        <div className="video-icon">
          <span>
            <RiVideoLine size={20} color="gray" />
          </span>
          <span style={{ fontSize: 12 }}>video</span>
        </div>
        <div
          className="overlay"
          style={{ position: "absolute", top: "290px", left: "160px" }}
        >
            <Button
              variant="primary"
              style={{ cursor: "pointer" }}
              className="play-btn"
              onClick={() => setOpen(true)}
            >
              Watch Now
            </Button>
        </div>
        <Card.Body style={{ backgroundColor: "#f9f9f9" }}>
          <Card.Title className="text-center">{description}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}

export default VideoModal;
