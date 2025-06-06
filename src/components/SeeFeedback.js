import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeeFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/feedbacks')  // Make sure your backend is running on port 5001
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching feedbacks:', error);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p>No feedbacks available.</p>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {feedbacks.map((fb) => (
            <div key={fb.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: '#fafafa',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
              <p style={{ fontSize: '16px', marginBottom: '8px' }}>{fb.feedback}</p>
              <p style={{ fontSize: '14px', color: '#333' }}>— {fb.name}</p>
              <p style={{ fontSize: '12px', color: '#888' }}>{new Date(fb.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeeFeedbacks;
