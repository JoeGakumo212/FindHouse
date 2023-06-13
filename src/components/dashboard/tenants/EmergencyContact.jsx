import  { useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';

const EmergencyContact = () => {
  const [employment_status, setEmployment_status] = useState('');
  const [employment_position, setEmployment_position] = useState('');
  const [employer_contact_phone, setEmployer_contact_phone] = useState('');
  const [employer_contact_email, setEmployer_contact_email] = useState('');
  const [employment_postal_address, setEmployment_postal_address] =    useState('');
  const [employment_physical_address, setEmployment_physical_address] =    useState('');
  const [showNextofKin, setShowNextofKin] = useState(true);
 

  const handleBackClick1 = () => {
    setShowNextofKin(true);
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
     // Validate input fields
     const errors = {};
     if (!employment_status) {
       errors.employment_status = 'Employment status is required';
     }
     if (!employment_position) {
       errors.employment_position = 'Employment position is required';
     }
     if (!employer_contact_phone) {
       errors.employer_contact_phone = 'Employer contact phone is required';
     }
     if (!employer_contact_email) {
       errors.employer_contact_email = 'Employer contact email is required';
     }
     if (!employment_postal_address) {
       errors.employment_postal_address = 'Employment postal address is required';
     }
     if (!employment_physical_address) {
       errors.employment_physical_address = 'Employment physical address is required';
     }
 
       // If there are errors, display alerts and return
    if (Object.keys(errors).length > 0) {
      for (const field in errors) {
        alert(errors[field]);
      }
      return;
    }
   
    // Store the captured data in an object
    const capturedData = {
      employment_status,
      employment_position,
      employer_contact_phone,
      employer_contact_email,
      employment_postal_address,
      employment_physical_address
    };

    // Log the captured data
     // Log the captured data
 
    const headers = {
      // Set any headers required for the request
    };

    // Combine all the data into a single object
    const dataToSend = {
      ...stagedData,
      ...capturedData,
      ...tenantData,
    };
  try {
   // Retrieve the token from cookies
   const cookies = parseCookies();
    const tokenFromCookie = cookies.access_token;
console.log("Token teke:",tokenFromCookie)
   // Set the request headers
   const headers = {
     'Authorization': `Bearer ${tokenFromCookie}`,
     'Content-Type': 'application/json'
   };

   // Send a POST request to the endpoint with the captured data,stageData and TenantData
   const response = await axios.post('https://cloudagent.co.ke/backend/api/v1/tenants', dataToSend, { headers });

   // Handle the response
   console.log('Response:', response.data);
   alert('Data submitted successfully!');
    // Reset form fields
    // ...
  } catch (error) {
    // Handle any errors
    console.error('Error:', error);
  }
};
  
  return (
    <>
    {showNextofKin && (
      <div className="row">
        <div className="col-lg-4 col-xl-0">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInput26">Employment Status</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput26"
              placeholder="Employment Status"
              value={employment_status}
              onChange={({ target }) => setEmployment_status(target?.value)}
            />
          </div>
        </div>

        <div className="col-lg-4 col-xl-0">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInput27">Employment Position</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput27"
              placeholder="Employment Position"
              value={employment_position}
              onChange={({ target }) => setEmployment_position(target?.value)}
            />
          </div>
        </div>

        <div className="col-lg-4 col-xl-0">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInput28">
              Employer Contact Phone
            </label>
            <input
              type="number"
              className="form-control"
              id="formGroupExampleInput28"
              placeholder="Employer Contact Phone"
              value={employer_contact_phone}
              onChange={({ target }) =>
                setEmployer_contact_phone(target?.value)
              }
            />
          </div>
        </div>

        <div className="col-lg-4 col-xl-0">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInput29">
              Employer Contact Email
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput29"
              placeholder="Employer Contact Email"
              value={employer_contact_email}
              onChange={({ target }) =>
                setEmployer_contact_email(target?.value)
              }
            />
          </div>
        </div>

        <div className="col-lg-4 col-xl-0">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInput30">
              Employment Postal Address
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput30"
              placeholder="Employment Postal Address"
              value={employment_postal_address}
              onChange={({ target }) =>
                setEmployment_postal_address(target?.value)
              }
            />
          </div>
        </div>

        <div className="col-lg-4 col-xl-0">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInput31">
              Employment Physical Address
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput31"
              placeholder="Employment Physical Address"
              value={employment_physical_address}
              onChange={({ target }) =>
                setEmployment_physical_address(target?.value)
              }
            />
          </div>
        </div>
        <div className="col-xl-12">
        <div className="my_profile_setting_input float-start fn-520">
        <button className="btn btn3 btn-dark" onClick={handleBackClick1}>
            Back
          </button>
      </div>
          <div className="my_profile_setting_input float-end fn-520">
            <button className="btn btn2" onClick={handleSubmit}>Save</button>
          </div>
        </div>
 
      </div>

      
       )}
    </>
 
  );
};

export default EmergencyContact;
