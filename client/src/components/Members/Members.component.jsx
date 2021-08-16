import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import InitialsRound from "../InitialsRound/InitialsRound.component";
import "./Members.styles.scss";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

function Members({ media }) {
  return (
      <Row className="post-row ml-10 my-1">
        <Col className="posts float-left" style={{ padding: "8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "2px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <InitialsRound
                initials="J"
                iWidth="30px"
                iHeight="30px"
                bgColor="#2dcea3"
              />

              <div style={{ marginLeft: "10px" }}>John Doe</div>
            </div>

            <div style={{ color: "#2dcea3" }}>John@mail.com</div>
            <div>+00 9852147</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <AiOutlinePlusCircle />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <AiOutlineMinusCircle />
              </div>
            </div>
          </div>
        </Col>
      </Row>
  );
}

export default Members;
{
  /* <InitialsRound
          initials="J"
          iWidth="35px"
          iHeight="35px"
          bgColor="#2dcea3"
        /> */
}
