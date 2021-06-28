import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ResourceNotFound from "components/ResourceNotFound";

const ProtectedRoute = ({ component: Component, user_type, ...rest }) => {
  const user = useSelector((store) => store.user.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        // (
        //   <>
        //     {user.user_type === user_type ? (
        //       <Component {...props} />
        //     ) : (
        //       <Route
        //         path="*"
        //         component={() => {
        //           window.location.href = `${process.env.REACT_APP_WEB_HOST}/error`;
        //           return null;
        //         }}
        //       />
        //     )}
        //   </>
        // )

        {
          if (user_type.includes(user.user_type)) {
            return <Component {...props} {...rest} />;
          } else {
            return <Redirect to={{ pathname: "/*" }} />;
          }
        }
      }
    />
  );
};

export default ProtectedRoute;
