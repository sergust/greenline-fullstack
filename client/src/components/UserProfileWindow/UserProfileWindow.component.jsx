import React from "react";
import { Row, Col, Container, Alert, ListGroup } from "react-bootstrap";
import "./Profile.styles.scss";
import Announcement from "../Announcement/Announcement.component";
import Header from "../Header/Header.component";
import Footer from "../Footer/Footer.component";
import Profile from "../Profile/Profile.component";
import { useSelector } from "react-redux";

function ProfileWindow() {
  const { posts } = useSelector((state) => state.profile);

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
                <Row
                  style={{ marginLeft: "42px", color: "gray", fontWeight: 600 }}
                >
                  Announcements
                </Row>
                <Row>
                  {posts.map((post) => {
                    return <Announcement key={post._id} post={post} />;
                  })}
                </Row>
              </>
            ) : (
              <Alert variant="warning">
                <Alert.Heading>No Announcement</Alert.Heading>
                <hr />
                <p>
                  To see announcement you must fulfill following requirements
                </p>
                <ListGroup>
                  <ListGroup.Item>Complete your user profile</ListGroup.Item>
                  <ListGroup.Item>
                    Added to the memberlist of your organization
                  </ListGroup.Item>
                </ListGroup>
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
