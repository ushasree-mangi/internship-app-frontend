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
    propertyTitle: '',
    area: '',
    location:'',
    description: '',
    price: '',
    imgUrl: '',
    propertyType:'rent',
    bedrooms: '',
    bathrooms: '',
    size: '',
    parking: '',
    amenities: '',
    furnishingStatus: '',
    facing: '',
    waterSupply: '',
    floor: '',
    gatedSecurity: '',
  });

  const [errors, setErrors] = useState({});
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm=()=>{
    const newErrors={}

    // Client-side validation 
    if (!formData.propertyTitle) {
      newErrors.propertyTitle=true
    }
    if(!formData.price){
       newErrors.price=true
    }

    if(!formData.description){
      newErrors.description=true
    }

    if(!formData.imgUrl){
      newErrors.imgUrl=true
    }

    if(!formData.location){
      newErrors.location=true
    }

    if(!formData.propertyType){
      newErrors.propertyType=true
    }

    setErrors(newErrors)
   console.log(newErrors)
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    
   console.log(validateForm())

    
    if(validateForm()){
        const apiUrl="http://localhost:4000/add-properties"

        const body=formData

        const token =Cookies.get("jwt_token")

        const headers= {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          }

        const response=await axios.post(apiUrl,body ,{headers})

        console.log(response)
        if(response.status===201){
          alert("Property added successfully")
          setFormData({ propertyTitle: '',
            area: '',
            location:'',
            description: '',
            price: '',
            imgUrl: '',
            propertyType:'',
            bedrooms: '',
            bathrooms: '',
            size: '',
            parking: '',
            amenities: '',
            furnishingStatus: '',
            facing: '',
            waterSupply: '',
            floor: '',
            gatedSecurity: '',
          })
        }else{
          alert("Error occurred while adding Property")
          setFormData({ propertyTitle: '',
            area: '',
            location:'',
            description: '',
            price: '',
            imgUrl: '',
            propertyType:'',
            bedrooms: '',
            bathrooms: '',
            size: '',
            parking: '',
            amenities: '',
            furnishingStatus: '',
            facing: '',
            waterSupply: '',
            floor: '',
            gatedSecurity: '',
          })
        }
        console.log(response.body)
    
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

export default AddPropertyPage;*/

