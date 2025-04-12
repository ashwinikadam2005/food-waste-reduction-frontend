import React, { Component } from "react";
import axios from "axios";
import "../styles/ManageUsers.css";

axios.defaults.withCredentials = true;

class ManageUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5001/csrf-token", { withCredentials: true })
      .then((response) => {
        axios.defaults.headers.common["X-CSRF-Token"] = response.data.csrfToken;
        this.fetchUsers();
      })
      .catch((error) => console.error("Error fetching CSRF token:", error));
  }
  
  fetchUsers = () => {
    axios
      .get("http://localhost:5001/users")
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  handleApprove = (id, userType, email) => {
    axios
      .post(`http://localhost:5001/approve/${id}`, { userType, email })
      .then(() => {
        this.fetchUsers();
        alert("User approved, and an email has been sent to notify them.");
      })
      .catch((error) => {
        console.error("Error approving user:", error.response?.data || error);
      });
};
    handleBlock = (id) => {
    axios
      .post(`http://localhost:5001/block/${id}`)
      .then(() => {
        this.fetchUsers();
      })
      .catch((error) => {
        console.error("Error blocking user:", error);
      });
  };
  
  render() {
    return (
      <div className="container">
        <h2>Manage Users</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User Type</th>
              <th>Organization Name</th>
              <th>Organization Type</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.user_type}</td>
                <td>{user.organization_name}</td>
                <td>{user.organization_type}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.email}</td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
                <td>
                <button
                  className="approve small-button"
                  onClick={() => this.handleApprove(user.id, user.user_type, user.email)}
                  >
                  ✓
                </button>
                  <button
                    className="block small-button"
                    onClick={() => this.handleBlock(user.id)}
                  >
                    ✗
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ManageUsers;