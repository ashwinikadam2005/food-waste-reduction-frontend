import React, { Component } from "react";
import "../styles/Home.css"; // Ensure you create a corresponding CSS file for styling
import homeImage from "../assets/images/home.jpg";
import foodDonationImage from "../assets/images/food donation.jpg";

class Home extends Component {
    render() {
      return (
        <div className="home-container">
          <header className="hero-section">
            <div className="overlay">
              <h1>Rescue Surplus, Feed the Needy</h1>
              
              <p>
                Transforming excess food into hope! Join our mission to bridge the 
                gap between abundance and hunger, ensuring every meal finds a plate.
              </p>
            </div>
          </header>
          <section className="content-section">
            <div className="text-content">
              <h2>The Impact of Food Waste</h2>
              <p>
                Every year, tons of food go to waste while millions struggle with hunger. 
                Our initiative redirects surplus food to those in need, creating a 
                sustainable and compassionate future.
              </p>
            </div>
            <div className="image-gallery">
              <div className="image-wrapper">
                <img src={homeImage} alt="Food Donation" />
                <div className="image-overlay"></div>
              </div>
              <div className="image-wrapper">
                <img src={foodDonationImage} alt="Food Waste" />
                <div className="image-overlay"></div>
              </div>
              {/* <div className="image-wrapper">
                <img src="/assets/volunteers.jpg" alt="Volunteers Helping" />
                <div className="image-overlay"></div>
              </div> */}
            </div>
          </section>
        </div>
      );
    }
  }
  
  export default Home;
  