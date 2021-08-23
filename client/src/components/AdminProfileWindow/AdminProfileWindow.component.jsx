import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import "./AdminProfile.styles.scss";
import Announcement from "../Announcement/Announcement.component";
import Members from "../Members/Members.component";
import ShareThoughts from "../ShareThoughts/ShareThoughts.component";
import Header from "../Header/Header.component";
import Footer from "../Footer/Footer.component";
import Profile from "../Profile/Profile.component";
import { useDispatch, useSelector } from "react-redux";
import { getMembers, addMembers } from "../../redux/actions/profileAction";
import { IoAddCircleSharp, IoCheckmarkCircleSharp } from "react-icons/io5";
import { toast } from "react-toastify";

function AdminProfileWindow() {
  const dispatch = useDispatch();
  const { posts, users, members } = useSelector((state) => state.profile);
  const { fail } = useSelector(state => state);

  const [memberId, setMemberId] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (users?.length !== 0) {
      dispatch(getMembers(users[0].following));
    }
  }, [users, dispatch]);

  useEffect(() => {
    if(fail?.errorMsg) {
      return toast(fail.errorMsg, {type: 'error'});
    }
  }, [fail?.errorMsg])


  const handleAddMember = () => {
    if(!memberId) return;
    dispatch(addMembers(memberId));
    setShow(!show);
    setMemberId("");
  }

  return (
    <Container fluid="true" style={{ overflow: "hidden" }}>
      <Header />
      <Row>
        <Col lg="3" className=" my-4">
          <Profile />
        </Col>
        <Col lg="9" className=" my-4 mx-auto">
          <Container>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "gray",
                fontWeight: 600,
                marginLeft: "42px",
                marginRight: "42px",
              
              }}
            >
              <p>Members</p>
              <div
                style={{
                  display: "flex",
                }}
              >
                {show ? (
                  <Form>
                    <Form.Group style = {{width: '280px', height: '18px'}}>
                      <Form.Control
                      placeholder="Member Id"
                      value={memberId}
                      onChange={(e) => setMemberId(e.target.value)}
                      style = {{borderColor: '#05a684'}}
                      />
                    </Form.Group>
                  </Form>
                ) : null}
                {!show ? (
                  <IoAddCircleSharp
                    size={30}
                    color="#05a684"
                    onClick={() => setShow(true)}
                  />
                ) : (
                  <IoCheckmarkCircleSharp size={30} color="#05a684" onClick={handleAddMember} style = {{marginLeft: '15px'}} />
                )}

              </div>
            </div>
            <Row>
              {members.map((m) => (
                <Members key={m._id} member={m} />
              ))}
            </Row>
            <Row>
              <ShareThoughts />
            </Row>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "gray",
                fontWeight: 600,
                marginLeft: "42px",
                marginRight: "42px",
                marginTop: "15px",
                marginBottom: "-12px",
              }}
            >
              <p>Announcements</p>
            </div>
            <Row>
              {posts.map((post) => {
                return <Announcement key={post._id} post={post} />;
              })}
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
