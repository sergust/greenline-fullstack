import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import "./Modal.styles.scss";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { RiVideoLine } from "react-icons/ri";

function VideoModal() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div style = {{marginBottom: 50}}>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId="VI6w857GeTw"
        onClose={() => setOpen(false)}
      />
      <Card
        style={{ width: "20rem", minHeight: '22rem', position: "relative", border: 'none', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}
        className="card-container"
      >
        <Card.Img
          className="img"
          variant="top"
          src="https://static.toiimg.com/photo/msid-53891743,width-96,height-65.cms"
        />
        <div className="video-icon">
          <span>
            <RiVideoLine size={20} color="gray" />
          </span>
          <span style={{ fontSize: 12 }}>video</span>
        </div>
        <div
          className="overlay"
          style={{ position: "absolute", top: "100px", left: "160px" }}
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
        <Card.Body style={{ backgroundColor: "#f9f9f9"}}>
          <Card.Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, voluptatem quod autem, odit, fugit libero debitis reprehenderit cum!
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default VideoModal;
