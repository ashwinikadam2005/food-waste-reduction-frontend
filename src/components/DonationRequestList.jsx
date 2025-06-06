import React, { Component } from "react";
import axios from "axios";
import "../styles/DonationRequestList.css"; // Optional styling
import Cookies from "js-cookie";

class DonationRequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donations: [],
    };
  }

  componentDidMount() {
    this.fetchDonations();
  }

  fetchDonations = () => {
    axios
      .get("http://localhost:5001/donations")
      .then((res) => {
        this.setState({ donations: res.data });
      })
      .catch((err) => {
        console.error("Error fetching donations:", err);
      });
  };

  handleAccept = (donationId) => {
    const email = Cookies.get("userEmail");

    if (!email) {
      alert("Please log in to accept the donation.");
      return;
    }

    axios
      .post(`http://localhost:5001/donations/accept/${donationId}`, { email })
      .then((res) => {
        alert("Donation accepted!");

        // Remove the accepted donation from the list
        this.setState((prevState) => ({
          donations: prevState.donations.filter(
            (d) => d.donation_id !== donationId
          ),
        }));
      })
      .catch((err) => {
        console.error("Error accepting donation:", err);
        const msg =
          err.response?.data?.error || "Something went wrong while accepting.";
        alert(msg);
      });
  };

  render() {
    const { donations } = this.state;

    return (
      <div className="donations-grid">
        {donations.map((donation) => (
          <div key={donation.donation_id} className="donation-card">
            <h3>{donation.food_name}</h3>
            <p><strong>Category:</strong> {donation.food_category}</p>
            <p><strong>Quantity:</strong> {donation.quantity}</p>
            <p><strong>Expiry:</strong> {donation.expiry_date}</p>
            <p><strong>Preparation:</strong> {donation.preparation_date}</p>
            <p><strong>Storage:</strong> {donation.storage_instructions}</p>
            <p><strong>Donor:</strong> {donation.organization_name}</p>
            <p><strong>Phone:</strong> {donation.phone}</p>
            <p><strong>Email:</strong> {donation.email}</p>
            <p>
              <strong>Address:</strong>{" "}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(donation.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                {donation.address}
              </a>
            </p>

            {donation.status === "Pending" && (
              <button
                className="accept-button"
                onClick={() => this.handleAccept(donation.donation_id)}
              >
                Accept
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default DonationRequestList;
