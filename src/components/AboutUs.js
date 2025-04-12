import React, { Component } from "react";
import "../styles/AboutUs.css";
import SidebarLike from "./SidebarLike"; // Import SidebarLike component
import sectionImage from "../assets/images/image2.jpg";

class AboutUs extends Component {
  render() {
    return (
      <div className="about-us-container">
        {/* Main Content */}
        <div className="main-content">
          {/* Hero Section */}
          <header className="hero-section">
            <div className="hero-content">
              <h1>About Us</h1>
              <p>
                "Welcome to Food Waste Reduction System! Our mission is to reduce food waste and ensure surplus food reaches those in need. <br />
                We believe in sustainability, social responsibility, <br />
                and making a positive impact on our community."
              </p>
            </div>
          </header>

          {/* Two-Column Section */}
          <section className="about-content">
            <div className="text-section">
              <h2>Our Mission</h2>
              <p>
                "Our goal is to minimize food waste by redistributing 
                excess food, educating people on sustainable food practices, 
                and creating a network that benefits both donors and recipients."
              </p>
            </div>
            <div className="image-section">
              <img src={sectionImage} alt="Food Waste Management" />
            </div>
          </section>

          {/* Steps Section */}
          <div className="aboutus-container">
            <h1 className="aboutus-heading">How We Reduce Food Waste</h1>
            <div className="steps-container">
              <div className="step">
                <div className="step-icon">🍽️</div>
                <h2>Food Collection</h2>
                <p>We collaborate with restaurants, supermarkets, and individuals to collect surplus food.</p>
              </div>
              <div className="step">
                <div className="step-icon">✅</div>
                <h2>Quality Check</h2>
                <p>Ensuring all food is safe for consumption before distribution.</p>
              </div>
              <div className="step">
                <div className="step-icon">🤝</div>
                <h2>Redistribution</h2>
                <p>Partnering with NGOs, shelters, and food banks to distribute food to those in need.</p>
              </div>
              <div className="step">
                <div className="step-icon">📢</div>
                <h2>Awareness Campaigns</h2>
                <p>Educating the public on responsible food consumption and waste reduction.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Like Component at the End */}
        <footer className="sidebar-like">
          <SidebarLike />
        </footer>
      </div>
    );
  }
}

export default AboutUs;
