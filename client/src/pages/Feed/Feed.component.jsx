import React, { useEffect, useRef } from "react";
import Post from "../../components/Post/Post.component";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.component";
import ShareThoughts from "../../components/ShareThoughts/ShareThoughts.component";
import { Row, Col, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getPosts } from "../../redux/actions/postAction";

const Feed = () => {
  const { auth } = useSelector((state) => state);
  const { posts } = useSelector((state) => state.homePosts);
  const { errorMsg } = useSelector((state) => state.fail);
  const {
    userInfo: { role },
  } = auth;
  const limit = useRef(5);
  const skip = useRef(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts(skip.current, limit.current));
  }, [dispatch]);

  useEffect(() => {
    if (errorMsg) {
      toast(errorMsg, {
        type: "error",
      });
    }
  }, [errorMsg]);

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col lg="6">
          {(role === "admin" || role === "superAdmin") && <ShareThoughts />}
          {posts.map((post) => {
            return <Post {...post} key={post._id} />;
          })}
          {role !== "admin" && posts.length === 0 && (
            <Alert variant="warning" className="my-4 py-4">
              {" "}
              <Alert.Heading>
                Hey, looks like nobody posted yet
              </Alert.Heading>{" "}
              <p>Have Patience, Admin might be posting soon!</p>{" "}
            </Alert>
          )}
          <Row className="justify-content-center">
            <LoadMoreBtn skip={skip.current} limit={limit.current} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Feed;
