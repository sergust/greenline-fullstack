import React from "react";
import "./HomePage.styles.scss";
import { Container, Row, Col, Image } from "react-bootstrap";
import Logo from "../../components/Logo/Logo.component";
import Authentication from "../../components/Authentication/Authentication.component";
import Menu from "../../components/Menu/Menu.component";
import Feed from "../Feed/Feed.component";
import Footer from "../../components/Footer/Footer.component";

const HomePage = () => {
  return (
    <div>
      <Container fluid>
        <Row className="header">
          <Logo />
          <Authentication />
        </Row>
        <Row>
          <Menu />
        </Row>
        <Row>
          <Feed />
        </Row>
        <Row className="footer">
          <Footer />
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
