import React from "react";
import { Container, Row } from "react-bootstrap";
import ChangePasswordWindow from "../../components/ChangePasswordWindow/ChangePasswordWindow.component";
import Header from "../../components/Header/Header.component";
import Footer from "../../components/Footer/Footer.component";

const ChangePassword = () => {
  return (
    <Container fluid="true">
      <Header />
      <ChangePasswordWindow />
      <Row className="footer">
        <Footer />
      </Row>
    </Container>
  );
};

export default ChangePassword;
