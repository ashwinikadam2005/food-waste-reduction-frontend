// FeedbackForm.jsx
import React, { Component } from 'react';
import '../styles/Feedback.css';

class FeedbackForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      feedback: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, feedback } = this.state;
  
    try {
      const csrfRes = await fetch('http://localhost:5001/api/csrf-token', {
        credentials: 'include', // Ensure credentials are sent with the request
      });
  
      if (!csrfRes.ok) {
        throw new Error('Failed to fetch CSRF token');
      }
  
      const { csrfToken } = await csrfRes.json();
  
      const response = await fetch('http://localhost:5001/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({ name, feedback }),
      });
  
      const contentType = response.headers.get("content-type");
      const result = contentType && contentType.includes("application/json")
        ? await response.json()
        : { error: "Invalid response from server" };
  
      if (response.ok) {
        alert('✅ Feedback submitted!');
        this.setState({ name: '', feedback: '' });
      } else {
        alert('⚠️ ' + result.error);
      }
    } catch (err) {
      console.error('Submit error:', err.message);
      alert('Submission failed: ' + err.message);
    }
  };
  

  render() {
    const { name, feedback } = this.state;

    return (
      <form className="feedback-form" onSubmit={this.handleSubmit}>
        <h2>Submit Your Feedback</h2>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={this.handleChange}
          className="username-input"
          required
        />
        <textarea
          name="feedback"
          placeholder="Enter your feedback..."
          value={feedback}
          onChange={this.handleChange}
          className="feedback-textarea"
          required
        />
        <button type="submit" className="submit-button">Send</button>
      </form>
    );
  }
}

export default FeedbackForm;
