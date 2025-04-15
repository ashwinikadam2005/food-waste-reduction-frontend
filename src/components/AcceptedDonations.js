import React, { Component } from "react";
import axios from "axios";
import "../styles/AcceptedDonations.css"; // Make sure the CSS file is created

class AcceptedDonations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptedDonations: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5001/donations/accepted")
      .then((res) => {
        this.setState({ acceptedDonations: res.data });
      })
      .catch((err) => {
        console.error("Error fetching accepted donations:", err);
      });
  }

  render() {
    const { acceptedDonations } = this.state;
    return (
      <div className="admin-accepted-donations">
        <h2>Accepted Donations</h2>
        {acceptedDonations.length === 0 ? (
          <p className="no-data">No accepted donations found.</p>
        ) : (
          <table className="donations-table">
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Donor</th>
                <th>Accepted By</th>
                <th>Accepted On</th>
              </tr>
            </thead>
            <tbody>
              {acceptedDonations.map((d) => (
                <tr key={d.donation_id}>
                  <td>{d.food_name}</td>
                  <td>{d.food_category}</td>
                  <td>{d.quantity}</td>
                  <td>{d.status}</td>
                  <td>{d.donor_name}</td>
                  <td>{d.receiver_name}</td>
                  <td>{new Date(d.accepted_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default AcceptedDonations;
