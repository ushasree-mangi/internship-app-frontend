import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import './PropertiesPage.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchType, setSearchType] = useState('Available');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get query params from the URL
  const locationSearch = useLocation();
  const queryParams = new URLSearchParams(locationSearch.search);
  const searchTypeParam = queryParams.get('search_type');
  const searchQuery = queryParams.get('query');

  useEffect(() => {
    setSearchType(searchTypeParam || 'Available');
    setLocation(searchQuery || '');
    fetchProperties(searchTypeParam, searchQuery, price);
  }, [searchTypeParam, searchQuery, price]);

  // Fetch properties based on filters
  const fetchProperties = async (searchType, query, price) => {
    const token = Cookies.get('jwt_token');
    const url = `http://localhost:4000/properties?search_type=${searchType}&location=${query}&price=${price}`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    try {
      const response = await axios.get(url, { headers });
      setProperties(response.data);
      setFilteredProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    await fetchProperties(searchType, location, price);
    setShowFilters(false); // Close filters on mobile after submit
  };

  return (
    <div className="propertiespage-container">
      {/* Mobile Filter Toggle Button */}
      <button 
        className="mobile-filter-toggle"
        onClick={() => setShowFilters(true)}
      >
        Show Filters
      </button>

      {/* Overlay for Mobile Filters */}
      <div 
        className={`sidebar-overlay ${showFilters ? 'active' : ''}`} 
        onClick={() => setShowFilters(false)}
      />

      {/* Filter Sidebar */}
      <div className={`propertiespage-filter-sidebar ${showFilters ? 'active' : ''}`}>
        <button 
          className="sidebar-close-btn"
          onClick={() => setShowFilters(false)}
        >
          &times;
        </button>
        
        <h3>Filter</h3>
        <form onSubmit={handleFilterSubmit}>
          <div className="propertiespage-filter-option">
            <label htmlFor="searchType">Property Type:</label>
            <select
              id="searchType"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="Rented">Rented</option>
            </select>
          </div>
          <div className="propertiespage-filter-option">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
            />
          </div>
          <div className="propertiespage-filter-option">
            <label htmlFor="priceRange">Price Range:</label>
            <input
              type="text"
              id="priceRange"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g., 5000-10000"
            />
          </div>
          
          <button type="submit">Apply Filters</button>
        </form>
      </div>

      {/* Property Listings */}
      <div className="propertiespage-property-listings">
        <h2>{searchType} Properties</h2>
        <div className="propertiespage-listing">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div className="propertiespage-property-card" key={property.propertyId}>
                {/* Image Section */}
                <div className="propertiespage-property-photo">
                  <img src={property.imgUrl} alt={property.propertyTitle} />
                </div>

                {/* Details Section */}
                <div className="propertiespage-property-details">
                  <div className="propertiespage-row">
                    <h3 className="propertiespage-property-title">{property.propertyTitle}</h3>
                  </div>
                  <div className="propertiespage-row">
                    <p className="propertiespage-address">
                      {property.location}
                    </p>
                  </div>
                  <div className="propertiespage-row">
                    <p className="propertiespage-price">
                      Price: ₹{property.price}
                    </p>
                    <p className="propertiespage-builtup">Built-up Area: {property.builtUpArea} sqft</p>
                    <p className="propertiespage-property-status">Status: {property.propertyStatus}</p>
                  </div>
                  <div className="propertiespage-row">
                    <p className="propertiespage-description">{property.description}</p>
                  </div>
                </div>

                {/* Buttons Section */}
                <div className="propertiespage-action-buttons">
                  <button className="propertiespage-view-details">View Details</button>
                  <button className="propertiespage-save-property">Save Property</button>
                  <button>Send Message Request</button>
                </div>
              </div>
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;