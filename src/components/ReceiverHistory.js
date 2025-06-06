import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/ReceiverHistory.css";

class ReceiverHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyDonations: [],
      error: "",
    };
  }

  componentDidMount() {
    const email = Cookies.get("userEmail");

    if (!email) {
      console.error("Email is missing in cookies.");
      this.setState({
        error: "You are not logged in. Please log in to view your donation history.",
      });
      return;
    }

    axios
      .get("http://localhost:5001/donations/receiver/history", {
        params: { email },
      })
      .then((res) => {
        this.setState({ historyDonations: res.data });
      })
      .catch((err) => {
        console.error("Error fetching donation history:", err);
        this.setState({ error: "Something went wrong. Please try again later." });
      });
  }

  render() {
    const { historyDonations, error } = this.state;

    return (
      <div className="receiver-donation-history">
        <h2>Your Donation History</h2>
        {error && <p className="error-message">{error}</p>}

        {historyDonations.length === 0 ? (
          <p className="no-history">No past donations yet.</p>
        ) : (
          <div className="cards-container">
            {historyDonations.map((donation) => (
              <div key={donation.donation_id} className="donation-card">
                <h3>{donation.food_name}</h3>
                <p><strong>Category:</strong> {donation.food_category}</p>
                <p><strong>Quantity:</strong> {donation.quantity}</p>
                <p><strong>Status:</strong> {donation.status}</p>
                <p><strong>Donor:</strong> {donation.donor_name}</p>
                <p><strong>Accepted On:</strong> {new Date(donation.accepted_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ReceiverHistory;
