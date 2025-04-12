import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/AdminLogin.css";

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (email === "admin@example.com" && password === "admin123") {
      Cookies.set("userRole", "admin", { expires: 1 }); // store admin role in cookie
      Cookies.set("userEmail", email); // optional: save email
      window.location.reload(); // Refresh to reflect updated navbar
    } else {
      alert("Invalid credentials!");
    }
  };

  render() {
    const userRole = Cookies.get("userRole");

    if (userRole === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }

    return (
      <div className="admin-container">
        <div className="admin-card">
          <h2 className="admin-title">Admin Login</h2>
          <form onSubmit={this.handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="Enter email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Enter password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>
            <button type="submit" className="btn-submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AdminLogin;
