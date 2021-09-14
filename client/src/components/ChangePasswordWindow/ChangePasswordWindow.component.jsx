import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { logout, changePassword } from "../../redux/actions/authAction";
import { Fragment } from "react";

const ChangePasswordWindow = () => {
  const [userCredential, setUserCredential] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const {
    userInfo: { token, userId },
  } = useSelector((state) => state.auth);
  const { errorMsg, success } = useSelector((state) => state.passwordChange);

  const dispatch = useDispatch();

  const handleError = () => {
    toast("Unable to change password", { type: "error" });
    return;
  };

  const handleSuccess = () => {
    toast("Password Changed Successfully", { type: "success" });
    return;
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = userCredential;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast("Required Field cannot be empty", {
        type: "info",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast("Confirm Password do not match", {
        type: "error",
      });
      return;
    }

    const userData = {
      userId,
      oldPassword: currentPassword,
      newPassword,
    };

    dispatch(changePassword(token, userData));

    setUserCredential({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setTimeout(() => {
      return dispatch(logout());
    }, [2000]);
  };

  return (
    <Fragment>
      <Form style={{padding: "7%"}}>
        <Form.Group as={Row} className="mb-3" controlId="currentPassword">
          <Form.Label column sm="2">
            Current Password
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="password"
              placeholder="Current Password"
              onChange={(e) =>
                setUserCredential({
                  ...userCredential,
                  currentPassword: e.target.value,
                })
              }
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="newPassword">
          <Form.Label column sm="2">
            New Password
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="password"
              placeholder="New Password"
              onChange={(e) =>
                setUserCredential({
                  ...userCredential,
                  newPassword: e.target.value,
                })
              }
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="confirmPassword">
          <Form.Label column sm="2">
            Confirm Password
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={(e) =>
                setUserCredential({
                  ...userCredential,
                  confirmPassword: e.target.value,
                })
              }
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col>
            <Button
              variant="primary"
              type="submit"
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </Col>
        </Form.Group>
      </Form>
      {success && handleSuccess()}
      {errorMsg && handleError()}
    </Fragment>
  );
};

export default ChangePasswordWindow;
