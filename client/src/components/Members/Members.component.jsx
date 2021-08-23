import React from "react";
import { Row, Col } from "react-bootstrap";
import InitialsRound from "../InitialsRound/InitialsRound.component";
import "./Members.styles.scss";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteMembers } from "../../redux/actions/profileAction";

function Members({ member }) {
  const dispatch = useDispatch();

  const removeMember = () => {
    dispatch(deleteMembers(member._id));
  };

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
              initials={member?.name[0].toUpperCase()}
              iWidth="30px"
              iHeight="30px"
              bgColor="#2dcea3"
            />

            <div style={{ marginLeft: "10px" }}>
              {member?.name.toUpperCase()}
            </div>
          </div>

          <div style={{ color: "#2dcea3" }}>{member?.email}</div>
          <div>{member._id}</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginLeft: "10px", cursor: "pointer" }}>
              <AiOutlineMinusCircle onClick={removeMember} />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Members;
