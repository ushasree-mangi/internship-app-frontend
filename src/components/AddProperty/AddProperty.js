import React, { useState } from 'react';
import axios from 'axios';
import './AddProperty.css';

const AddPropertyPage=()=> {
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    description: '',
    price: '',
    mainImage: '',
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

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name || !formData.area || !formData.price || !formData.mainImage) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsLoading(true); // Start loading
    /*
    axios
      .post('http://localhost:5000/api/products', formData)
      .then(() => {
        setErrorMessage('');
        navigate('/');
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data?.message || 'Error adding property. Please try again.'
        );
        console.error('Error adding property:', error);
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
      }); */
  };

  return (
    <div className="add-property-container">
      <h1>Add New Property</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <input
          type="text"
          name="name"
          placeholder="Property Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="area"
          placeholder="Property Area"
          value={formData.area}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="mainImage"
          placeholder="Image URL"
          value={formData.mainImage}
          onChange={handleChange}
          required
        />

        {/* Additional Fields */}
        <input
          type="number"
          name="bedrooms"
          placeholder="Number of Bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
        />
        <input
          type="number"
          name="bathrooms"
          placeholder="Number of Bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
        />
        <input
          type="text"
          name="size"
          placeholder="Property Size (e.g., 1500 sq. ft.)"
          value={formData.size}
          onChange={handleChange}
        />
        <input
          type="text"
          name="parking"
          placeholder="Parking Availability"
          value={formData.parking}
          onChange={handleChange}
        />
        <input
          type="text"
          name="amenities"
          placeholder="Amenities (e.g., Wi-Fi, Pool)"
          value={formData.amenities}
          onChange={handleChange}
        />
        <select
          name="furnishingStatus"
          value={formData.furnishingStatus}
          onChange={handleChange}
        >
          <option value="">Furnishing Status</option>
          <option value="Furnished">Furnished</option>
          <option value="Unfurnished">Unfurnished</option>
        </select>
        <input
          type="text"
          name="facing"
          placeholder="Facing (e.g., East, North)"
          value={formData.facing}
          onChange={handleChange}
        />
        <select
          name="waterSupply"
          value={formData.waterSupply}
          onChange={handleChange}
        >
          <option value="">Water Supply</option>
          <option value="Corporation">Corporation</option>
          <option value="Borewell">Borewell</option>
          <option value="Both">Both</option>
        </select>
        <input
          type="text"
          name="floor"
          placeholder="Floor (e.g., Ground, 1/2)"
          value={formData.floor}
          onChange={handleChange}
        />
        <select
          name="gatedSecurity"
          value={formData.gatedSecurity}
          onChange={handleChange}
        >
          <option value="">Gated Security</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
}

export default AddPropertyPage;