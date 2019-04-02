import React, { Component } from "react";
import "./ReviewCards.css";

export default class ReviewCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <section className="customer-reviews-section">
        <div className="customer-reviews-div">
          <h4 className="customer-reviews-title">Customer Reviews</h4>
        </div>
        <div className="customer-reviews-items">
          <div className="customer-reviews-item">
            <div className="customer-reviews-item-profile">
              <div className="customer-reviews-item-profile-pic" style={{ backgroundPosition: "-295px -5px" }}></div>
              <div className="customer-reviews-item-profile-name">Sonia</div>
            </div>
            <div className="customer-reviews-item-review">
              <p>Hired #stockblockframes as wedding photographer…Great resource through #SmartServe</p>
              <p className="facebook-review">Reviewed on Facebook</p>
            </div>
            <div className="customer-reviews-professional-hired-section">
              <h5 className="customer-reviews-professional-hired-title">Professional hired</h5>
              <div className="customer-reviews-professional-hired-info-section">
                <div className="professional-hired-profile-pic" style={{ backgroundPosition: "-353px -5px" }}></div>
                <div className="professional-hired-name-score-section">
                  <div>Stop Block Frames</div>
                  <div className="professional-hired-rating">
                    <span>4.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="customer-reviews-item">
            <div className="customer-reviews-item-profile">
              <div className="customer-reviews-item-profile-pic" style={{ backgroundPosition: "-469px -5px" }}></div>
              <div className="customer-reviews-item-profile-name">Deeksha</div>
            </div>
            <div className="customer-reviews-item-review">
              <p>Such hygienic services by SmartServe. Super impressed! :clap:</p>
              <p className="twitter-review">Reviewed on Twitter</p>
            </div>
            <div className="customer-reviews-professional-hired-section">
              <h5 className="customer-reviews-professional-hired-title">Professional hired</h5>
              <div className="customer-reviews-professional-hired-info-section">
                <div className="professional-hired-profile-pic" style={{ backgroundPosition: "-875px -5px" }}></div>
                <div className="professional-hired-name-score-section">
                  <div>Poonam Tomar</div>
                  <div className="professional-hired-rating">
                    <span>4.4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="customer-reviews-item">
            <div className="customer-reviews-item-profile">
              <div className="customer-reviews-item-profile-pic" style={{ backgroundPosition: "-237px -5px" }}></div>
              <div className="customer-reviews-item-profile-name">Smriti Advani</div>
            </div>
            <div className="customer-reviews-item-review">
              <p>Being a new mom is super time consuming and you guys came to my rescue with your awesome home salon services! Thanks!</p>
              <p className="apple-review">Reviewed on Apple Store</p>
            </div>
            <div className="customer-reviews-professional-hired-section">
              <h5 className="customer-reviews-professional-hired-title">Professional hired</h5>
              <div className="customer-reviews-professional-hired-info-section">
                <div className="professional-hired-profile-pic" style={{ backgroundPosition: "-121px -5px" }}></div>
                <div className="professional-hired-name-score-section">
                  <div>Rekha</div>
                  <div className="professional-hired-rating">
                    <span>4.5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}