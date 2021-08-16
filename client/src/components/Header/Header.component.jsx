import React from "react";
import {Row} from "react-bootstrap";
import Authentication from "../Authentication/Authentication.component";
import Logo from "../Logo/Logo.component";
import Menu from "../../components/Menu/Menu.component";
import "./Header.styles.scss";

const Header = () => {
  return (
    <>
      <Row className="header">
        <Logo />
        <Authentication />
      </Row>
      <Row>
        <Menu />
      </Row>
    </>
  );
};

export default Header;
