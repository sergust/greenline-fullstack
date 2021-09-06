import React from "react";
import { Container, Row } from "react-bootstrap";
import Footer from "../../components/Footer/Footer.component";
import Header from "../../components/Header/Header.component";
import CreateVideoWindow from "../../components/Videos/CreateVideoWindow.component";

function CreateVideos() {
  return (
    <Container fluid>
      <Header />
      <Row>
        <CreateVideoWindow />
      </Row>
      <Row className="footer">
        <Footer />
      </Row>
    </Container>
  );
}

export default CreateVideos;
