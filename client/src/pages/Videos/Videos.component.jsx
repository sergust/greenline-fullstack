import React from "react";
import { Container, Row } from "react-bootstrap";
import VideosWindow from "../../components/Videos/VideosWindow.component";
import Footer from "../../components/Footer/Footer.component";
import Header from "../../components/Header/Header.component";
import "../../styles/variables.scss";

function Videos({ subscriber }) {
  return (
    <Container fluid>
      <Header />
      <Row>
        <VideosWindow subscriber={subscriber} />
      </Row>
      <Row className="footer">
        <Footer />
      </Row>
    </Container>
  );
}

export default Videos;
