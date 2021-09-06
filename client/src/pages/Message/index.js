import React from "react";
import Footer from "../../components/Footer/Footer.component";
import Header from "../../components/Header/Header.component";
import LeftSide from "../../components/Message/LeftSide";
import { Container, Row } from "react-bootstrap";
import "../HomePage/HomePage.styles.scss";
import "./Message.styles.scss";
import { FaFacebookMessenger } from "react-icons/fa";

const Message = () => {
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
          <div className="d-flex justify-content-center align-items-center flex-column h-100">
            <FaFacebookMessenger size={42} color="#22a684"/>
            <h4>Messenger</h4>
          </div>
        </div>
      </div>
      <Row className="footer">
        <Footer />
      </Row>
    </Container>
  );
};

export default Message;
