// DonorRegistration.jsx

import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "../styles/DonarRegisteration.css";

class DonarRegisteration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "",
      organizationName: "",
      organizationType: "",
      phone: "",
      address: "",
      email: "",
      password: "",
      confirmPassword: "",
      csrfToken: "",
      message: "",
      redirectToOtp: false,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5001/csrf-token", { withCredentials: true })
      .then((res) => this.setState({ csrfToken: res.data?.csrfToken }))
      .catch((err) => console.error("Error fetching CSRF token:", err));
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, message: "" });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const {
      password,
      confirmPassword,
      userType,
      organizationName,
      organizationType,
      phone,
      address,
      email,
      csrfToken,
    } = this.state;

    if (password !== confirmPassword) {
      this.setState({ message: "❌ Passwords do not match!" });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/register",
        {
          user_type: userType,
          organization_name: organizationName,
          organization_type: organizationType,
          phone,
          address,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: { "X-CSRF-Token": csrfToken },
        }
      );

      if (response.data?.success) {
        this.setState({
          message: "✅ Registration successful! Redirecting to OTP page...",
        });

        setTimeout(() => {
          this.setState({ redirectToOtp: true });
        }, 2000);
      } else {
        this.setState({ message: `❌ ${response.data?.message || "Registration failed."}` });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      this.setState({ message: "❌ Registration failed! Try again." });
    }
  };

  render() {
    const {
      userType,
      organizationName,
      organizationType,
      phone,
      address,
      email,
      password,
      confirmPassword,
      message,
      redirectToOtp,
    } = this.state;

    if (redirectToOtp) {
      return <Navigate to="/otp-verification" state={{ email }} />;
    }

    const donorOptions = ["Hotel", "Restaurant", "Mess", "Other"];
    const receiverOptions = ["NGO", "Individual", "Company", "Other"];
    const organizationOptions = userType === "Donor" ? donorOptions : receiverOptions;

    return (
      <div className="form-container">
        <h2>Donor Registration</h2>

        {message && <p className="message">{message}</p>}

        <form onSubmit={this.handleSubmit}>
          <select
            name="userType"
            value={userType}
            onChange={this.handleChange}
            required
          >
            <option value="">Select Donor / Receiver Type</option>
            <option value="Donor">Donor</option>
            <option value="Receiver">Receiver</option>
          </select>

          <input
            type="text"
            name="organizationName"
            placeholder="Organization Name"
            value={organizationName}
            onChange={this.handleChange}
            required
          />

          <select
            name="organizationType"
            value={organizationType}
            onChange={this.handleChange}
            required
            disabled={!userType}
          >
            <option value="">Select Organization Type</option>
            {organizationOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={phone}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={address}
            onChange={this.handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default DonarRegisteration;
