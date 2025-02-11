import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Cookies from "js-cookie";  // Import Cookies for authentication
import "./AddProperty.css";

// Fix for default marker icon in Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const AddPropertyPage = () => {
  const [formData, setFormData] = useState({
    propertyTitle: "",
    price: "",
    propertyType: "",
    description: "",
    address: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    priceNegotiable: false,
    builtUpArea: "",
    carpetArea: "",
    propertyAge: "",
    wallpaper: null,
    supportingImages: [],
    latitude: null,
    longitude: null,
  });

  // Get user's current location on page load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({ ...prev, latitude, longitude }));
        fetchLocationDetails(latitude, longitude);
      },
      (error) => console.error("Error getting user location:", error),
      { enableHighAccuracy: true }
    );
  }, []);

  // Fetch location details using reverse geocoding
  const fetchLocationDetails = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );

      if (response.data && response.data.address) {
        const { address } = response.data;

        setFormData((prev) => ({
          ...prev,
          address: address.road || address.village || address.hamlet || "",
          street: address.suburb || address.neighbourhood || "",
          city: address.city || address.town || address.village || "",
          state: address.state || "",
          pinCode: address.postcode || "",
        }));
      } else {
        console.error("Location data is missing in response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  // Handle map click and update location details
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setFormData((prev) => ({ ...prev, latitude: lat, longitude: lng }));
    fetchLocationDetails(lat, lng);
  };

  // Custom component to handle map events
  const LocationPicker = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ **Handle Form Submission**
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission

    try {
      const apiUrl = "https://gts-rental-app.onrender.com/add-properties";
      const token = Cookies.get("jwt_token"); // Get JWT token from cookies

      if (!token) {
        alert("Authentication token is missing!");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      const response = await axios.post(apiUrl, formData, { headers });

      console.log(response);

      if (response.status === 201) {
        alert("Property added successfully!");
      } else {
        alert("Error occurred while adding property.");
      }
    } catch (error) {
      console.error("Error adding property:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="add-property-container">
      <h1 className="form-title">Add New Property</h1>
      <form className="property-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Property Title</label>
            <input
              type="text"
              name="propertyTitle"
              value={formData.propertyTitle}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Property Type</label>
            <input
              type="text"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Street</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Pin Code</label>
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="map-section">
          <h3>Select Property Location</h3>
          {formData.latitude !== null && formData.longitude !== null ? (
            <MapContainer
              center={[formData.latitude, formData.longitude]}
              zoom={13}
              className="location-map"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[formData.latitude, formData.longitude]}
                icon={customIcon}
              />
              <LocationPicker />
            </MapContainer>
          ) : (
            <p>Loading map...</p>
          )}
        </div>
        <button type="submit" className="submit-btn">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddPropertyPage;
