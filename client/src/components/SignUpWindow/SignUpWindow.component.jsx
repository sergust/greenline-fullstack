import { Button, Form } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const SignUpWindow = ({ setAlert, register, isAuthenticated }) => {
  const [userCredentials, setUserCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = userCredentials;

  const handleSetUserCredentials = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  // Redirect after logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="input"
          name="name"
          placeholder="Name"
          value={name}
          required
          onChange={handleSetUserCredentials}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          required
          onChange={handleSetUserCredentials}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          required
          onChange={handleSetUserCredentials}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirm-password">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          required
          onChange={handleSetUserCredentials}
        />
      </Form.Group>

      <Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form.Group>
      <Form.Group>
        <Link to="/login">
          <Button variant="link">Have an account? Log in!</Button>
        </Link>
      </Form.Group>
    </Form>
  );
};

SignUpWindow.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(SignUpWindow);
