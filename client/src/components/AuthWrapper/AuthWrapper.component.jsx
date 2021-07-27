import "./AuthWrapper.styles.scss";

const AuthWrapper = ({ children, title }) => {
  return (
    <div className="sign-in-wrapper">
      <h1>{title}</h1>
      <div className="sign-in">{children}</div>
    </div>
  );
};

export default AuthWrapper;
