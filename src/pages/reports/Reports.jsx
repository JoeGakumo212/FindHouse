import React, { useState } from 'react';
import Box from '@mui/system/Box';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import axios from 'axios';
import { parseCookies } from 'nookies';
const Report = () => {
  const [activeTab, setActiveTab] = useState('property');
  //  variables decrations for fetching property
  const [findProperty, setFindProperty] = useState();
  const [period, setPeriod] = useState();

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // function to fetch property
  const handleFindPropertyChange = async (event) => {
    const searchTerm = event.target.value;
    setFindProperty(searchTerm);

    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;
      console.log('token', tokenFromCookie);
      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.post(
        `https://cloudagent.co.ke/backend/api/v1/properties/search?query=${searchTerm}`,
        {
            headers: {
              Authorization: `Bearer ${tokenFromCookie}`,
              'Content-Type': 'application/json',
            },
          }
      );
      const propertyData = response.data;
      console.log('token token  324223232', tokenFromCookie);
      // Process the data as needed, e.g., set it to state for rendering.
      console.log(propertyData);
    } catch (error) {
      console.error('Error fetching property data:', error);
    }
  };

  const handlePeriodChange = async (event) => {
        const period = event.target.value; // <-- Use "period" instead of "periodValue"
        setPeriod(period);
        try {
          const cookies = parseCookies();
          const tokenFromCookie = cookies.access_token;
      console.log("token period",tokenFromCookie);
          const headers = {
            Authorization: `Bearer ${tokenFromCookie}`,
            'Content-Type': 'application/json',
          };
          const response = await axios.post(
            `https://cloudagent.co.ke/backend/api/v1/properties/periods?period=${period}`,
            {  headers: {
                Authorization: `Bearer ${tokenFromCookie}`,
                'Content-Type': 'application/json',
              }, }
          );
          const periodsData = response.data;
          console.log("token period 33333333",tokenFromCookie);
          // Process the data as needed, e.g., set it to state for rendering.
          console.log(periodsData);
        } catch (error) {
          console.error('Error fetching periods data:', error);
        }
  };
  const handleDownload = () => {};

  // ends
  return (
    <div>
      <h1>Report</h1>
   

      <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="report tabs">
            <Tab label="Property Report" value="property" />
            <Tab label="General Report" value="general" />
            <Tab label="Journal Tab" value="journal" />
          </TabList>
        </Box>

        <TabPanel value="property">
          <div className="row">
            <div className="col-lg-12">
           

              <div className="col-lg-12">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="propertyTitle">
                    Find Property:
                    <input
                      type="text"
                      value={findProperty}
                      onChange={handleFindPropertyChange}
                      className="selectpicker form-select"
                      placeholder="Find Property by Name"
                    />
                  </label>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="period">
                    Period:
                    <input
                      type="text"
                      value={period}
                      onChange={handlePeriodChange}
                      className="selectpicker form-select form-control"
                      placeholder="Period"
                    />
                  </label>
                </div>
              </div>

              <button onClick={handleDownload}>Download</button>
            </div>
          </div>
        </TabPanel>

        <TabPanel value="general">
          <h2>General Report Content</h2>
          <p>Content for the General Report tab goes here.</p>
        </TabPanel>

        <TabPanel value="journal">
          <h2>Journal Tab Content</h2>
          <p>Content for the Journal tab goes here.</p>
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default Report;
// https://cloudagent.co.ke/backend/api/v1/properties/search
// https://cloudagent.co.ke/backend/api/v1/properties/periods
