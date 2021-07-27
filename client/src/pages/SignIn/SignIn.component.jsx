import "./SignIn.styles.scss";
import React from "react";
import AuthWrapper from "../../components/AuthWrapper/AuthWrapper.component";
import LoginWindow from "../../components/LoginWindow/LoginWindow.component";

const SignIn = () => {
  return (
    <div className="sign-in-wrapper">
      <AuthWrapper title="Login">
        <LoginWindow />
      </AuthWrapper>
    </div>
  );
};

export default SignIn;
