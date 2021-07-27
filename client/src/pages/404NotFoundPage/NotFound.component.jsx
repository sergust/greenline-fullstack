import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Logo from "../../components/Logo/Logo.component";
import Authentication from "../../components/Authentication/Authentication.component";
import Menu from "../../components/Menu/Menu.component";
import NotFound from "../../components/NotFound/NotFound.component";

const HomePage = () => {
  return (
    <div>
      <Container>
        <Row className="header">
          <Logo />
          <Authentication />
        </Row>
        <Row>
          <Menu />
        </Row>
        <Row>
          <NotFound />
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
