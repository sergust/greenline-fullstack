import React, { useEffect } from "react";
import { Row, Col, Container, Alert } from "react-bootstrap";
import "./Profile.styles.scss";
import Announcement from "../Announcement/Announcement.component";
import Header from "../Header/Header.component";
import Footer from "../Footer/Footer.component";
import Profile from '../Profile/Profile.component'
import { useSelector, useDispatch } from "react-redux";
import { getProfilePost } from "../../redux/actions/profileAction";


function ProfileWindow() {
  const dispatch = useDispatch();
  const {posts} = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(getProfilePost(0, 5));
  }, [dispatch]);


  return (
    <Container fluid="true" style={{ overflow: "hidden" }}>
      <Header />
      <Row>
        <Col lg="3" className=" my-4">
          <Profile />
        </Col>
        <Col lg="9" className=" my-4 mx-auto">
          <Container>
            {posts.length > 0 ? (
              <>
              <Row style = {{ marginLeft: '42px', color: 'gray', fontWeight: 600}}>Announcements</Row>
              <Row>
                <Announcement />
              </Row>
              </>
            ) : (
              <Alert variant="warning">
                <Alert.Heading>Announcement</Alert.Heading>
                <hr />
                <p className="mb-0">
                  Hey, it seems like there is no any announcement yet...
                </p>
              </Alert>
            )}
          </Container>
        </Col>
      </Row>
      <Row className="footer">
        <Footer />
      </Row>
    </Container>
  );
}

export default ProfileWindow;
