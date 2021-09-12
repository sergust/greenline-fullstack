import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ component: Component, ...rest }) => {
  const {auth} = useSelector((state) => state);
  const { userInfo } = auth;
 
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.token && userInfo.role !== "user" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default AdminRoute;