import React, { useState } from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";
import { AiFillCamera, AiFillPicture } from "react-icons/ai";
import "./Modal.styles.scss";

function CreatePostModal(props) {
  const [showThumbnail, setShowThumbnail] = useState(true);
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
                src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
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
            onClick={props.hide}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreatePostModal;
