import React, { Component } from "react";
import "../styles/sidebarLike.css";

class SidebarLike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCount: 100, // Initial like count
      liked: false,
    };
  }

  handleLike = () => {
    if (!this.state.liked) {
      this.setState((prevState) => ({
        likeCount: prevState.likeCount + 1,
        liked: true,
      }));
    }
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
