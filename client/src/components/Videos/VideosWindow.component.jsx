import React from "react";
import VideoModal from "../Modal/VideoModal.component";
import { Container, Row, Col, Alert } from "react-bootstrap";
import "./VideosWindow.styles.scss";

function VideosWindow({ subscriber }) {
  return (
    <>
      {!subscriber ? (
        <Container>
          <Alert variant="danger" style={{ margin: "100px" }}>
            <Alert.Heading>You are not a Subscriber</Alert.Heading>
            <hr />
            <p className="mb-0">
              Please contact the authorized personal so that they can add you to
              the subscriber list.
            </p>
          </Alert>
        </Container>
      ) : (
        <div style={{ overflow: "hidden", minHeight: "100vh" }}>
          <Row style={{ margin: 100 }} className="video-container">
            <Col lg={4} xs={12} md={6}>
              <VideoModal />
            </Col>
            <Col lg={4} xs={12} md={6}>
              <VideoModal />
            </Col>
            <Col lg={4} xs={12} md={6}>
              <VideoModal />
            </Col>
            <Col lg={4} xs={12} md={6}>
              <VideoModal />
            </Col>
            <Col lg={4} xs={12} md={6}>
              <VideoModal />
            </Col>
            <Col lg={4} xs={12} md={6}>
              <VideoModal />
            </Col>
            <Col lg={4} xs={12} md={6}>
              <VideoModal />
            </Col>
            <Col lg={4} xs={12} md={6}>
              <VideoModal />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default VideosWindow;
