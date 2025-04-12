// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./OtpVerification.css";

// const OtpVerification = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email || "";

//   const [otp, setOtp] = useState("");
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setOtp(e.target.value);
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:5000/verify-otp", {
//         email,
//         otp,
//       });

//       if (response.data.message.includes("OTP Verified")) {
//         setMessage("✅ OTP Verified! Registration Successful.");
//         setTimeout(() => {
//           navigate("/login");
//         }, 2000);
//       } else {
//         setMessage("❌ Invalid OTP. Please try again.");
//       }
//     } catch (error) {
//       console.error("OTP Verification Error:", error);
//       setMessage("⚠️ Verification failed! Please try again.");
//     }
//   };

//   return (
//     <div className="otp-wrapper">
//       <div className="otp-container">
//         <h2>Enter OTP</h2>
//         {message && <p className="message">{message}</p>}

//         <form onSubmit={handleVerifyOtp} className="otp-form">
//           <input
//             type="text"
//             name="otp"
//             placeholder="Enter 6-digit OTP"
//             value={otp}
//             onChange={handleChange}
//             maxLength="6"
//             required
//           />
//           <button type="submit">Verify OTP</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OtpVerification;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/OtpVerification.css";

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => setOtp(e.target.value);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/verify-otp",
        { email, otp },
        { withCredentials: true }
      );

      if (response.data.message.includes("OTP Verified")) {
        setMessage("✅ OTP Verified! Registration Successful.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("❌ Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      setMessage("⚠️ Verification failed! Please try again.");
    }
  };

  return (
    <div className="otp-wrapper">
      <div className="otp-container">
        <h2>Enter OTP</h2>
        {message && <p className="message">{message}</p>}

        <form onSubmit={handleVerifyOtp} className="otp-form">
          <input
            type="text"
            name="otp"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={handleChange}
            maxLength="6"
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
    