import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Modal, Button, ListGroup, ListGroupItem
} from "react-bootstrap";
import "./Admin.css";
import { API } from "aws-amplify";

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.handleShowCategories = this.handleShowCategories.bind(this);
    this.handleCloseCategories = this.handleCloseCategories.bind(this);

    this.state = {
      isLoading: true,
      categories: [],
    };
  }

  async componentDidMount() {
    try {
      const categories = await this.categories();
      this.setState({ categories });
    } catch (error) {
      console.error(error);
    }

    this.setState({ isLoading: false });
  }

  categories() {
    return API.get("categories", "/categories");
  }

  handleCloseCategories() {
    this.setState({ showCategories: false });
  }

  handleShowCategories() {
    this.setState({ showCategories: true });
  }

  renderCategoriesList(categories) {
    return [{}].concat(categories).map(
      (category, i) =>
        i !== 0
          ? <LinkContainer key={category.categoryId} to={`/admin/categories/${category.categoryId}`}>
              <ListGroupItem header={category.label.trim().split("\n")[0]}>
                {"Added: " + new Date(category.createdAt).toLocaleString()}
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer key="new" to="/admin/categories/new">
              <ListGroupItem>
                <h4 className="text-primary">
                  <b>{"\uFF0B"}</b> Add a new Category
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }

  renderCategories() {
    return (
      <div className="categories">
        <ListGroup>
          {!this.state.isLoading && this.renderCategoriesList(this.state.categories)}
        </ListGroup>
      </div>
    );
  }

  renderForm() {
    return (
      <div className="AdminSettings">
        <Button bsStyle="info" bsSize="large" onClick={this.handleShowCategories}>
          Categories
        </Button>
      </div>
    );
  }

  handleChange = event => {
    console.log("Event:", event);
    console.log("setState:" + event.target.id + ":" + event.target.value);
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    this.setState({ isLoading: false });
  }

  render() {
    return (
      <div>
        {
          this.renderForm()
        }
        <Modal show={this.state.showCategories} onHide={this.handleCloseCategories}>
          <Modal.Header closeButton>
            <Modal.Title>Categories</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.renderCategories()}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseCategories}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
