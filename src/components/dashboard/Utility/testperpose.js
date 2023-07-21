import  { useState ,useEffect} from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';


import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';

const Utility = () => {
    const [utilities, setUtilities] = useState([]);
  const [leaseType, setLeaseType] = useState('');
  const [selectedUtilityId, setSelectedUtilityId] = useState('');

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

      const response = await axios.get('https://cloudagent.co.ke/backend/api/v1/utilities', { headers });
      console.log('API Response:', response.data);

      setUtilities(response.data.data); // Update to access the 'data' property correctly
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const handleLeaseTypeInputChange = (event) => {
    const selectedValue = event.target.value;
    setLeaseType(selectedValue);

    // Find the utility object based on the selected value
    const selectedUtility = utilities.find((utility) => utility.utility_name === selectedValue);

    if (selectedUtility) {
      setSelectedUtilityId(selectedUtility.id);
      console.log("elected Utility:",selectedUtility.utility_name);
      console.log("Selected utility ID:",selectedUtility.id);
    }
  };
  
// handle submit utility_id: selectedUtilityId,
  return (
    <>
     <div className="col-lg-6 col-xl-0">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="LEASE">Utility Type</label>
            <select
              value={leaseType}
              onChange={handleLeaseTypeInputChange}
              className="selectpicker form-select">
              {utilities.map((utility) => (
                <option key={utility.id} value={utility.utility_name}>
                  {utility.utility_display_name}
                </option>
              ))}
            </select>
          </div>
        </div>
          
      
     
   </>
  );
};

export default Utility;
