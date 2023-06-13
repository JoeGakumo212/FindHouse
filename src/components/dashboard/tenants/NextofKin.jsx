import React, { useState } from 'react';
import EmergencyContact from './EmergencyContact';

const NextofKin = ( {handleBackClick}) => {
  const [next_of_kin_name, setNext_of_kin_name] = useState('');
  const [next_of_kin_phone, setNext_of_kin_phone] = useState('');
  const [next_of_kin_relation, setNext_of_kin_relation] = useState('');
  const [emergency_contact_name, setEmergency_contact_name] = useState('');
  const [emergency_contact_phone, setEmergency_contact_phone] = useState('');
  const [emergency_contact_email, setEmergency_contact_email] = useState('');
  const [emergency_contact_relationship, setEmergency_contact_relationship] =    useState('');
  const [    emergency_contact_postal_address,    setEmergency_contact_postal_address,  ] = useState('');
  const [    emergency_contact_physical_address,    setEmergency_contact_physical_address,  ] = useState('');
  
  const [stagedData, setStagedData] = useState({});
  const [showNextofKin, setShowNextofKin] = useState(true);
  const [errors, setErrors] = useState({});

  const handleNextClick = () => {
     // Validate the input fields
     const validationErrors = {};
     if (!next_of_kin_name) {
       validationErrors.next_of_kin_name = 'Next of Kin Name is required';
     }
     if (!next_of_kin_phone) {
       validationErrors.next_of_kin_phone = 'Next of Kin Phone is required';
     }
     if (!next_of_kin_relation) {
       validationErrors.next_of_kin_relation = 'Next of Kin Relation is required';
     }
     if (!emergency_contact_name) {
       validationErrors.emergency_contact_name = 'Emergency Contact Name is required';
     }
     if (!emergency_contact_phone) {
       validationErrors.emergency_contact_phone = 'Emergency Contact Phone is required';
     }
     if (!emergency_contact_email) {
       validationErrors.emergency_contact_email = 'Emergency Contact Email is required';
     }
     if (!emergency_contact_relationship) {
       validationErrors.emergency_contact_relationship = 'Emergency Contact Relationship is required';
     }
     if (!emergency_contact_postal_address) {
       validationErrors.emergency_contact_postal_address = 'Emergency Contact Postal Address is required';
     }
     if (!emergency_contact_physical_address) {
       validationErrors.emergency_contact_physical_address = 'Emergency Contact Physical Address is required';
     }
     
     // If there are validation errors, set them and return
     if (Object.keys(validationErrors).length > 0) {
       setErrors(validationErrors);
       alert('Please fill in all required fields');
       return;
     }
 
     // If no validation errors, proceed to the next page/component
    // Capture the data before proceeding
    const stagedData = {
      next_of_kin_name,
      next_of_kin_phone,
      next_of_kin_relation,
      emergency_contact_name,
      emergency_contact_phone,
      emergency_contact_email,
      emergency_contact_relationship,
      emergency_contact_postal_address,
      emergency_contact_physical_address,
    };
  
    // Set the staged data
    setStagedData(stagedData);
    console.log("Staged data:",stagedData)
    // Show the next page/component
    setShowNextofKin(false);
  };



  const handleBackClick1 = () => {
    setShowNextofKin(false);
  };
  // In your component
const navigateToEmergencyContact = () => {
  // Assuming stagedData and tenantData are available here
  const url = `/emergency-contact?stagedData=${encodeURIComponent(JSON.stringify(stagedData))}&tenantData=${encodeURIComponent(JSON.stringify(tenantData))}`;
  return <Link to={url}>Go to Emergency Contact</Link>;
}
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your submission logic or API call here using the `tenantData` state
    console.log('Tenant Data:', tenantData);
    // Clear the form after submission if needed
    setTenantData({
      next_of_kin_name: '',
      next_of_kin_phone: '',
      next_of_kin_relation: '',
      emergency_contact_name: '',
      emergency_contact_phone: '',
      emergency_contact_email: '',
      emergency_contact_relationship: '',
      emergency_contact_postal_address: '',
      emergency_contact_physical_address: '',
    });
  };
  return (
    <>
     {showNextofKin && (
      <div className="row">
        <div className="col-lg-4 col-xl-0">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInput17">Next of Kin Name</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput17"
              placeholder="Next of Kin Name"
              value={next_of_kin_name}
              onChange={({ target }) => setNext_of_kin_name(target?.value)}
            />
          </div>
        </div>

        <div className="col-lg-4 col-xl-0">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInput18">Next of Kin Phone</label>
            <input
              type="number"
              className="form-control"
              id="formGroupExampleInput18"
              placeholder="Next of Kin Phone"
              value={next_of_kin_phone}
              onChange={({ target }) => setNext_of_kin_phone(target?.value)}
            />
          </div>
        </div>
        <div className="col-lg-4 col-xl-0">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInput19">
              Next of Kin Relation
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput19"
              placeholder="Next of Kin Relation"
              value={next_of_kin_relation}
              onChange={({ target }) => setNext_of_kin_relation(target?.value)}
            />
          </div>
        </div>

        <div className="col-lg-4 col-xl-0">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInput20">
              Emergency Contact Name
            </label>
            <input
              type="number"
              className="form-control"
              id="formGroupExampleInput20"
              placeholder="Emergency Contact Name"
              value={emergency_contact_name}
              onChange={({ target }) =>
                setEmergency_contact_name(target?.value)
              }
            />
          </div>
        </div>

        <div className="col-lg-4 col-xl-0">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInput21">
              Emergency Contact Phone
            </label>
            <input
              type="number"
              className="form-control"
              id="formGroupExampleInput21"
              placeholder="Emergency Contact Phone"
              value={emergency_contact_phone}
              onChange={({ target }) =>
                setEmergency_contact_phone(target?.value)
              }
            />
          </div>
        </div>

        <div className="col-lg-4 col-xl-0">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInput22">
              Emergency Contact Email
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput22"
              placeholder="Emergency Contact Email"
              value={emergency_contact_email}
              onChange={({ target }) =>
                setEmergency_contact_email(target?.value)
              }
            />
          </div>
        </div>

        <div className="col-lg-4 col-xl-0">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInput23">
              Emergency Contact Relationship
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput23"
              placeholder="Emergency Contact Relationship"
              value={emergency_contact_relationship}
              onChange={({ target }) =>
                setEmergency_contact_relationship(target?.value)
              }
            />
          </div>
        </div>

        <div className="col-lg-4 col-xl-0">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInput24">
              Emergency Contact Postal Address
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput24"
              placeholder="Emergency Contact Postal Address"
              value={emergency_contact_postal_address}
              onChange={({ target }) =>
                setEmergency_contact_postal_address(target?.value)
              }
            />
          </div>
        </div>

        <div className="col-lg-4 col-xl-0">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInput25">
              Emergency Contact Physical Address
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput25"
              placeholder="Emergency Contact Physical Address"
              value={emergency_contact_physical_address}
              onChange={({ target }) =>
                setEmergency_contact_physical_address(target?.value)
              }
            />
          </div>
        </div>
        <div className="row">
          
        </div>
        {/* Next button */}
        <div className="col-xl-12">
          <div className="my_profile_setting_input float-start fn-520">
          <button className="btn btn3 btn-dark" onClick={handleBackClick}>
          Back
        </button>
          </div>
          <div className="my_profile_setting_input float-end fn-520">
          <button className="btn btn2" onClick={handleNextClick}>
                Next
              </button>
          </div>
        </div>
      
        </div>
      )}

     
      {!showNextofKin && (
        <EmergencyContact handleBackClick={handleBackClick1} handleSubmit={handleSubmit} />
      )}
    </>

  );
};
export default NextofKin;
