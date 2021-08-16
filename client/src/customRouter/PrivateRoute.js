import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ component: Component, ...rest }) {
  const {auth} = useSelector((state) => state);
  const { userInfo } = auth;
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}