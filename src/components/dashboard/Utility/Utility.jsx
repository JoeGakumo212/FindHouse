import React, { useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import FileSaver from 'file-saver';

import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';

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
  const [property_id, setPropertyId] = useState('');
  const [apiData, setApiData] = useState([]);
  const [entryType, setEntryType] = useState('manual');
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState(null);

  const fileInputRef = useRef(null);

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
    const selectedUnit = apiData.find(
      (property) => property.unit_name === option
    );
    if (selectedUnit) {
      const unitId = selectedUnit.unit_name;

      const updatedReadings = [...unitReadings];
      updatedReadings[index].unit_name = unitId;
      setUnitReadings(updatedReadings);
    }
  };

  const handleAutoImport = async () => {
    // Handle the auto import logic here using the selectedFile
    // You can use a library like PapaParse or XLSX to parse the CSV or Excel file
  };

  const handleDownloadCSV = async () => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };
     
      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/readings/csv_template',
        {
          responseType: 'blob', // Set the response type to blob
        }
      );

      const fileName = 'template.csv';

      // Use the FileSaver library to save the file
      FileSaver.saveAs(response.data, fileName);
    } catch (error) {
      console.error('Error occurred while downloading CSV:', error);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };
     
      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/readings/excel_template',
        {
          headers,
          responseType: 'blob',
        }
      );

      const fileName = 'template.xlsx';

      saveAs(response.data, fileName);
    } catch (error) {
      console.error('Error occurred while downloading Excel:', error);
    }
  };
  // handle upload
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleUpload = () => {
    if (file) {
      console.log('Uploading file:', file);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;

        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        axios
          .post(
            'https://cloudagent.co.ke/backend/api/v1/readings/upload_readings',
            formData,
            { headers }
          )
          .then((response) => {
            console.log('Upload was successful:', response.data);
            alert('Upload Successful');
            toast.success('Upload was successful', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000, // Close the toast after 3 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // Handle the response after successful upload
            fileInputRef.current.value = ''; // Reset file input value
          })
          .catch((error) => {
            console.error('Upload error:', error);
            // Handle the error if the upload fails
          });
      } catch (error) {
        console.error('Error occurred while uploading:', error);
      }
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
        console.log('Property Id', propertyID);

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
          console.log('Yes you are omasiah');
        });
      } else {
        console.error('Response data is not an array:', apiData.data);
      }
    } catch (error) {
      console.error('Error occurred while searching:', error);
    }
  };

  // save the utility
  // const handleSaveUtility = async () => {
  //   try {
  //     // Prepare the data to be submitted
  //     // const data = {
  //     //   property_name: property_name,
  //     //   lease_type: leaseType,
  //     //   unit_readings: unitReadings,
  //     // };
  //     const data = {
  //       property_id: selectedPropertyId,
  //       utility_id: '601ec7f5-c51b-4468-8eae-0188ef56b6cb',
  //       unitReadings: unitReadings.map((unit) => ({
  //         unit_id: unit.unit_name,
  //         reading_date: unit.reading_date,
  //         current_reading: unit.current_reading,
  //       })),
  //     };

  //     // Log the data before submitting
  //     console.log('Utility data to be submitted:', data);

  //     const cookies = parseCookies();
  //     const tokenFromCookie = cookies.access_token;

  //     const headers = {
  //       Authorization: `Bearer ${tokenFromCookie}`,
  //       'Content-Type': 'application/json',
  //     };

  //     // Send a POST request to the API endpoint with cookies and headers
  //     const response = await axios.post(
  //       'https://cloudagent.co.ke/backend/api/v1/readings',
  //       data,
  //       {
  //         headers: headers,
  //       }
  //     );

  //     if (response.status === 200) {
  //       console.log('Utility data saved successfully');
  //       alert('Utility data saved successfully');
  //       // Reset the form or perform any additional actions upon successful submission
  //     } else {
  //       console.error('Failed to save utility data:', response.data);
  //     }
  //   } catch (error) {
  //     console.error('Error occurred while saving utility data:', error);
  //   }
  // };
  const handleSaveUtility = async () => {
    try {
      // Validate input fields
      if (!selectedPropertyId) {
        alert('Please select a property');
        return;
      }
  
      if (unitReadings.length === 0) {
        alert('Please add unit readings');
        return;
      }
  
      const hasEmptyReading = unitReadings.some((unit) => !unit.current_reading || !unit.reading_date);
      if (hasEmptyReading) {
        alert('Please provide readings and dates for all units');
        return;
      }
  
      // Prepare the data to be submitted
      const data = {
        property_id: selectedPropertyId,
        utility_id: '601ec7f5-c51b-4468-8eae-0188ef56b6cb',
        unitReadings: unitReadings.map((unit) => ({
          unit_id: unit.unit_name,
          reading_date: unit.reading_date,
          current_reading: unit.current_reading,
        })),
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
  
        // Reset the input fields and radio button selection
        setPropertyName('');
        setLeaseType(''); // Assuming it's a string or initial value
        setUnitReadings([]);
        setManualRadio(false); // Assuming it's a boolean state variable
           // Refresh the page
      window.location.reload();
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

      <div className="row">
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <div className="form-check">
              <input
                type="radio"
                name="entryType"
                value="manual"
                checked={entryType === 'manual'}
                onChange={() => setEntryType('manual')}
                className="form-check-input"
              />

              <label htmlFor="ENTRY_TYPE">Manual Entry</label>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <div className="form-check">
              <input
                type="radio"
                name="entryType"
                value="auto"
                checked={entryType === 'auto'}
                onChange={() => setEntryType('auto')}
                className="form-check-input"
              />

              <label htmlFor="ENTRY_TYPE"> Auto Import (CSV or Excel)</label>
            </div>
          </div>
        </div>
      </div>

      {entryType === 'manual' && (
        <>
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
      )}

      {entryType === 'auto' && (
        <>
          <div className="row">
            <div className="col-lg-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="fileUpload">Upload File</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onChange={handleFileUpload}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-lg-2 mt-5">
              <button
                className="btn btn-success float-end"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="my_profile_setting_input">
                <button
                  className="btn btn-primary  btn2 btn-success"
                  onClick={handleDownloadCSV}
                >
                  Download Template File (CSV)
                </button>

                <button
                  className="btn btn-primary float-end btn2 btn-success"
                  onClick={handleDownloadExcel}
                >
                  Download Template File (Excel)
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Utility;
