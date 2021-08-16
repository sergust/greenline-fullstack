import React, {useEffect, useRef} from "react";
import Post from "../../components/Post/Post.component";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.component";
import FindPeople from "../../components/FindPeople/FindPeople";
import ShareThoughts from "../../components/ShareThoughts/ShareThoughts.component";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify";
import { getPosts } from "../../redux/actions/postAction";

const Feed = () => {
  const {auth} = useSelector(state => state);
  const { loading, posts} = useSelector(state => state.homePosts );
  const {errorMsg} = useSelector(state => state.fail);
  const { userInfo: {role} } = auth;
  const limit = useRef(5);
  const skip = useRef(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts(skip.current, limit.current));
  }, [dispatch])

  useEffect(() => {
    if(errorMsg) {
      toast(errorMsg, {
        type: 'error'
      })
    }
  }, [errorMsg]);


  return (
    <div style={{ overflow: "hidden", textAlign: 'center' }}>
      <Row>
        <Col lg="7">
          {role === "admin" && <ShareThoughts />}
          {posts.map((post) => {
            return <Post {...post} key={post._id} />;
          })}
        </Col>
        <Col lg="5">
          <FindPeople />
        </Col>
      </Row>
      <LoadMoreBtn skip={skip.current} limit={limit.current} />
    </div>
  );
  
}
export default Feed;
