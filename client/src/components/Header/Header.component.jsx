import Logo from "../Logo/Logo.component";
import "./Header.styles.scss";
import Authentication from "../Authentication/Authentication.component";
import { Row } from "react-bootstrap";
import React from "react";

const Header = () => {
  return (
    <Row className="header">
      <Logo />
      <Authentication />
    </Row>
  );
};

export default Header;
