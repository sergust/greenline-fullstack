import React, { useState } from "react";
import { Row, Col, Button} from "react-bootstrap";
import InitialsRound from "../InitialsRound/InitialsRound.component";
import "./ShareThoughts.styles.scss";
import { AiFillCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/actions/postAction";
import { imageUpload } from "../../utils/imageUpload";

function ShareThoughts() {
  const { currentUserDetail } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [thoughts, setThoughts] = useState("");
  const [postImage, setPostImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (img) => {
    setIsUploading(true);
    const [response] = await imageUpload(img);
    setPostImage(response.url);
    setIsUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      body: thoughts,
      postPicture: `${postImage}`,
    };

    dispatch(createPost(newPost, currentUserDetail));

    setThoughts("");
    setPostImage("");
  };

  return (
    <Row className="post-row">
      <Col className="post">
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <div style={{ display: "flex" }}>
            <InitialsRound
              initials={currentUserDetail?.name[0]}
              iWidth="44px"
              iHeight="44px"
              bgColor="#2dcea3"
            />
            <div
              style={{
                margin: "auto 10px",
                textAlign: "left",
              }}
            >
              <div style={{ color: "#2dcea3", fontWeight: "600" }}>
                {currentUserDetail?.name}
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex" }} className="my-2 text-right">
          <textarea
            value={thoughts}
            rows={5}
            cols={500}
            name="message"
            placeholder="Share Your Thoughts.."
            className="text-input"
            onChange={(e) => setThoughts(e.target.value)}
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="mt-3"
        >
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={(e) => handleImageUpload(e.target.files)}
          />
          <label htmlFor="icon-button-file" className="mb-0">
            <div className="camera-btn">
              <AiFillCamera
                size={20}
                color="#ffffff"
                style={{ display: "flex" }}
              />
            </div>
          </label>
          {isUploading && ( <span
            className="text-success font-weight-bold"
          >
            {isUploading ? "Uploading..." : ""}
          </span>)}
          <span className="text-info font-weight-bold" style={{display: `${!postImage ? 'none': 'block'}`}}>
            {postImage && "Image Uploaded!"}
          </span>
          <Button className="share-btn" onClick={handleSubmit} type="submit">
            Share
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default ShareThoughts;
