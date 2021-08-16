import "./SignUp.styles.scss";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import AuthWrapper from "../../components/AuthWrapper/AuthWrapper.component";
import SignUpWindow from "../../components/SignUpWindow/SignUpWindow.component";
import {Container} from 'react-bootstrap'

const SignUp = () => {
  const { userInfo } = useSelector(state => state.auth);
  const history = useHistory();

  useEffect(() => {
    if(userInfo?.token) {
      return history.push("/");
    }
  }, [userInfo?.token, history])

  return (
    <Container fluid = 'true'>
      <AuthWrapper>
        <SignUpWindow />
      </AuthWrapper>
    </Container>
  );
};

export default SignUp;
