import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, user_type, ...rest }) => {
  const user = useSelector((store) => store.user.user);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user && user_type.includes(user.user_type)) {
          return <Component {...props} {...rest} />;
        } else {
          return <Redirect to={{ pathname: "/*" }} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
