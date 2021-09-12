import React from "react";
import InitialsRound from "../InitialsRound/InitialsRound.component";
import { Row } from "react-bootstrap";
import './User.styles.scss'

function User() {
  return (
    <Row style = {{margin: 20, textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
    <InitialsRound
      initials="J"
      iWidth="44px"
      iHeight="44px"
      bgColor="#2dcea3"
    />
    <div style = {{marginLeft: 10}}>John</div>
    </Row>
  );
}

export default User;
