import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../redux/actions/authAction";
import {toast} from "react-toastify";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './SignUpWindow.styles.scss'
import { FAIL } from "../../redux/actions/action.types";

const SignUpWindow = () => {
  const {errorMsg} = useSelector(state => state.fail);
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isToggle, setIsToggle] = useState(false);
  const [isCPToggle, setIsCPToggle] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if(errorMsg) {
      toast(errorMsg, {
        type: 'error'
      })
    }
  }, [errorMsg]);

  const handleLogin = (e) => {
    e.preventDefault();

    if(password !== confirmPassword) {
      return dispatch({
        type: FAIL,
        payload: "Confirm password do not match"
      })
    }

    const newUser = {
      name: `${fname} ${lname}`,
      email,
      password
    }

    dispatch(register(newUser));
  };

  const handlePasswordToggle = () => {
    return setIsToggle(!isToggle);
  };

  const handleCPasswordToggle = () => {
    return setIsCPToggle(!isCPToggle);
  };


  return (
    <Form>
      <Form.Group>
        <Form.Label htmlFor="user-fname" className="my-1 ms-2" style = {{display: 'flex', margin: '4px 0px 4px 8px', fontFamily: 'sans-serif'}}>
          First Name
        </Form.Label>
        <Form.Control
          type="text"
          id="user-fname"
          placeholder="First Name"
          onChange={(e) => setFname(e.target.value)}
          value={fname}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="user-lname" className="my-1 ms-2" style = {{display: 'flex', margin: '4px 0px 4px 8px', fontFamily: 'sans-serif'}}>
          Last Name
        </Form.Label>
        <Form.Control
          type="text"
          id="user-lname"
          placeholder="Last Name"
          onChange={(e) => setLname(e.target.value)}
          value={lname}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="user-email" className="my-1 ms-2" style = {{display: 'flex', margin: '4px 0px 4px 8px', fontFamily: 'sans-serif'}}>
          Email
        </Form.Label>
        <Form.Control
          type="email"
          id="user-email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="user-password" className="my-1 ms-2" style = {{display: 'flex', margin: '4px 0px 4px 8px', fontFamily: 'sans-serif'}}>
          Password
        </Form.Label>
        <Form.Control
          type={isToggle ? "text" : "password"}
          id="user-password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <span class="pwd-toggler">
          {isToggle ? (
            <FaEyeSlash size="20" onClick={handlePasswordToggle} />
          ) : (
            <FaEye size="20" onClick={handlePasswordToggle} />
          )}
        </span>
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="user-cpassword" className="my-1 ms-2" style = {{display: 'flex', margin: '4px 0px 4px 8px', fontFamily: 'sans-serif'}}>
          Confirm Password
        </Form.Label>
        <Form.Control
          type={isCPToggle ? "text" : "password"}
          id="user-password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <span class="cpassword-toggler">
          {isCPToggle ? (
            <FaEyeSlash size="20" onClick={handleCPasswordToggle} />
          ) : (
            <FaEye size="20" onClick={handleCPasswordToggle} />
          )}
        </span>
      </Form.Group>

      <Button onClick={handleLogin}>Sign Up</Button>
      <Link to="/login">
        <p style = {{color: '#05a684', marginTop: 10, textAlign: 'center'}}>Already have an account? Login!</p>
      </Link>
    </Form>
  );
};

export default SignUpWindow;
