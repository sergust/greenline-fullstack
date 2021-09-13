import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { imageUpload } from "../../utils/imageUpload";
import { createVideo } from "../../redux/actions/videoAction";

const CreateVideoWindow = () => {
  const {userInfo: {token}} = useSelector(state => state.auth);
  const { loading, success} = useSelector(state => state.videoCreate);
  const [videoInfo, setVideoInfo] = useState({
    title: "",
    thumbnail: "",
    videoSrc: {
      public_id: "",
      link: "",
    },
  });
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const { title, thumbnail, videoSrc } = videoInfo;

  //dispatch
  const dispatch = useDispatch();

  const handleThumbnailUpload = async (thumbnailFile) => {
    const [thumbnail] = await imageUpload(thumbnailFile);

    setVideoInfo({
      ...videoInfo,
      thumbnail: thumbnail.url,
    });
  };

  const handleVideoUpload = async (productVideo) => {
    const formData = new FormData();

    formData.append("file", productVideo);

    formData.append("upload_preset", "amar_test_upload");
    formData.append("cloud_name", "ddvnxazw7");

    try {
      const config = {
        onUploadProgress: (progressEvent) => {
          let percent = parseInt(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          if (percent < 100) {
            setUploadPercentage(percent);
          }
        },
      };

      const { data } = await axios.post(
        process.env.REACT_APP_CLOUDINARY_URL,
        formData,
        config
      );

      setVideoInfo({
        ...videoInfo,
        videoSrc: { public_id: data.public_id, link: data.secure_url },
      });
      setUploadPercentage(100);

      //hide progress bar
      setTimeout(() => {
        setUploadPercentage(0);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    if(!title || !thumbnail || !videoSrc.link) {
      return;
    }

    dispatch(createVideo(token, videoInfo));
    setVideoInfo({
      title: "",
      thumbnail: "",
      videoSrc: {
        public_id: "",
        link: "",
      },
    });
  };

  const handleSuccess = () => {
    toast("Video Added Successfully", {
      type: "success"
    })
  }

  return (
    <Container className="px-5">
      <Link
        to="/videos"
        className="btn btn-light my-3"
        style={{ color: "#fff" }}
      >
        Go Back
      </Link>

      <h1 style={{ marginBottom: "30px" }} className="text-center">
        Add Video
      </h1>

      {uploadPercentage !== 0 && (
        <div className="mb-4">
          <p>Video Uploading...</p>
          <ProgressBar variant="success" animated now={uploadPercentage} />
        </div>
      )}

      <Form onSubmit={() => console.log("Handle Submit")}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="name"
            placeholder="Video Title"
            value={title}
            onChange={(e) =>
              setVideoInfo({ ...videoInfo, title: e.target.value })
            }
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="formFile">
          <Form.Label>Thumbnail</Form.Label>
          <Form.File
            id="image-thumbnail-file"
            label="Choose Thumbnail"
            custom
            onChange={(e) => handleThumbnailUpload(e.target.files)}
            accept="image/*"
          ></Form.File>
        </Form.Group>

        <Form.Group controlId="formFile">
          <Form.Label>Video</Form.Label>
          <Form.File
            id="video-file"
            label="Choose Video File"
            custom
            onChange={(e) => handleVideoUpload(e.target.files[0])}
            accept="video/*"
          ></Form.File>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          style={{
            float: "right",
            marginBottom: "20px",
            paddingLeft: "60px",
            paddingRight: "60px",
            fontSize: 18,
          }}
          onClick={handleAddProduct}
        >
          Submit
        </Button>
      </Form>
      {!loading && success && handleSuccess()}
    </Container>
  );
};

export default CreateVideoWindow;
