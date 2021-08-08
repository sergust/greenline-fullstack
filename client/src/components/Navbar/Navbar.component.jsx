import Header from "../Header/Header.component";
import { Row } from "react-bootstrap";
import Menu from "../Menu/Menu.component";
import React, { Fragment } from "react";

const Navbar = () => {
  return (
    <Fragment>
      <Header />
      <Row>
        <Menu />
      </Row>
    </Fragment>
  );
};
export default Navbar;
