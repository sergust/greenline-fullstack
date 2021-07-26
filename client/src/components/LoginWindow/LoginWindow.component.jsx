import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginWindow = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userCredentials;

  const handleSetUserCredentials = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const login = () => {};
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
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

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleSetUserCredentials}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Form.Group>
        <Button variant="primary" onClick={login}>
          Log in
        </Button>
      </Form.Group>
      <Link to="/signup">
        <Button variant="link">Don't have an account? Sign up!</Button>
      </Link>
    </Form>
  );
};

export default LoginWindow;
