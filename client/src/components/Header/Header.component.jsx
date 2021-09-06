import React, {useEffect} from "react";
import {Row} from "react-bootstrap";
import Authentication from "../Authentication/Authentication.component";
import Logo from "../Logo/Logo.component";
import Menu from "../../components/Menu/Menu.component";
import "./Header.styles.scss";
import { loadUser } from "../../redux/actions/authAction";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch]);

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
