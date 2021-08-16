import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../redux/actions/authAction";

export default function SubscriberRoute({ component: Component, ...rest }) {
  const {auth} = useSelector((state) => state);
  const { userInfo, currentUserDetail } = auth;
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch]);

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.token && currentUserDetail?.role === "admin" ? (
          <Component {...props} subscriber={true} />
        ) : (
          <Component subscriber={false} />
        )
      }
    />
  );
}