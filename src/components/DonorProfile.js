import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/DonorProfile.css';

const DonorProfile = () => {
  const { donorId } = useParams();

  const [donorProfile, setDonorProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!donorId) return;

    axios.get(`http://localhost:5001/ratingmodel/donor-profile/${donorId}`)
      .then(res => setDonorProfile(res.data))
      .catch(err => {
        console.error('Error fetching donor profile:', err);
        setError(err.response?.data?.error || 'Unexpected error');
      });
  }, [donorId]);

  const renderStars = (rating) => {
    const stars = [];
    const maxStars = 5;
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? '#ffc107' : '#e4e5e9' }}>★</span>
      );
    }
    return stars;
  };

  if (error) return <div>Error: {error}</div>;
  if (!donorProfile) return <div>Loading...</div>;

  return (
<div className="donor-profile-container">
  <h2>{donorProfile.organization_name}</h2>
  <p><strong>Email:</strong> {donorProfile.email}</p>
  <p><strong>Phone:</strong> {donorProfile.phone}</p>
  <p><strong>Address:</strong> {donorProfile.address}</p>

  <div className="review-section">
    <h3>Ratings & Reviews</h3>
    {donorProfile.ratings.length > 0 ? (
      <div>
        {donorProfile.ratings.map((r, i) => (
          <div key={i} className="review-item">
            <p className="receiver-name">Receiver: {r.receiver_name}</p>
            <p className="rating-stars">{renderStars(r.rating)}</p>
            {r.review && <p className="review-text">“{r.review}”</p>}
            <p className="timestamp">{new Date(r.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    ) : (
      <p>No ratings yet.</p>
    )}
  </div>
</div>
  );
};

export default DonorProfile;
