import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/sidebarLike.css";

class SidebarLike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCount: 0,
      liked: false,
    };
  }

  componentDidMount() {
    const userEmail = Cookies.get("userEmail"); // ✅ corrected key
    if (!userEmail) return;

    axios
      .get(`http://localhost:5001/api/likes?email=${userEmail}`, { withCredentials: true })
      .then((res) => {
        this.setState({
          likeCount: res.data.totalLikes,
          liked: res.data.userHasLiked,
        });
      })
      .catch((err) => {
        console.error("Error fetching like data:", err);
      });
  }

  handleLike = () => {
    const userEmail = Cookies.get("userEmail"); // ✅ corrected key
    if (!userEmail) {
      alert("Please log in to like!");
      return;
    }

    axios
      .post(
        "http://localhost:5001/api/likes",
        { email: userEmail },
        { withCredentials: true }
      )
      .then((res) => {
        this.setState({
          likeCount: res.data.totalLikes,
          liked: true,
        });
      })
      .catch((err) => {
        console.error("Error liking:", err);
      });
  };

  render() {
    return (
      <div className="sidebar-like">
        <h3>Support Our Mission!</h3>
        <button
          onClick={this.handleLike}
          className="like-button"
          disabled={this.state.liked}
        >
          {this.state.liked ? "❤️ Liked" : "🤍 Like Us"}
        </button>
        <p className="like-count">
          Join +{this.state.likeCount} people who liked us!
        </p>
      </div>
    );
  }
}

export default SidebarLike;
