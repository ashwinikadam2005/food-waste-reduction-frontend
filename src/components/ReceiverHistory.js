import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "../styles/ReceiverHistory.css";

class ReceiverHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyDonations: [],
      error: "",
      ratings: {},
      submitting: {},
      ratedDonations: new Set(), // ✅ Track already-rated donations
    };
  }

  componentDidMount() {
    const email = Cookies.get("userEmail");
    if (!email) {
      this.setState({ error: "You are not logged in. Please log in to view your donation history." });
      return;
    }

    axios
      .get("http://localhost:5001/donations/receiver/history", { params: { email } })
      .then((res) => this.setState({ historyDonations: res.data }))
      .catch(() => this.setState({ error: "Something went wrong. Please try again later." }));
  }

  handleStarClick = (donationId, rating) => {
    if (this.state.ratedDonations.has(donationId)) return; // ✅ Prevent changes after submission
    this.setState((prev) => ({
      ratings: {
        ...prev.ratings,
        [donationId]: { ...prev.ratings[donationId], rating },
      },
    }));
  };

  handleReviewChange = (donationId, e) => {
    if (this.state.ratedDonations.has(donationId)) return; // ✅ Prevent changes after submission
    const review = e.target.value;
    this.setState((prev) => ({
      ratings: {
        ...prev.ratings,
        [donationId]: { ...prev.ratings[donationId], review },
      },
    }));
  };

  submitRating = (donationId) => {
    const { ratings } = this.state;
    const email = Cookies.get("userEmail");

    if (!ratings[donationId]?.rating) {
      alert("Please select a star rating before submitting.");
      return;
    }

    this.setState((prev) => ({
      submitting: { ...prev.submitting, [donationId]: true },
    }));

    axios
      .post("http://localhost:5001/ratingmodel/donations/rate", {
        donationId,
        email,
        rating: ratings[donationId].rating,
        review: ratings[donationId].review || "",
      })
      .then(() => {
        alert("Rating submitted successfully!");
        this.setState((prev) => ({
          submitting: { ...prev.submitting, [donationId]: false },
          ratedDonations: new Set([...prev.ratedDonations, donationId]), // ✅ Mark as rated
        }));
      })
      .catch(() => {
        alert("Error submitting rating. Please try again later.");
        this.setState((prev) => ({
          submitting: { ...prev.submitting, [donationId]: false },
        }));
      });
  };

  renderStars = (donationId) => {
    const currentRating = this.state.ratings[donationId]?.rating || 0;
    const disabled = this.state.ratedDonations.has(donationId);
    return [...Array(5)].map((_, i) => (
      <span
        key={i + 1}
        onClick={() => !disabled && this.handleStarClick(donationId, i + 1)}
        style={{
          cursor: disabled ? "default" : "pointer",
          color: i + 1 <= currentRating ? "#ffc107" : "#e4e5e9",
          fontSize: "24px",
        }}
        role="button"
        aria-label={`${i + 1} star`}
      >
        ★
      </span>
    ));
  };

  render() {
    const { historyDonations, error, submitting, ratings, ratedDonations } = this.state;

    return (
      <div className="receiver-donation-history">
        <h2>Your Donation History</h2>
        {error && <p className="error-message">{error}</p>}

        {historyDonations.length === 0 ? (
          <p className="no-history">No past donations yet.</p>
        ) : (
          <div className="cards-container">
            {historyDonations.map((donation) => {
              const isRated = ratedDonations.has(donation.donation_id);
              return (
                <div key={donation.donation_id} className="donation-card">
                  <h3>{donation.food_name}</h3>
                  <p><strong>Category:</strong> {donation.food_category}</p>
                  <p><strong>Quantity:</strong> {donation.quantity}</p>
                  <p><strong>Status:</strong> {donation.status}</p>
                  <p>
                    <strong>Donor:</strong>{" "}
                    <Link to={`/donor-profile/${donation.donor_id}`} className="donor-link">
                      {donation.donor_name}
                    </Link>
                  </p>
                  <p><strong>Phone:</strong> {donation.donor_phone}</p>
                  <p>
                    <strong>Address:</strong>{" "}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(donation.donor_address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="map-link"
                    >
                      {donation.donor_address}
                    </a>
                  </p>
                  <p><strong>Accepted On:</strong> {new Date(donation.accepted_at).toLocaleString()}</p>

                  <div>
                    <strong>Your Rating:</strong> {this.renderStars(donation.donation_id)}
                  </div>
                  <textarea
                    placeholder="Write a review (optional)"
                    value={ratings[donation.donation_id]?.review || ""}
                    onChange={(e) => this.handleReviewChange(donation.donation_id, e)}
                    disabled={isRated}
                    rows={3}
                    style={{ width: "100%", resize: "vertical", marginTop: 8 }}
                  />
                  <button
                    onClick={() => this.submitRating(donation.donation_id)}
                    disabled={submitting[donation.donation_id] || isRated}
                    style={{
                      marginTop: 8,
                      cursor: submitting[donation.donation_id] || isRated ? "not-allowed" : "pointer",
                    }}
                  >
                    {isRated
                      ? "Rating Submitted"
                      : submitting[donation.donation_id]
                      ? "Submitting..."
                      : "Submit Rating"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default ReceiverHistory;
