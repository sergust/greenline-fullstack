import React, { useState } from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";
import { AiFillCamera, AiFillPicture } from "react-icons/ai";
import "./Modal.styles.scss";
import { updatePost } from "../../redux/actions/postAction";
import { useDispatch } from "react-redux";
import {toast} from "react-toastify";

function UpdatePostModal(props) {
  const [showThumbnail, setShowThumbnail] = useState(true);
  const {postPicture, postText, postId} = props;
  const [updateTextBody, setUpdateTextBody] = useState(postText);
  const [updatePostPicture, setUpdatePostPicture] = useState(postPicture);
  const dispatch = useDispatch();


  const handleSaveChange = () => {
    dispatch(updatePost({body: updateTextBody, postPicture: updatePostPicture, postId}));
    props.hide();
    toast("Post Updated Successfully!", {
      type: "success"
    })
  }

  return (
    <>
      <Modal
        scrollable
        show={props.show}
        onHide={props.hide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#05a684", color: "#ffffff" }}
        >
          <Modal.Title style={{ color: "#ffffff" }}>
            <h5>Update Post</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="formBasicCompany"
              style={{ resize: "none" }}
            >
              <Form.Control
                as="textarea"
                rows={3}
                style={{ resize: "none", border: "none" }}
                className="input-area"
                value={updateTextBody}
                onChange={(e) => setUpdateTextBody(e.target.value)}
              />
            </Form.Group>
          </Form>
          {showThumbnail ? (
            <Card
              style={{
                width: "5rem",
                border: "1px solid #00cea3",
                borderRadius: 0,
                padding: 0,
              }}
            >
              <Card.Img
                variant="top"
                src={updatePostPicture}
                value={updatePostPicture}
                style={{ borderRadius: 0, padding: 0, margin: 0 }}
              />
              <Card.Body style={{ position: "absolute", bottom: 20, left: 50 }}>
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    padding: 0,
                    borderRadius: 10,
                  }}
                >
                  <IoCloseOutline
                    size={15}
                    color="#05a684"
                    onClick={() => setShowThumbnail(false)}
                    style = {{cursor: 'pointer'}}
                  />
                </div>
              </Card.Body>
            </Card>
          ) : null}
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              marginBottom: -15,
            }}
          >
            <span style={{ marginRight: 5 }}>
              <AiFillCamera size={28} color="#00cea3" style = {{cursor: 'pointer'}} />
            </span>
            <span style={{ marginLeft: 5 }}>
              <AiFillPicture size={28} color="#00cea3" style = {{cursor: 'pointer'}} />
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#05a684", color: "#ffffff" }}
            variant="secondary"
            onClick={props.hide}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#05a684", color: "#ffffff" }}
            variant="primary"
            onClick={handleSaveChange}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdatePostModal;
