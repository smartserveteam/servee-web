import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./AdminNewCategory.css";
import { API } from "aws-amplify";

export default class AdminNewCategory extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      label: ""
    };
  }

  validateForm() {
    return this.state.label.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {

      // Create the new category
      await this.createCategory({
        label: this.state.label,
        createdAt: Date.now()
      });

      // Go back to admin page
      this.props.history.push("/admin");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  // POST /categories with category object
  createCategory(category) {
    return API.post("categories", "/categories", {
      body: category
    });
  }

  render() {
    return (
      <div className="NewCategory">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="label">
          <ControlLabel>Category Name</ControlLabel>
          <FormControl
            onChange={this.handleChange}
            placeholder="Enter a name for the new category"
          />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}
