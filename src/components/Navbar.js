// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import Cookies from "js-cookie";
// import "../styles/Navbar.css";

// class Navbar extends Component {
//   handleLogout = () => {
//     Cookies.remove("userRole");
//     Cookies.remove("userEmail");
//     Cookies.remove("donor");
//     window.location.href = "/"; // Navigate to homepage
//   };
  
//   render() {
//     const userRole = Cookies.get("userRole"); // Read cookie here instead of constructor

//     return (
//       <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//         <div className="container-fluid">
//           <Link className="navbar-brand fw-bold" to="/">
//             Food Waste Reduction
//           </Link>

//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
//             <ul className="navbar-nav">
//               {userRole !== "admin" && (
//                 <>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/">Home</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/about-us">About Us</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/contact">Contact Us</Link>
//                   </li>
//                 </>
//               )}

//               {!userRole && (
//                 <li className="nav-item dropdown">
//                   <button
//                     className="nav-link dropdown-toggle btn btn-link"
//                     id="navbarDropdown"
//                     data-bs-toggle="dropdown"
//                   >
//                     Login
//                   </button>
//                   <ul className="dropdown-menu dropdown-menu-end">
//                     <li>
//                       <Link className="dropdown-item" to="/admin-login">Login as Admin</Link>
//                     </li>
//                     <li>
//                       <Link className="dropdown-item" to="/login">Login as Donor/Receiver</Link>
//                     </li>
//                   </ul>
//                 </li>
//               )}

//               {userRole === "admin" && (
//                 <>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/manage-users">Manage Users</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/accepted-donations">Donations</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="see-feedbacks">Feedbacks</Link>
//                   </li>

//                   {/* <li className="nav-item">
//                     <Link className="nav-link" to="/history">History</Link>
//                   </li> */}
//                 </>
//               )}

//               {userRole === "donor" && (
//                 <>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/my-donations">My Donations</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/food-donate">Donate Food</Link>
//                   </li>
//                 </>
//               )}

//               {userRole === "receiver" && (
//                 <>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/donation-request-list">Available Food</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/receiver-history">Received History</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/feedback-form">Feedback</Link>
//                   </li>

//                 </>
//               )}

//               {userRole && (
//                 <li className="nav-item">
//                   <button className="btn btn-danger ms-3" onClick={this.handleLogout}>
//                     Logout
//                   </button>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </nav>
//     );
//   }
// }

// export default Navbar;

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/Navbar.css";

class Navbar extends Component {
  handleLogout = () => {
    Cookies.remove("userRole");
    Cookies.remove("userEmail");
    Cookies.remove("donor");
    window.location.href = "/";
  };

  render() {
    const userRole = Cookies.get("userRole");

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Food Waste Reduction
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              {userRole !== "admin" && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/about-us">About Us</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
                  </li>
                </>
              )}

              {!userRole && (
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle btn btn-link"
                    id="navbarDropdown"
                    data-bs-toggle="dropdown"
                  >
                    Login
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <NavLink className="dropdown-item" to="/admin-login">Login as Admin</NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/login">Login as Donor/Receiver</NavLink>
                    </li>
                  </ul>
                </li>
              )}

              {userRole === "admin" && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin-dashboard">Admin Dashboard</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/manage-users">Manage Users</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/accepted-donations">Donations</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/see-feedbacks">Feedbacks</NavLink>
                  </li>
                </>
              )}

              {userRole === "donor" && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/my-donations">My Donations</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/food-donate">Donate Food</NavLink>
                  </li>
                </>
              )}

              {userRole === "receiver" && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/donation-request-list">Available Food</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/receiver-history">Received History</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/feedback-form">Feedback</NavLink>
                  </li>
                </>
              )}

              {userRole && (
                <li className="nav-item">
                  <button className="btn btn-danger ms-3" onClick={this.handleLogout}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
