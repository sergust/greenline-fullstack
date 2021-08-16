import React, {useEffect} from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./AdminProfile.styles.scss";
import Announcement from "../Announcement/Announcement.component";
import Members from "../Members/Members.component";
import ShareThoughts from "../ShareThoughts/ShareThoughts.component";
import Header from "../Header/Header.component";
import Footer from "../Footer/Footer.component";
import Profile from "../Profile/Profile.component";
import { useDispatch, useSelector } from "react-redux";
import { getProfilePost } from "../../redux/actions/profileAction";

function AdminProfileWindow() {
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
            <Row style = {{marginBottom: 15, marginLeft: '42px', color: 'gray', fontWeight: 600}}>Members</Row>
            <Row>
              <Members />
              <Members />
              <Members />
            </Row>
            <Row style = {{marginTop: 20}}>
              <ShareThoughts />
            </Row>
            <Row style = {{ marginLeft: '42px', color: 'gray', fontWeight: 600, marginTop: 35}}>Announcements</Row>
            <Row>
              {posts.map(post => (
                <Announcement key={post._id} post={post} />
              ))}
            </Row>
          </Container>
        </Col>
      </Row>
      <Row className="footer">
        <Footer />
      </Row>
    </Container>
  );
}

export default AdminProfileWindow;
