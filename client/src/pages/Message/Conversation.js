import React from "react";
import Footer from "../../components/Footer/Footer.component";
import Header from "../../components/Header/Header.component";
import { Container, Row } from "react-bootstrap";
import LeftSide from "../../components/Message/LeftSide";
import RightSide from "../../components/Message/RightSide";
import "../HomePage/HomePage.styles.scss";
import "./Message.styles.scss";


const Conversation = () => {
  return (
    <Container fluid>
      <Header />
      <div className="message d-flex">
        <div
          className="col-md-4 px-0"
          style={{ borderRight: "1px solid #ddd" }}
        >
          <LeftSide />
        </div>

        <div className="col-md-8 px-0">
          <RightSide />
        </div>
      </div>
      <Row className="footer">
        <Footer />
      </Row>
    </Container>
  );
};

export default Conversation;
