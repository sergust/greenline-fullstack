import React, { useState, useEffect } from "react";
import { Row, Col, Image, Container, Button, Form } from "react-bootstrap";
import {
  FaCalendarAlt,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { CgEditBlackPoint } from "react-icons/cg";
import { IoLocationOutline } from "react-icons/io5";
import { BiPhoneCall } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import EditModal from "../Modal/EditModal.component";
import { loadUser } from "../../redux/actions/authAction";
import { MdCameraAlt } from "react-icons/md";
import { changeAvatar } from "../../redux/actions/profileAction";
import { imageUpload } from "../../utils/imageUpload";
import { toast } from "react-toastify";
import "./Profile.styles.scss";

let initial = true;

function Profile() {
  const { users } = useSelector((state) => state.profile);
  const {
    userInfo: { role, token, userId },
    currentUserDetail,
  } = useSelector((state) => state.auth);
  const {error, success} = useSelector(state => state.avatarChange);
  const [profileDetail] = users;
  const [isVisible, setIsVisible] = useState(false);
  const [changed, setChanged] = useState(false);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, success]);

  const handleChangePass = () => {
    return history.push("/change/password");
  };

  const handleChangeProfile = async (pf) => {
    if(pf.length === 0) return;

    const [response] = await imageUpload(pf);
    const userData = {
      userId,
      avatarUrl: response.url
    }

    dispatch(changeAvatar(token, userData));

    setTimeout(() => {
      setChanged(true);
    }, 1)
  };

  const handleSuccess = () => {
    if(!changed || !initial) return;
    toast('Profile changed success!', {
      type: 'success'
    })
    initial = false;
  }

  const handleError = () => toast('Error changing profile...', {
    type: 'error'
  })

  return (
    <Container>
      <Row
        style={{ alignItems: "center", justifyContent: "center" }}
        className="position-relative"
      >
        <Image
          roundedCircle
          src={currentUserDetail?.avatar}
          style={{ width: 200, height: 200 }}
        />
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>
            <span
              className="profile-camera-icon position-absolute"
            >
              <MdCameraAlt size={24} />
            </span>
          </Form.Label>
          <Form.Control type="file" style={{ display: "none" }} onChange={e => handleChangeProfile(e.target.files)}/>
        </Form.Group>
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
          <Col sm={3}>
            <Button
              variant="primary"
              className="profile-edit-btn"
              onClick={() => setIsVisible(true)}
            >
              Edit
            </Button>
            <EditModal show={isVisible} hide={() => setIsVisible(false)} />
          </Col>
          <Col sm={9}>
            <Button variant="primary" onClick={handleChangePass}>
              Change password
            </Button>
          </Col>
        </Row>
      </Col>
      {handleSuccess()}
      {error && handleError()}
    </Container>
  );
}

export default Profile;