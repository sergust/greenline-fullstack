import "./SignIn.styles.scss";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loading/Loader.component";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import AuthWrapper from "../../components/AuthWrapper/AuthWrapper.component";
import LoginWindow from "../../components/LoginWindow/LoginWindow.component";
import {Container} from 'react-bootstrap'

const SignIn = () => {
  const {auth, request, fail} = useSelector(state => state);
  const {userInfo} = auth;
  const {loading} = request;
  const {errorMsg} = fail;

  useEffect(() => {
    if(errorMsg) {
      toast(errorMsg, {
        type: 'error'
      })
    }
  }, [errorMsg]);

  const history = useHistory();
  useEffect(() => {
    if(userInfo) {
      history.push('/');
    }
  }, [history, userInfo])


  return (
    <Container fluid = 'true'>
      {loading ? <Loader/>: (
        <AuthWrapper>
        <LoginWindow />
      </AuthWrapper>
      )}
    </Container>
  );
};

export default SignIn;
