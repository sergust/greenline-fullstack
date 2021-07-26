import "./SignUp.styles.scss";
import React from "react";
import AuthWrapper from "../../components/AuthWrapper/AuthWrapper.component";
import SignUpWindow from "../../components/SignUpWindow/SignUpWindow.component";

const SignUp = () => {
  return (
    <div className="sign-in-wrapper">
      <AuthWrapper title="Sign Up">
        <SignUpWindow />
      </AuthWrapper>
    </div>
  );
};

export default SignUp;
