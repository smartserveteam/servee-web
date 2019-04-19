import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import ResetPassword from "./containers/ResetPassword";
import Settings from "./containers/Settings";
import Admin from "./containers/Admin";
import AdminNewCategory from "./containers/AdminNewCategory";
import AdminCategory from "./containers/AdminCategory";
import ChangePassword from "./containers/ChangePassword";
import ChangeEmail from "./containers/ChangeEmail";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import NotFound from "./containers/NotFound";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/login/reset" exact component={ResetPassword} props={childProps} />
    <AuthenticatedRoute path="/notes/new" exact component={NewNote} props={childProps} />
    <AuthenticatedRoute path="/notes/:id" exact component={Notes} props={childProps} />
    <AuthenticatedRoute path="/profile" exact component={Settings} props={childProps} />
    <AuthenticatedRoute path="/profile/password" exact component={ChangePassword} props={childProps} />
    <AuthenticatedRoute path="/profile/email" exact component={ChangeEmail} props={childProps} />
    <AuthenticatedRoute path="/admin" exact component={Admin} props={childProps} />
    <AuthenticatedRoute path="/admin/categories/new" exact component={AdminNewCategory} props={childProps} />
    <AuthenticatedRoute path="/admin/categories/:id" exact component={AdminCategory} props={childProps} />

    { /* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>;
