import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  FormGroup, FormControl,
  HelpBlock,
  ControlLabel, Button,
  ToggleButtonGroup, ToggleButton,
  Modal,
  ListGroupItem,
  ButtonToolbar
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Settings.css";
import { API, Auth } from "aws-amplify";
import config from "../config";

const professional = config.fields.professional;
const individual = config.fields.individual;

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.handleShowSkills = this.handleShowSkills.bind(this);
    this.handleCloseSkills = this.handleCloseSkills.bind(this);
    this.handleSaveSkills = this.handleSaveSkills.bind(this);

    this.state = {
      isLoading: false,
      type: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postal_code: "",
      state: "",
      country: "",
      showSkills: false,
      skills: [],
      userSkills: []
    };
  }

  async componentDidMount() {
    // Get user info
    var userInfo = await Auth.currentUserInfo();
    console.log("User Info:", userInfo);

    this.setState({ firstName: userInfo.attributes[config.cognito.attributes.firstName] || "" });
    this.setState({ lastName: userInfo.attributes[config.cognito.attributes.lastName] || "" });
    this.setState({ address: userInfo.attributes[config.cognito.attributes.address] || "" });
    this.setState({ postal_code: userInfo.attributes[config.cognito.attributes.postalCode] || "" });
    this.setState({ city: userInfo.attributes[config.cognito.attributes.city] || "" });
    this.setState({ state: userInfo.attributes[config.cognito.attributes.state] || "" });
    this.setState({ country: userInfo.attributes[config.cognito.attributes.country] || "" });
    this.setState({ type: userInfo.attributes[config.cognito.attributes.type] || ""});
    this.setState({ userSkills: (userInfo.attributes[config.cognito.attributes.skills] ? userInfo.attributes[config.cognito.attributes.skills].split(",") : userInfo.attributes[config.cognito.attributes.skills]) || ""});

    if (this.state.type === professional) {
      const skills = await this.skills();
      console.log("Skills:", skills);
      this.setState({ skills });
    }
  }

  //#region Skills Modal

  handleCloseSkills() {
    this.setState({ showSkills: false });
  }

  handleShowSkills() {
    this.setState({ showSkills: true });
  }

  handleSaveSkills(e) {
    this.setState({ userSkills: e });
    Auth.currentAuthenticatedUser().then((user) => {
      return Auth.updateUserAttributes(user, { 'custom:skills': e.join(",")})
    }).then((data) => console.log("Set Skills:", data))
    .catch((err) => console.error("Set Skills:", err));
  }

  skills() {
    return API.get("categories", "/categories");
  }

  renderSkillsList(skills) {
    console.log("All Skills:", skills);
    return [{}].concat(skills).map(
      (skill, i) =>
        i !== 0
          ? 
          <ToggleButton key={skill.categoryId} value={skill.categoryId}>{skill.label}</ToggleButton>
          : <LinkContainer key="new" to="/skills/new">
              <ListGroupItem>
                <h4 className="text-primary">
                  <b>{"\uFF0B"}</b> Request a new skill to be added to this list
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }

  renderSkills() {
    console.log("User Skills:", this.state.userSkills);
    return (
      <div className="skills">
          <ButtonToolbar>
            <ToggleButtonGroup type="checkbox" onChange={this.handleSaveSkills} value={this.state.userSkills} >
              {!this.state.isLoading && this.renderSkillsList(this.state.skills)}
            </ToggleButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }

  //#endregion

  //#region Individual Form

  renderIndividualForm() {
    return (
      <div className="Signup">
        <hr />
        <form onSubmit={this.handleSubmit}>
          <HelpBlock>
            All fields with (<span className="text-danger">*</span>) are required
          </HelpBlock>
            <ToggleButtonGroup type="radio" name="type" value={this.state.type} onChange={this.handleTypeChange}>
              <ToggleButton className="btn-primary" value={individual}>Individual</ToggleButton>
              <ToggleButton className="btn-primary" value={professional}>Professional</ToggleButton>
            </ToggleButtonGroup>
            <hr/>
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
          <FormGroup controlId="postal_code" bsSize="large">
            <ControlLabel>Postal Code</ControlLabel>
            <span className="text-danger"> *</span><FormControl type="text" value={this.state.postal_code} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="city" bsSize="large">
            <ControlLabel>City</ControlLabel>
            <span className="text-danger"> *</span><FormControl type="text" value={this.state.city} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="state" bsSize="large">
            <ControlLabel>State</ControlLabel>
            <FormControl type="text" value={this.state.state} onChange={this.handleChange} />
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

  //#endregion Individual Form

  //#region Professional Form

  renderProfessionalForm() {
    return (
      <div className="Signup">
        <hr />
        <form onSubmit={this.handleSubmit}>
          <HelpBlock>
            All fields with (<span className="text-danger">*</span>) are required
          </HelpBlock>
            <ToggleButtonGroup type="radio" name="type" value={this.state.type} onChange={this.handleTypeChange}>
              <ToggleButton bsStyle="primary" value={individual}>Individual</ToggleButton>
              <ToggleButton bsStyle="primary" value={professional}>Professional</ToggleButton>
            </ToggleButtonGroup>
            <hr/>
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
          <FormGroup controlId="postal_code" bsSize="large">
            <ControlLabel>Postal Code</ControlLabel>
            <span className="text-danger"> *</span><FormControl type="text" value={this.state.postal_code} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="city" bsSize="large">
            <ControlLabel>City</ControlLabel>
            <span className="text-danger"> *</span><FormControl type="text" value={this.state.city} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="state" bsSize="large">
            <ControlLabel>State</ControlLabel>
            <FormControl type="text" value={this.state.state} onChange={this.handleChange} />
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
          <FormGroup controlId="skills" bsSize="large">
            <Button bsStyle="info" bsSize="large" onClick={this.handleShowSkills}>
              Skills
            </Button>
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

          <Modal show={this.state.showSkills} onHide={this.handleCloseSkills}>
            <Modal.Header closeButton>
              <Modal.Title>Your Skills</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Show skills here */}
              {this.renderSkills()}
            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="primary" onClick={this.handleCloseSkills}>Close</Button>
            </Modal.Footer>
          </Modal>
        </form>
      </div>
    );
  }

  //#endregion

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
    console.log("Event:", event);
    console.log("setState:" + event.target.id + ":" + event.target.value);
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleTypeChange = event => {
    console.log("type changed to", event);
    this.setState({
      type: event
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
      'custom:country': this.state.country,
      'custom:type': this.state.type
    }).then(result => {
      this.setState({ isLoading: false });
      this.props.history.push("/");
    }).catch(err => console.error(err));

    this.setState({ isLoading: false });
  }

  render() {
    return (
      <div>
        {
          this.state.type === professional ?
          (
            this.renderProfessionalForm()
          )
          :
          (
            this.renderIndividualForm()
          )
        }
      </div>
    )
  }
}
