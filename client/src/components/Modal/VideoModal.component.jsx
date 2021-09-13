import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { RiVideoLine, RiDeleteBin6Line } from "react-icons/ri";
import { deleteVideo } from "../../redux/actions/videoAction";
import "./Modal.styles.scss";

function VideoModal({ description, thumbnail, src, videoId }) {
  const {
    userInfo: { role, token },
  } = useSelector((state) => state.auth);
  const [isOpen, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleDeleteVideo = (id) => {
    const isSure = window.confirm("Are you sure you want to delete?");
    if(!isSure) return;

    dispatch(deleteVideo(id, token));
  }

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
        {role === "superAdmin" && (
          <div className="v-delete-icon">
          <span onClick={() => handleDeleteVideo(videoId)}>
            <RiDeleteBin6Line size={20} color="#f50057" />
          </span>
        </div>
        )}
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
