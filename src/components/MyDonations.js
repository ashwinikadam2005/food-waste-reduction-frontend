import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MyDonations.css"; // Custom styles

const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState(""); // Added state for CSRF token

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get("http://localhost:5001/csrf-token", { withCredentials: true });
        setCsrfToken(response.data.csrfToken); // Save CSRF token
      } catch (err) {
        console.error("Failed to fetch CSRF token:", err);
      }
    };

    fetchCsrfToken();
  }, []);

  // Fetch donations
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/my-donations", {
          withCredentials: true,
        });

        if (response.data && response.data.length > 0) {
          setDonations(response.data);
        } else {
          setError("You haven't made any donations yet.");
        }
      } catch (err) {
        if (err.response?.status === 403) {
          setError("Access denied. You must be a donor to view donations.");
        } else {
          setError("Failed to fetch donations. Please try again.");
        }
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  // Mark donation as completed
  const handleMarkCompleted = async (donationId) => {
    const confirm = window.confirm("Are you sure you want to mark this donation as completed?");
    if (!confirm) return;
  
    try {
      const response = await axios.put(
        `http://localhost:5001/api/donations/mark-completed/${donationId}`,
        {},
        {
          headers: {
            'CSRF-Token': csrfToken,
          },
          withCredentials: true,
        }
      );
  
      // Get the completed date from the response
      const completedAt = response.data.completedAt;
  
      // Update the donation status and completed_at locally
      setDonations((prev) =>
        prev.map((donation) =>
          donation.id === donationId
            ? { ...donation, status: "Completed", completed_at: completedAt }
            : donation
        )
      );
  
      alert("Donation marked as completed!");
    } catch (err) {
      console.error("Error marking donation as completed:", err);
      alert("Failed to mark as completed. Try again.");
    }
  };
    
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="donations-container">
      <h1 className="title">My Donations</h1>

      {error && <div className="error-message">{error}</div>}

      {!error && donations.length > 0 && (
        <div className="card-grid">
          {donations.map((donation) => (
            <div key={donation.id} className="donation-card">
              <h2 className="donation-title">{donation.food_name}</h2>
              <div className="donation-info">
                <p><strong>🍽 Category:</strong> {donation.food_category}</p>
                <p><strong>📦 Quantity:</strong> {donation.quantity}</p>
                <p><strong>⏳ Expiry:</strong> {formatDate(donation.expiry_date)}</p>
                <p><strong>👩‍🍳 Prepared:</strong> {formatDate(donation.preparation_date)}</p>
                <p><strong>❄️ Storage:</strong> {donation.storage_instructions || "N/A"}</p>
                <p><strong>🕒 Donated On:</strong> {formatDate(donation.created_at)}</p>
                <p><strong>📌 Status:</strong> {donation.status}</p>

                {donation.status === "Accepted" && (
                  <button
                    className="complete-button"
                    onClick={() => handleMarkCompleted(donation.id)}
                  >
                    ✅ Mark as Completed
                  </button>
                )}

                {donation.status === "Completed" && (
                  <p className="completed-status">✅ Completed</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!error && donations.length === 0 && (
        <div className="no-donations">You haven't made any donations yet.</div>
      )}
    </div>
  );
};

export default MyDonations;
