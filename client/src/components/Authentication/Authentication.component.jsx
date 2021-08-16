import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import InitialsRound from "../InitialsRound/InitialsRound.component";
import { logout } from "../../redux/actions/authAction";
import "./Authentication.styles.scss";

const Authentication = () => {
  const {auth} = useSelector(state => state);
  const {currentUserDetail} = auth;
  const dispatch = useDispatch();
  const [name, setName] = useState("Cameron");

  useEffect(() => {
    if(currentUserDetail?.name) {
      setName(currentUserDetail?.name);
    }
  }, [currentUserDetail?.name])

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Row className="authentication" noGutters>
      <div className="authentication--avatar">
        <Link to={currentUserDetail?.role === "admin" ? "/admin/profile" : "/profile"} style={{textDecoration: "none"}}>
          <InitialsRound initials={`${name[0]}${name[1]}`.toUpperCase()} />
        </Link>
      </div>
      <div>
        <div className="auth-name">Hi, {name}</div>
        <Link className="auth-logout" onClick={handleLogout}>Log out</Link>
      </div>
    </Row>
  );
};

export default Authentication;
