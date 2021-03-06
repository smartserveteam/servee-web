import React, { Component } from "react";
import "./Home.css";
import { API } from "aws-amplify";
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
      topCategories: [
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
      categories: [],
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

    try {
      const categories = await this.categories();
      this.setState({ categories });
      console.log("Getting skills...");
      const skills = await this.skills();
      console.log("Skills:", skills);
    } catch (error) {
      console.error(error);
    }

    this.setState({ isLoading: false });
  }

  categories() {
    return API.get("categories", "/categories");
  }

  skills() {
    return API.get("skills", "/skills");
  }

  renderTopCategoriesList(topCategories) {
    console.log("Top Categories:", topCategories);
    return [{}].concat(topCategories).map(
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

  renderTopCategories() {
    return (
      <section className="top-categories">
        {!this.state.isLoading && this.renderTopCategoriesList(this.state.topCategories)}
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

  handleSkillChange = async (selectedOption) => {
    this.setState({ selectedOption });
    //alert(`Option selected:`, selectedOption);
    this.props.history.push(`/professionals/${selectedOption.categoryId}`);
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
            <Select placeholder="Search for a service (e.g. Accountant, Plumber, ...)" styles={colourStyles} className="title-search" value={selectedOption} onChange={this.handleSkillChange} options={this.state.categories} />
          </div>
        </section>
        {this.renderTopCategories()}
        {this.renderRecommendedServices()}
        <ReviewCards />
        {/* {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()} */}
      </div>
    );
  }
}
