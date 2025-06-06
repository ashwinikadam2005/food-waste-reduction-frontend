// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/Login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [csrfToken, setCsrfToken] = useState("");
//   const navigate = useNavigate();

//   // Fetch CSRF token when component mounts
//   useEffect(() => {
//     axios
//       .get("http://localhost:5001/csrf-token", { withCredentials: true })
//       .then((res) => setCsrfToken(res.data.csrfToken))
//       .catch((err) => console.error("CSRF token error:", err));
//   }, []);

// const handleLogin = async (e) => {
//   e.preventDefault();
//   setError("");

//   try {
//     const response = await axios.post(
//       "http://localhost:5001/login",
//       { email, password },
//       {
//         headers: { "X-CSRF-Token": csrfToken },
//         withCredentials: true,
//       }
//     );

//     if (response.status === 200) {
//       const { role, donor } = response.data;

//       // Store user role
//       localStorage.setItem("userRole", role);

//       // Store donor information with email
//       if (donor) {
//         const donorWithEmail = { ...donor, email };
//         localStorage.setItem("donor", JSON.stringify(donorWithEmail));
//       } else {
//         console.warn("Donor data not found in response");
//       }

//       alert(response.data.message);
//       navigate("/");
//       window.location.reload(); // Refresh app state
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     if (error.response?.status === 401) {
//       setError("Invalid email or password!");
//     } else {
//       setError("Something went wrong. Please try again later.");
//     }
//   }
// };
  
//   return (
//     <div className="login-container">
//       <div className="form-container">
//         <h2>Login</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>
//         <p>
//           Not a member? <a href="/donar-registeration">Sign Up</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5001/csrf-token", { withCredentials: true })
      .then((res) => setCsrfToken(res.data.csrfToken))
      .catch((err) => console.error("CSRF token error:", err));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5001/login",
        { email, password },
        {
          headers: { "X-CSRF-Token": csrfToken },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { role, donor, message } = response.data;

        // Store role and email in cookies
        Cookies.set("userRole", role, { expires: 7 });
        Cookies.set("userEmail", email, { expires: 7 });

        if (donor) {
          Cookies.set("donor", JSON.stringify({ ...donor, email }), { expires: 7 });
        }

        alert(message);

        // Only allow donor and receiver roles
        if (role === "donor") {
          navigate("/");
          window.location.reload();
        } else if (role === "receiver") {
          navigate("/");
          window.location.reload();
        } else {
          // Invalid role for this login component
          setError("Unauthorized role. Please use the appropriate login portal.");
          Cookies.remove("userRole");
          Cookies.remove("userEmail");
          Cookies.remove("donor");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.status === 401) {
        setError("Invalid email or password!");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Not a member? <a href="/donar-registeration">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
