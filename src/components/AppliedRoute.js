import React from "react";
import { Route } from "react-router-dom";

// component: component that will be rendered when a matching route is found
export default ({ component: C, props: cProps, ...rest }) =>
  // Create a component that returns a Route and takes a component and childProps prop
  // Allows us to pass in the component we want rendered and the props that we want applied
  // Inline function takes the component (C) and childProps (cProps) and render inside our Route. props is what the Route component passes us. cProps is the childProps that we want to set.
  <Route {...rest} render={props => <C {...props} {...cProps} />} />;
