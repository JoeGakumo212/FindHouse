import React, { useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';

const Utility = () => {
  const [property_name, setPropertyName] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [leaseType, setLeaseType] = useState('');
  const [unitReadings, setUnitReadings] = useState([
    { unit_id: '', reading_date: '', current_reading: '' },
  ]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [showUnitOptions, setShowUnitOptions] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const[property_id,setPropertyId]=useState('')
  const [apiData, setApiData] = useState([]);

  const handlePropertyInputChange = (event) => {
    setPropertyName(event.target.value);
    searchProperties(event.target.value);
  };

  const handlePropertyOptionClick = (option, index) => {
    setPropertyName(option);
    setShowOptions(false);

    // Find the property ID based on the selected property name
    const propertyIndex = propertyOptions.indexOf(option);
    if (propertyIndex !== -1) {
      const selectedPropertyId = unitOptions[propertyIndex];
      setSelectedPropertyId(selectedPropertyId);
      setPropertyId(selectedPropertyId); // Set property_id state

    
    }
  };

  const handleLeaseTypeInputChange = (event) => {
    setLeaseType(event.target.value);
  };

  const handleUnitInputChange = (index, event) => {
    const { name, value } = event.target;
    const readings = [...unitReadings];
    readings[index][name] = value;
    setUnitReadings(readings);

    if (name === 'unit_name') {
      searchUnits(value, index); // Trigger searchUnits when unit_name changes
    }
  };
  const handleUnitOptionClick = (option, index) => {
    const readings = [...unitReadings];
    readings[index].unit_name = option;
    setUnitReadings(readings);
    setShowUnitOptions(false);
  
    // Find the unit_name based on the selected unit_name
    const selectedUnit = apiData.find((property) => property.unit_name === option);
    if (selectedUnit) {
      const unitId = selectedUnit.unit_name;
     
  
      const updatedReadings = [...unitReadings];
      updatedReadings[index].unit_name = unitId;
      setUnitReadings(updatedReadings);
     
     
    }
  };

  

  const searchProperties = async (query) => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const params = {
        property: query,
        page: 0,
        limit: 0,
        sortField: 'updated_at',
        sortDirection: 'desc',
        whereField: '',
        whereValue: '',
      };

      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/properties',
        {
          params,
          headers,
        }
      );

      if (response.status === 200) {
        const apiData = response.data.data;
        const propertyOptions = apiData.map(
          (property) => property.property_name
        );
        const propertyID = apiData.map((property) => property.id);
        setUnitOptions(propertyID);
        setPropertyOptions(propertyOptions);
        console.log("Property Id",propertyID)
        console.log("Hullalalalllllllllllllllllllllllllllllllll");
        console.log('Property Details Name', apiData);
      } else {
        console.error('Response data is not an array:', apiData.data);
      }
    } catch (error) {
      console.error('Error occurred while searching:', error);
    }
  };

  const searchUnits = async (query, index) => {
    setShowUnitOptions(true);
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;
  
      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };
  
      const params = {
        unit: query,
        page: 0,
        limit: 0,
        sortField: 'updated_at',
        sortDirection: 'desc',
        whereField: '',
        whereValue: '',
      };
  
      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/units',
        {
          params,
          headers,
        }
      );
  
      if (response.status === 200) {
        const apiData = response.data.data;
        const unitOptions = apiData.map((property) => property.unit_name);
        setUnitOptions(unitOptions);
  
        const updatedReadings = [...unitReadings];
        updatedReadings[index].unit_name = unitOptions[index]; // Update with unit_name instead of unitID
  
        setUnitReadings(updatedReadings);
  
        console.log('Units Data', apiData);
        console.log('Unit Options', unitOptions);
  
        // Show only one unit_name at a time
        console.log('Selected Unit:', apiData[index]);
  
        // Map unitIDs individually
        apiData.forEach((unit) => {
          console.log('Unit ID:', unit.unit_name);
          console.log("Yes you are omasiah")
        });
      } else {
        console.error('Response data is not an array:', apiData.data);
      }
    } catch (error) {
      console.error('Error occurred while searching:', error);
    }
  };
  const handleSaveUtility = async () => {
    try {
      // Prepare the data to be submitted
      // const data = {
      //   property_name: property_name,
      //   lease_type: leaseType,
      //   unit_readings: unitReadings,
      // };
       const data = {
      property_id: selectedPropertyId,
      utility_id: "601ec7f5-c51b-4468-8eae-0188ef56b6cb",
      unitReadings: unitReadings.map(unit => ({
        unit_id: unit.unit_name,
        reading_date: unit.reading_date,
        current_reading: unit.current_reading
      }))
    };

      // Log the data before submitting
      console.log('Utility data to be submitted:', data);

      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      // Send a POST request to the API endpoint with cookies and headers
      const response = await axios.post(
        'https://cloudagent.co.ke/backend/api/v1/readings',
        data,
        {
          headers: headers,
        }
      );

      if (response.status === 200) {
        console.log('Utility data saved successfully');
        alert('Utility data saved successfully');
        // Reset the form or perform any additional actions upon successful submission
      } else {
        console.error('Failed to save utility data:', response.data);
      }
    } catch (error) {
      console.error('Error occurred while saving utility data:', error);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="PropertyName">Property Name</label>
            <input
              type="text"
              value={property_name}
              onChange={handlePropertyInputChange}
              onClick={() => setShowOptions(true)}
              placeholder="Find property by Name *"
              className="selectpicker form-select"
            />
            {showOptions && propertyOptions.length > 0 && (
              <ul className="autocomplete-options">
                {propertyOptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handlePropertyOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
            
          </div>
        </div>
        <div className="col-lg-6 col-xl-0">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="LEASE">Lease Type</label>
            <select
              value={leaseType}
              onChange={handleLeaseTypeInputChange}
              placeholder="Enter lease type search"
              className="selectpicker form-select"
            >
              <option value="" disabled selected>
                Electricity
              </option>
              <option value="Electricity">Electricity</option>
              <option value="Water">Water</option>
              <option value="Garbage">Garbage</option>
            </select>
          </div>
        </div>
      </div>

      {unitReadings.map((unit, index) => (
        <div className="row" key={index}>
          <div className="col-lg-4">
            <div className="my_profile_setting_input">
              <input
                type="text"
                name="unit_name"
                value={unit.unit_name}
                onChange={(event) => handleUnitInputChange(index, event)}
                placeholder="Unit ID"
                className="form-control"
              />
              {showUnitOptions && unitOptions.length > 0 && (
                <ul className="autocomplete-options">
                  {unitOptions.map((option, i) => (
                    <li
                      key={i}
                      onClick={() => handleUnitOptionClick(option, index)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="my_profile_setting_input">
              <input
                type="date"
                name="reading_date"
                value={unit.reading_date}
                onChange={(event) => handleUnitInputChange(index, event)}
                placeholder="Reading Date"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="my_profile_setting_input">
              <input
                type="text"
                name="current_reading"
                value={unit.current_reading}
                onChange={(event) => handleUnitInputChange(index, event)}
                placeholder="Current Reading"
                className="form-control"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="row">
        <div className="col-lg-12">
          <div className="my_profile_setting_input">
            <button
              className="btn btn-primary float-end btn2 btn-success"
              onClick={handleSaveUtility}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Utility;
