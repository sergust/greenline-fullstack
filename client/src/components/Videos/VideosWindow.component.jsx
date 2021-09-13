import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import VideoModal from "../Modal/VideoModal.component";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { listVideos } from "../../redux/actions/videoAction";
import Loader from "../Loading/Loader.component";
import "./VideosWindow.styles.scss";

function VideosWindow({ subscriber }) {
  const {
    userInfo: { role, token },
  } = useSelector((state) => state.auth);
  const { loading, videos } = useSelector((state) => state.videoList);
  const { success: deleteSuccess} = useSelector(state => state.videoDelete);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listVideos(token));
  }, [dispatch, token, deleteSuccess]);

  const handleAddVideo = () => {
    return history.push("/admin/video/add");
  };

  return (
    <>
      {!subscriber ? (
        <Container>
          <Alert variant="danger" style={{ margin: "100px" }}>
            <Alert.Heading>You are not a Subscriber</Alert.Heading>
            <hr />
            <p className="mb-0">
              Please contact the authorized personal so that they can add you to
              the subscriber list.
            </p>
          </Alert>
        </Container>
      ) : (
        <Container style={{ minHeight: "100vh" }}>
          {role === "superAdmin" && (
            <Row className="py-4" style={{ paddingRight: "40px" }}>
              <Col xs={12} className="d-flex justify-content-end">
                <Button onClick={handleAddVideo}>
                  <span>
                    <FaPlusCircle size={24} />
                  </span>
                </Button>
              </Col>
            </Row>
          )}
          <Row
            style={{ margin: "100px auto" }}
            className={
              role === "superAdmin" ? "video-container mt-3" : "video-container"
            }
          >
            {!loading &&
              videos?.map((video) => (
                <Col key={video._id} lg={4} md={6} xs={12}>
                  <VideoModal
                    description={video.title}
                    thumbnail={video.thumbnail}
                    src={video?.videoSrc.link}
                    videoId={video._id}
                  />
                </Col>
              ))}
            {loading && <Loader padding="100px" />}
          </Row>
        </Container>
      )}
    </>
  );
}

export default VideosWindow;
