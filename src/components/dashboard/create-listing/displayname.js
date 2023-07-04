import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';

const Leases = () => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get('https://cloudagent.co.ke/backend/api/v1/property_support_data', { headers });
      console.log('API Response:', response.data);

      setPropertyTypes(response.data.property_types);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const handleTypeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);

    // Find the property type object based on the selected value
    const selectedType = propertyTypes.find((type) => type.display_name === selectedValue);

    if (selectedType) {
      console.log('Selected Property Type:', selectedType.display_name);
      console.log('Selected Property Type ID:', selectedType.id);
    }
  };
  // sending the selected display name
  const payload = {
    propertyType: selectedType.display_name,
    propertyTypeId: selectedType.id,
  };
  return (
    <div className="col-lg-6">
      <h2>Property Types</h2>
      <div className="my_profile_setting_input form-group">
        <label htmlFor="propertyType">Select Property Type:</label>
        <select id="propertyType" value={selectedType} onChange={handleTypeChange} className="selectpicker form-select">
          <option value="">Select</option>
          {propertyTypes.map((type) => (
            <option key={type.id} value={type.display_name}>
              {type.display_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Leases;
