import React, { Component } from "react";
import { API } from "aws-amplify";
import { ListGroup, Label } from "react-bootstrap";
import "./Professionals.css";

export default class Professionals extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      professionals: []
    };
  }

  async componentDidMount() {
    try {
      const professionals = await this.getProfessionals();
      console.log("Professionals:", professionals);
      this.setState({ professionals });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  getProfessionals() {
    return API.get("skills", `/skills/${this.props.match.params.id}`);
  }

  renderProfessionalsList(professionals) {
    console.log("Rendering professionals:", professionals);
    return [{}].concat(professionals).map((professional, i) =>
      i !== 0 ? (
        <section className="professional-section">
          <div className="professional-div">
            <h4 className="professional-title">Professionals</h4>
          </div>
          <div className="professional-items">
            <div className="professional-item">
              <div className="professional-item-profile">
                <div
                  className="professional-hired-profile-pic"
                  style={{ backgroundPosition: "-353px -5px" }}
                />
                <div className="professional-item-profile-name">
                  {professional.given_name} {professional.family_name}
                </div>
                <div className="professional-item-rating-section">
                  <span className="professional-item-rating">4.8</span>
                </div>
              </div>
              <div className="professional-professional-hired-section">
                <h5 className="professional-professional-hired-title">
                  Reviewed by
                </h5>
                <div className="professional-professional-hired-info-section">
                  <div
                    className="professional-item-profile-pic"
                    style={{ backgroundPosition: "-295px -5px" }}
                  />
                  <div className="professional-item-profile-name">Sonia</div>
                </div>
                <div>
                  <div className="professional-item-review">
                    <p>
                      Hired @pierrickl as wedding plumber... Great resource
                      through #Servee
                    </p>
                    <p className="facebook-review">Reviewed on Facebook</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        // <div className="main" key={professional.username}>
        //   <div className="cardheader">
        //     {professional.given_name} {professional.family_name}
        //   </div>
        //   <div className="cardheadersubtitle">Plumber</div>
        //   <div className="rating">
        //     <span>4.6</span>
        //   </div>
        //   <div className="cardbody">Content</div>
        //   <div className="cardfooter">
        //     {"Last Login: " + new Date(professional.loginDate).toLocaleString()}
        //   </div>
        // </div>
        // <LinkContainer key={professional.username} to={`/professionals/${professional.username}`} >
        //   <ListGroupItem header={`${professional.given_name} ${professional.family_name}`}>
        //       {"Last Login: " + new Date(professional.loginDate).toLocaleString()}
        //       {"Address: " + professional.address}
        //       {"Postal Code: " + professional.postal_code}
        //   </ListGroupItem>
        // </LinkContainer>
        <Label key="empty">Click on a professional to see more...</Label>
      )
    );
  }

  render() {
    return (
      <div className="Notes">
        {this.state.professionals.length > 0 && ( // Only render the page if there are professionals for the skill
          <ListGroup>
            {!this.state.isLoading &&
              this.renderProfessionalsList(this.state.professionals)}
          </ListGroup>
        )}
      </div>
    );
  }
}
