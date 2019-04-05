import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import "./App.css";
import Routes from "./Routes";
import config from "./config";

class App extends Component {

  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  loadFacebookSDK() {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: config.social.FB,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.1'
      });
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  async componentDidMount() {

    // Load the Facebook JS SDK
    this.loadFacebookSDK();

    // Load the current session
    try {
      await Auth.currentAuthenticatedUser();
      this.userHasAuthenticated(true);
    }
    catch (e) {
      if (e !== 'not authenticated') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  // Update authenticated state
  userHasAuthenticated = async authenticated => {
    this.setState({ isAuthenticated: authenticated });
    if (authenticated) {
      var user = await Auth.currentAuthenticatedUser();
      console.log("User:", user);
      var attributes = await Auth.userAttributes(user); // Gets the latest attributes
      console.log("Attributes:", attributes);
      if (!attributes.find(a => a.Name === "email_verified")) {
        console.log("Email verification is not complete");
        this.props.history.push("/profile?message=incompleteEmailVerification");
      }
      if (
          !attributes.find(a => a.Name === "address") ||
          !attributes.find(a => a.Name === "given_name") ||
          !attributes.find(a => a.Name === "family_name") ||
          !attributes.find(a => a.Name === "custom:country") ||
          !attributes.find(a => a.Name === "custom:city") ||
          !attributes.find(a => a.Name === "custom:postal_code")
      ) {
        console.log("Profile is not complete");
        this.props.history.push("/profile?message=incompleteProfile");
      }
    }
  }

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating && // Do not render until isAuthenticating is false
      <div className="App">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Servee</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <Fragment>
                  <LinkContainer to="/profile">
                    <NavItem>Profile</NavItem>
                  </LinkContainer>
                  <NavItem onClick={this.handleLogout}>Logout</NavItem>
                </Fragment>
                : <Fragment>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }

}

export default withRouter(App);
