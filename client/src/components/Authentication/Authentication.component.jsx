import React, { Fragment } from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import "./Authentication.styles.scss";
import { Button } from "react-bootstrap";

const Authentication = ({
  auth: { isAuthenticated, loading, user },
  logout,
}) => {
  const authContent = (
    <div>
      {user && <div className="auth-name">Hi, {user.name}!</div>}
      <Button
        className="auth-logout cursor-pointer"
        variant="link"
        onClick={logout}
      >
        Log out
      </Button>
    </div>
  );

  const guestContent = (
    <div>
      <Link className="auth-logout" to="/login">
        Log in
      </Link>
    </div>
  );

  return (
    <Row className="authentication" noGutters>
      {!loading && user && (
        <Fragment>{isAuthenticated ? authContent : guestContent}</Fragment>
      )}
    </Row>
  );
};

Authentication.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Authentication);
