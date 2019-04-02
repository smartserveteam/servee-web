import React, { Component } from "react";
import { ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlenderPhone, faWrench, faBroom, faCalculator, faUniversity, faHome } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';
import ReviewCards from "../components/ReviewCards";

library.add(faBlenderPhone, faWrench, faBroom, faCalculator, faUniversity, faHome);

var backgroundImageStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL + "/backgroundpic.jpg"})`
}

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      selectionOption: null,
      selectionLocation: null,
      categories: [
        {
          categoryId: 1,
          content: "Plumbers",
          faIcon: "wrench"
        },
        {
          categoryId: 2,
          content: "Appliance Repair",
          faIcon: "blender-phone"
        },
        {
          categoryId: 3,
          content: "Cleaning",
          faIcon: "broom"
        },
        {
          categoryId: 4,
          content: "Accounting & Taxes",
          faIcon: "calculator"
        },
        {
          categoryId: 5,
          content: "Teachers",
          faIcon: "university"
        },
        {
          categoryId: 6,
          content: "Architect",
          faIcon: "home"
        }
      ],
      recommendedServices: [
        {
          id: 1,
          name: "AC Service and Repair",
          image: "https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep/categories/category_v2/category_308a76f0.jpeg",
          link: "/ac-service-and-repair"
        },
        {
          id: 2,
          name: "Salon at Home for Women",
          image: "https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep/categories/category_v2/category_eea56eb0.png",
          link: "/salon-at-home-for-women"
        },
        {
          id: 3,
          name: "Washing Machine Repair",
          image: "https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep/categories/category_v2/category_cb553ee0.jpeg",
          link: "/washing-machine-repair"
        },
        {
          id: 4,
          name: "Home Cleaning",
          image: "https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep/categories/category_v2/category_3b4f23b0.jpeg",
          link: "/home-cleaning"
        }
      ],
      notes: []
    };

    this.options = [
      { value: 'accountant', label: 'Accountant' },
      { value: 'architect', label: 'Architect' },
      { value: 'appliance-repair', label: 'Appliance Repair' },
      { value: 'french-teacher', label: 'French Teacher' },
      { value: 'home-cleaning', label: 'Home Cleaning' },
      { value: 'plumber', label: 'Plumber' },
      { value: 'washing-machine-repair', label: 'Washing Machine Repair' },
      { value: 'wedding-photographer', label: 'Wedding Photographer' }
    ];

    this.locations = [
      { value: 'warsaw', label: 'Warsaw' },
      { value: 'krakow', label: 'Krakow' },
      { value: 'gdansk', label: 'Gdansk' }
    ];
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    this.setState({ isLoading: false });
  }

  renderNotesList(notes) {
    return [{}].concat(notes).map(
      (note, i) =>
        i !== 0
          ? <LinkContainer
            key={note.noteId}
            to={`/notes/${note.noteId}`}
          >
            <ListGroupItem header={note.content.trim().split("\n")[0]}>
              {"Created: " + new Date(note.createdAt).toLocaleString()}
            </ListGroupItem>
          </LinkContainer>
          : <LinkContainer
            key="new"
            to="/notes/new"
          >
            {/* Render a "Create a new note" button even if the list is empty */}
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Create a new note
              </h4>
            </ListGroupItem>
          </LinkContainer>
    );
  }

  renderLander() {
    return (
      <div className="lander">
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
        </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
        </Link>
        </div>
      </div >
    );
  }

  renderCategoriesList(categories) {
    console.log("Categories:", categories);
    return [{}].concat(categories).map(
      (category, i) =>
        i !== 0 ?
          <div key={category.categoryId} className="col-sm-2 top-category">
            <div className="top-category-icon">
              <FontAwesomeIcon icon={category.faIcon} size="3x" />
            </div>
            <div className="top-category-text">
              {category.content}
            </div>
          </div>
          : <React.Fragment key="emptyFragment"></React.Fragment>
    );
  }

  renderCategories() {
    return (
      <section className="top-categories">
        {!this.state.isLoading && this.renderCategoriesList(this.state.categories)}
      </section>
    );
  }

  renderRecommendedServicesList(recommendedServices) {
    console.log("Recommended Services:", recommendedServices);
    return [{}].concat(recommendedServices).map(
      (recommendedService, i) =>
        i !== 0 ?
          <div key={recommendedService.id} className="recommended-service">
            <a href={recommendedService.link}>
              <img alt={recommendedService.name} className="recommended-service-image" src={recommendedService.image}></img>
              <h3 className="recommended-service-text">{recommendedService.name}</h3>
            </a>
          </div>
          : <React.Fragment key="emptyFragment"></React.Fragment>
    );
  }

  renderRecommendedServices() {
    return (
      <section className="recommended-services-section">
        <h3 className="recommended-service-title">Recommended Services</h3>
        <div className="recommended-services-group">
          {!this.state.isLoading && this.renderRecommendedServicesList(this.state.recommendedServices)}
        </div>
      </section>
    );
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  handleLocationChange = (selectedLocation) => {
    this.setState({ selectedLocation });
    console.log(`Location selected:`, selectedLocation);
  }

  render() {
    const { selectedOption, selectedLocation } = this.state;
    const colourStyles = {
      control: styles => ({
        ...styles,
        height: 54,
        fontSize: 14,
        backgroundColor: 'white'
      }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
          ...styles,
          cursor: isDisabled ? 'not-allowed' : 'default',
          fontSize: 14
        };
      },
    };

    return (
      <div className="Home">
        <section style={backgroundImageStyle} className="background-pic">
          <div className="title"></div>
          <h1 className="title-text">Your Service Expert in Poland</h1>
          <h3 className="title-subtitle">Get instant access to reliable and affordable services</h3>
          <div className="form-inline title-form">
            <Select placeholder="Location" styles={colourStyles} className="title-location" onChange={this.handleLocationChange} options={this.locations} value={selectedLocation || this.locations.filter(location => location.value === 'warsaw')} />
            <Select placeholder="Search for a service (e.g. Accountant, Plumber, ...)" styles={colourStyles} className="title-search" value={selectedOption} onChange={this.handleChange} options={this.options} />
          </div>
        </section>
        {this.renderCategories()}
        {this.renderRecommendedServices()}
        <ReviewCards />
        {/* {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()} */}
        {this.props.isAuthenticated ? null : this.renderLander()}
      </div>
    );
  }
}
