import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaFacebookSquare, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileUser } from "../../redux/actions/profileAction";
import "./Modal.styles.scss";
import {toast} from "react-toastify";

function EditModal(props) {
  const { users } = useSelector((state) => state.profile);
  const userProfile = users[0];
  const { currentUserDetail } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if(currentUserDetail?._id.length !== 0) {
      setFormData({
        ...userProfile,
        createdAt: currentUserDetail?.createdAt,
        user: {
          name: currentUserDetail?.name,
          _id: currentUserDetail?._id,
          avatar: currentUserDetail?.avatar,
        },
      });
    }
  }, [currentUserDetail,userProfile, users.length, currentUserDetail?._id.length]);

  const handleSaveChange = () => {
    const {phoneNumber, social} = formData;
    if(!phoneNumber) {
      return toast('Phone number cannot be empty', {type: 'error'});
    }

    if(!social) {
      return toast('Social Link cannot be empty', {type: 'error'})
    }
    dispatch(updateProfileUser(formData));
    props.hide();
  };

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
            <h5>Edit Your Profile</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                plaintext
                readOnly
                defaultValue={currentUserDetail?.name}
                style={{ borderBottom: "1px solid #ececec" }}
                className="input-area"
              />
            </Form.Group>
            {currentUserDetail?.role === "admin" && (
              <Form.Group className="mb-3" controlId="formBasicCompany">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  plaintext
                  placeholder="Company"
                  style={{ borderBottom: "1px solid #ececec" }}
                  className="input-area"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="formBasicCompany">
              <Form.Label>Location</Form.Label>
              <Form.Control
                plaintext
                placeholder="Location"
                style={{ borderBottom: "1px solid #ececec" }}
                className="input-area"
                value={formData?.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCompany">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="10-digit number (unique)"
                style={{ borderBottom: "1px solid #ececec" }}
                className="input-area"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCompany"
              style={{ resize: "none" }}
            >
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                style={{ resize: "none" }}
                placeholder="Short Bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCompany"
              style={{ resize: "none" }}
            >
              <Form.Label>
                <FaFacebookSquare size={20} color="#4267B2" />
              </Form.Label>
              <Form.Control
                plaintext
                placeholder="Facebook link*"
                className="input-area"
                style={{ borderBottom: "1px solid #ececec" }}
                value={formData.social?.facebook}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    social: { ...formData["social"], facebook: e.target.value },
                  })
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCompany"
              style={{ resize: "none" }}
            >
              <Form.Label>
                <FaLinkedin size={20} color="#2867B2" />
              </Form.Label>
              <Form.Control
                plaintext
                placeholder="Linkedin link"
                style={{ borderBottom: "1px solid #ececec" }}
                className="input-area"
                value={formData.social?.linkedin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    social: { ...formData["social"], linkedin: e.target.value },
                  })
                }
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCompany"
              style={{ resize: "none" }}
            >
              <FaTwitter size={20} color="#1DA1F2" />
              <Form.Control
                plaintext
                placeholder="Twitter link"
                style={{ borderBottom: "1px solid #ececec" }}
                className="input-area"
                value={formData.social?.twitter}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    social: { ...formData["social"], twitter: e.target.value },
                  })
                }
              />
            </Form.Group>
          </Form>
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

export default EditModal;
