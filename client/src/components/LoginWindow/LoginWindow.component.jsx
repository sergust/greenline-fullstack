import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./LoginWindow.styles.scss";
import { login } from "../../redux/actions/authAction";

const LoginWindow = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isToggle, setIsToggle] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const handlePasswordToggle = () => {
    return setIsToggle(!isToggle);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label
          htmlFor="user-email"
          className="my-1 ms-2"
          style={{
            display: "flex",
            margin: "4px 0px 4px 8px",
            fontFamily: "sans-serif",
          }}
        >
          Email
        </Form.Label>
        <Form.Control
          type="email"
          id="user-email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Label
          htmlFor="user-password"
          className="my-1 ms-2"
          style={{
            display: "flex",
            margin: "4px 0px 4px 8px",
            fontFamily: "sans-serif",
          }}
        >
          Password
        </Form.Label>
        <Form.Control
          type={isToggle ? "text" : "password"}
          id="user-password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <span className="password-toggler">
          {isToggle ? (
            <FaEyeSlash size="20" onClick={handlePasswordToggle} />
          ) : (
            <FaEye size="20" onClick={handlePasswordToggle} />
          )}
        </span>
        <span className="forget-password-text my-1">Forgot your password?</span>
      </Form.Group>

      <Button onClick={handleLogin}>Sign In</Button>
      <Link to="/signup">
        <p style={{ color: "#05a684", marginTop: 10, textAlign: "center" }}>
          Don't have an account? Sign up!
        </p>
      </Link>
    </Form>
  );
};

export default LoginWindow;
