import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignUpWindow = () => {
  const [userCredentials, setUserCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { firstName, lastName, email, password, confirmPassword } =
    userCredentials;

  const handleSetUserCredentials = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const signUp = () => {};
  return (
    <Form>
      <Form.Group className="mb-3" controlId="first-name">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="firstName"
          name="firstName"
          placeholder="First name"
          value={firstName}
          onChange={handleSetUserCredentials}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="last-name">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="lastName"
          name="lastName"
          placeholder="Last name"
          value={lastName}
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
          onChange={handleSetUserCredentials}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirm-password">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleSetUserCredentials}
        />
      </Form.Group>

      <Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form.Group>
      <Form.Group>
        <Link to="/signin">
          <Button variant="link" onClick={signUp}>
            Have an account? Log in!
          </Button>
        </Link>
      </Form.Group>
    </Form>
  );
};

export default SignUpWindow;
