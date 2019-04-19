import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./AdminCategory.css";

export default class AdminCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      isDeleting: null,
      category: null,
      label: ""
    };
  }

  async componentDidMount() {
    try {
      const category = await this.getCategory();
      const { label } = category;

      this.setState({
        category,
        label
      });
    } catch (e) {
      alert(e);
    }
  }

  getCategory() {
    return API.get("categories", `/categories/${this.props.match.params.id}`);
  }

  validateForm() {
    return this.state.label.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  saveCategory(category) {
    return API.put("categories", `/categories/${this.props.match.params.id}`, {
      body: category
    });
  }

  handleSubmit = async event => {

    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.saveCategory({
        label: this.state.label
      });
      this.props.history.push("/admin");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }


  deleteCategory() {
    return API.del("categories", `/categories/${this.props.match.params.id}`);
  }

  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });

    try {
      await this.deleteCategory();
      this.props.history.push("/admin");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }

  render() {
    return (
      <div className="Categories">
        {this.state.category && // Only render the form if category is available
          <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="label">
          <ControlLabel>Category Name</ControlLabel>
          <FormControl
            onChange={this.handleChange}
            value={this.state.label}
            />
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
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
          </form>}
      </div>
    );
  }
}
