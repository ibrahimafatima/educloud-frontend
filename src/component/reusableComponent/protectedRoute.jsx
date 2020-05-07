import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  path,
  currentUser,
  component: Component,
  render
}) => {
  return (
    <Route
      path={path}
      render={props => {
        if (currentUser) return <Redirect to="/dashboard" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
