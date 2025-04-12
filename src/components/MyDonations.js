import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userEmail = Cookies.get("userEmail");

  useEffect(() => {
    if (!userEmail) {
      setError("Please log in first.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5001/api/my-donations", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Fetched donations:", res.data);
        setDonations(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching donations:", err);
        setError("Could not load donations");
        setLoading(false);
      });
  }, [userEmail]);

  if (loading) return <p>Loading your donations...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>My Donations</h2>
      {donations.length === 0 ? (
        <p>You have not donated any food yet.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {donations.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "10px",
                width: "250px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h4>{item.food_name}</h4>
              <p><strong>Category:</strong> {item.food_category}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Expiry:</strong> {item.expiry_date}</p>
              <p><strong>Preparation:</strong> {item.preparation_date}</p>
              <p><strong>Storage:</strong> {item.storage_instructions}</p>
              <p><strong>Created:</strong> {item.created_at}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyDonations;
