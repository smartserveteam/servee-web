import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { HelpBlock, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Settings.css";
import { Auth } from "aws-amplify";

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postal_code: "",
      state: "",
      country: ""
    };
  }

  async populateUserInformation() {

    console.log("Getting current user info");
    // Get user info
    var userData = await Auth.currentUserInfo();

    console.log(userData);
    this.setState({ firstName: userData.attributes.given_name || "" });
    this.setState({ lastName: userData.attributes.family_name || "" });
    this.setState({ address: userData.attributes.address || "" });
    this.setState({ city: userData.attributes["custom:city"] || "" });
    this.setState({ postal_code: userData.attributes["custom:postal_code"] || "" });
    this.setState({ state: userData.attributes["custom:state"] || "" });
    this.setState({ country: userData.attributes["custom:country"] || "" });
  }

  async componentDidMount() {
    this.populateUserInformation();
  }

  validateForm() {
    return (
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0 &&
      this.state.address.length > 0 &&
      this.state.city.length > 0 &&
      this.state.postal_code.length > 0 &&
      this.state.country.length > 0
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    var user = await Auth.currentAuthenticatedUser();
    Auth.updateUserAttributes(user, {
      'given_name': this.state.firstName,
      'family_name': this.state.lastName,
      'address': this.state.address,
      'custom:city': this.state.city,
      'custom:state': this.state.state,
      'custom:postal_code': this.state.postal_code,
      'custom:country': this.state.country
    }).then(result => {
      this.setState({ isLoading: false });
      this.props.history.push("/");
    }).catch(err => console.error(err));
  }

  render() {
    return (
      <div className="Signup">
        <hr />
        <form onSubmit={this.handleSubmit}>
          <HelpBlock>
            All fields with (<span className="text-danger">*</span>) are required
          </HelpBlock>
          <FormGroup controlId="firstName" bsSize="large">
            <ControlLabel>First Name</ControlLabel>
            <span className="text-danger"> *</span><FormControl autoFocus type="text" value={this.state.firstName} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="lastName" bsSize="large">
            <ControlLabel>Last Name</ControlLabel>
            <span className="text-danger"> *</span><FormControl type="text" value={this.state.lastName} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="address" bsSize="large">
            <ControlLabel>Address</ControlLabel>
            <span className="text-danger"> *</span><FormControl type="text" value={this.state.address} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="city" bsSize="large">
            <ControlLabel>City</ControlLabel>
            <span className="text-danger"> *</span><FormControl type="text" value={this.state.city} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="state" bsSize="large">
            <ControlLabel>State</ControlLabel>
            <FormControl type="text" value={this.state.state} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="postal_code" bsSize="large">
            <ControlLabel>Postal Code</ControlLabel>
            <span className="text-danger"> *</span><FormControl type="text" value={this.state.postal_code} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="country" bsSize="large">
            <ControlLabel>Country</ControlLabel>
            <span className="text-danger"> *</span><FormControl type="text" value={this.state.country} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <LinkContainer to="/profile/email">
              <LoaderButton block bsSize="large" text="Change Email" />
            </LinkContainer>
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <LinkContainer to="/profile/password">
              <LoaderButton block bsSize="large" text="Change Password" />
            </LinkContainer>
          </FormGroup>

          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Save"
            loadingText="Saving…"
          />
        </form>
      </div>
    );
  }
}
