import React, { useState } from "react";
import axios from "axios";
import "../styles/FoodDonate.css";

const FoodDonate = () => {
  const [formData, setFormData] = useState({
    email: "", // ✅
    food_category: "Vegetarian",
    food_name: "",
    quantity: "",
    expiry_date: "",
    preparation_date: "",
    storage_instructions: "",
    terms_accepted: false,
  });

  const [showTerms, setShowTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.terms_accepted) {
      alert("Please accept the terms and conditions.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5001/donate",
        formData,
        { withCredentials: true }
      );
      alert(res.data.message);

      // ✅ reset including email
      setFormData({
        email: "",
        food_category: "Vegetarian",
        food_name: "",
        quantity: "",
        expiry_date: "",
        preparation_date: "",
        storage_instructions: "",
        terms_accepted: false,
      });
      setShowTerms(false);
    } catch (err) {
      alert("Error submitting the form");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Food Donation Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Email (used to identify donor):</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Food Category:</label>
        <select
          name="food_category"
          value={formData.food_category}
          onChange={handleChange}
        >
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
        </select>

        <label>Food Name:</label>
        <input
          type="text"
          name="food_name"
          value={formData.food_name}
          onChange={handleChange}
          required
        />

        <label>Quantity (kg/servings):</label>
        <input
          type="text"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <label>Expiry Date and Time (for packaged items):</label>
        <input
          type="datetime-local"
          name="expiry_date"
          value={formData.expiry_date}
          onChange={handleChange}
        />

        <label>Preparation Date and Time (for cooked food):</label>
        <input
          type="datetime-local"
          name="preparation_date"
          value={formData.preparation_date}
          onChange={handleChange}
        />

        <label>Storage Instructions:</label>
        <textarea
          name="storage_instructions"
          value={formData.storage_instructions}
          onChange={handleChange}
        ></textarea>

        <div className="terms-checkbox">
          <input
            type="checkbox"
            name="terms_accepted"
            checked={formData.terms_accepted}
            onChange={handleChange}
            required
            id="terms"
          />
          <label htmlFor="terms" className="terms-text">
            I accept the{" "}
            <a
              href="#"
              className="terms-link"
              onClick={(e) => {
                e.preventDefault();
                setShowTerms((show) => !show);
              }}
            >
              Terms and Conditions
            </a>
          </label>
        </div>

        {showTerms && (
          <p className="terms-notice">
            By submitting this form, the donor agrees that they are solely
            responsible for the quality and safety of the donated food. The
            recipient organization is not liable for any issues arising from
            the consumption of the donated food. The donor confirms that the
            food provided is safe, properly stored, and free from
            contamination.
          </p>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FoodDonate;
