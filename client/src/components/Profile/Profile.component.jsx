import React, { useState, useEffect } from "react";
import { Row, Col, Image, Container, Button } from "react-bootstrap";
import "./Profile.styles.scss";
import {
  FaCalendarAlt,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { CgEditBlackPoint } from "react-icons/cg";
import { IoLocationOutline } from "react-icons/io5";
import { BiPhoneCall } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import EditModal from "../Modal/EditModal.component";
import { loadUser } from "../../redux/actions/authAction";

function Profile() {
  const { users } = useSelector((state) => state.profile);
  const {
    userInfo: { role },
    currentUserDetail,
  } = useSelector((state) => state.auth);
  const [profileDetail] = users;
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Container>
      <Row style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          roundedCircle
          src="https://i.pinimg.com/originals/ae/ec/c2/aeecc22a67dac7987a80ac0724658493.jpg"
          style={{ width: 200, height: 200 }}
        />
      </Row>
      <Row
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
        }}
      >
        {currentUserDetail?.name}
      </Row>
      <Row
        style={{
          alignItems: "center",
          justifyContent: "center",
          color: "gray",
        }}
      >
        {role[0].toUpperCase() + role.slice(1)}
      </Row>
      <Col
        style={{
          alignItems: "center",
          margin: 25,
          marginLeft: 50,
          float: "left",
        }}
      >
        <Row>
          <FaCalendarAlt size={20} />
          <p style={{ marginLeft: 10 }}>
            Joined{" "}
            {moment(currentUserDetail?.createdAt).format("MMMM DD, YYYY")}
          </p>
        </Row>
        <Row
          style={{
            textAlign: "center",
            marginTop: "-4px",
          }}
        >
          {profileDetail?.company && (
            <>
              <CgEditBlackPoint size={20} />
              <p style={{ marginLeft: 10 }}>{profileDetail?.company}</p>
            </>
          )}
        </Row>
        <Row
          style={{
            justifyContent: "right",
            textAlign: "center",
            marginTop: "-4px",
          }}
        >
          {profileDetail?.location && (
            <>
              <div className="float-right">
                <IoLocationOutline size={20} />
              </div>
              <div className="float-left">
                <p style={{ marginLeft: 10 }}>{profileDetail?.location}</p>
              </div>
            </>
          )}
        </Row>
        <Row
          style={{
            justifyContent: "flex-start",
            textAlign: "center",
            marginTop: "-4px",
          }}
        >
          {profileDetail?.phoneNumber && (
            <>
              <BiPhoneCall size={20} />
              <p style={{ marginLeft: 10 }}>+{profileDetail?.phoneNumber}</p>
            </>
          )}
        </Row>
        <Row className="mb-4">
          <Col>
            <a href={profileDetail?.social.facebook}>
              <FaFacebook size="24px" />
            </a>
          </Col>
          <Col>
            <a href={profileDetail?.social.twitter}>
              <FaTwitter size="24px" />
            </a>
          </Col>
          <Col>
            <a href={profileDetail?.social.linkedin}>
              <FaLinkedin size="24px" />
            </a>
          </Col>
        </Row>
        <Row>
          <Button
            variant="primary"
            className="profile-edit-btn"
            onClick={() => setIsVisible(true)}
          >
            <span className="mr-2">
              <MdEdit />
            </span>
            Edit
          </Button>
          <EditModal show={isVisible} hide={() => setIsVisible(false)} />
        </Row>
      </Col>
    </Container>
  );
}

export default Profile;
