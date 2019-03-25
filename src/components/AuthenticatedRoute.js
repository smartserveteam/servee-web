import React from "react";
import { Route, Redirect } from "react-router-dom";

// If user is not logged in, redirect to login and remember which page the user was on
export default ({ component: C, props: cProps, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      cProps.isAuthenticated
        ? <C {...props} {...cProps} />
        : <Redirect
          to={`/login?redirect=${props.location.pathname}${props.location.search}`}
        />}
  />;
