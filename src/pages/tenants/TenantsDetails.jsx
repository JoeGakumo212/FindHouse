import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';
const TenantsDetails = () => {
  const router = useRouter();
  const [tenant_type, setTenant_Type] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [middle_name, setMiddle_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [gender, setGender] = useState('');
  const [date_of_birth, setDate_of_birth] = useState('');
  const [id_passport_number, setId_passport_number] = useState('');
  const [marital_status, setMarital_status] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postal_code, setPostal_code] = useState('');
  const [postal_address, setPostal_address] = useState('');
  const [physical_address, setPhysical_address] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [showNextOfKin, setShowNextOfKin] = useState(false);
  const [stagedTenantData, setStagedTenantData] = useState({});
  const [showTenants, setShowTenants] = useState(true);
  const [tenantTypes, setTenantTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedTenantType, setSelectedTenantType] = useState(null);
  // nextofKin section
  const [next_of_kin_name, setNext_of_kin_name] = useState('');
  const [next_of_kin_phone, setNext_of_kin_phone] = useState('');
  const [next_of_kin_relation, setNext_of_kin_relation] = useState('');
  const [emergency_contact_name, setEmergency_contact_name] = useState('');
  const [emergency_contact_phone, setEmergency_contact_phone] = useState('');
  const [emergency_contact_email, setEmergency_contact_email] = useState('');
  const [emergency_contact_relationship, setEmergency_contact_relationship] =
    useState('');
  const [
    emergency_contact_postal_address,
    setEmergency_contact_postal_address,
  ] = useState('');
  const [
    emergency_contact_physical_address,
    setEmergency_contact_physical_address,
  ] = useState('');
  // emergency contact
  const [employment_status, setEmployment_status] = useState('');
  const [employment_position, setEmployment_position] = useState('');
  const [employer_contact_phone, setEmployer_contact_phone] = useState('');
  const [employer_contact_email, setEmployer_contact_email] = useState('');
  const [employment_postal_address, setEmployment_postal_address] =
    useState('');
  const [employment_physical_address, setEmployment_physical_address] =
    useState('');
  const [showNextofKin, setShowNextofKin] = useState(true);
  //  handle hide and show sections
  const [currentSection, setCurrentSection] = useState(1);
  const totalSections = 4; // Total number of profile sections
  const [showSaveButton, setShowSaveButton] = useState(false);
 
  const handleBacked= () => {
    router.push('/tenants');
  };
  // handle selection of tenant type
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

      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/tenant_types?list=tenant_type_name%20,tenant_type_display_name',
        { headers }
      );
      console.log('API Response:', response.data);

      setTenantTypes(response.data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const handleTypeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);

    // Find the tenant type object based on the selected value
    const selectedTenantType = tenantTypes.find(
      (type) => type.tenant_type_display_name === selectedValue
    );

    setSelectedTenantType(selectedTenantType);
    console.log('Selected NAme:', selectedTenantType.tenant_type_display_name);
    console.log('Selected NAme ID:', selectedTenantType.id);
  };

  // end
  // State variable for form errors
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    if (currentSection < totalSections) {
      const formErrors = validateForm(); // Perform form validation
      setErrors(formErrors); // Update the form errors state

      if (Object.keys(formErrors).length === 0) {
        setCurrentSection(currentSection + 1);
      } else {
        displayErrors(formErrors); // Display form errors
      }
    } else {
      setShowSaveButton(true); // Set a state variable to indicate that the Save button should be shown
    }
  };

  const handleBack = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const validateForm = () => {
    const formErrors = {};

    // Validate the form fields for each section
    if (currentSection === 1) {
      if (first_name.trim() === '') {
        formErrors.first_name = 'First Name is required';
      }
      if (middle_name.trim() === '') {
        formErrors.middle_name = 'Middle Name is required';
      }
      if (last_name.trim() === '') {
        formErrors.last_name = 'Last Name is required';
      }
      if (gender.trim() === '') {
        formErrors.gender = 'Gender is required';
      }
      if (date_of_birth.trim() === '') {
        formErrors.date_of_birth = 'Date of Birth is required';
      }
      if (id_passport_number.trim() === '') {
        formErrors.id_passport_number = 'ID/Passport Number is required';
      } else if (id_passport_number.trim().length < 8) {
        formErrors.id_passport_number =
          'ID/Passport Number should be at least 8 characters';
      }
      if (marital_status.trim() === '') {
        formErrors.marital_status = 'Marital Status is required';
      }

      if (phone.trim() === '') {
        formErrors.phone = 'Phone is required';
      } else if (phone.trim().length < 10) {
        formErrors.phone = 'Phone should be at least 10 characters';
      }
      if (email.trim() === '') {
        formErrors.email = 'Email is required';
      } else if (!isValidEmail(email.trim())) {
        formErrors.email = 'Email is invalid';
      }
      if (country.trim() === '') {
        formErrors.country = 'Country is required';
      }
      if (city.trim() === '') {
        formErrors.city = 'City is required';
      }
      if (postal_code.trim() === '') {
        formErrors.postal_code = 'Postal Code is required';
      }
      if (postal_address.trim() === '') {
        formErrors.postal_address = 'Postal Address is required';
      }
      if (physical_address.trim() === '') {
        formErrors.physical_address = 'Physical Address is required';
      }
      if (password.trim().length < 6) {
        formErrors.password = 'Password should be at least 6 characters';
      }
      if (password_confirmation.trim() === '') {
        formErrors.password_confirmation = 'Password Confirmation is required';
      }
      if (password.trim() !== password_confirmation.trim()) {
        formErrors.password_confirmation = 'Passwords do not match';
      }
      // end validation for other fields in section 1
    } else if (currentSection === 2) {
      if (next_of_kin_name.trim() === '') {
        formErrors.next_of_kin_name = 'Next of Kin Name is required';
      }
      if (next_of_kin_phone.trim().length < 10) {
        formErrors.next_of_kin_phone =
          'Next of Kin Phone should be at least 10 digits';
      }
      if (employment_status.trim() === '') {
        formErrors.employment_status = 'Employment Status is required';
      }
      if (employment_position.trim() === '') {
        formErrors.employment_position = 'Employment Position is required';
      }
      if (employer_contact_phone.trim().length < 10) {
        formErrors.employer_contact_phone =
          'Employer Contact Phone should be at least 10 digits';
      }
      if (employer_contact_email.trim() === '') {
        formErrors.employer_contact_email =
          'Employer Contact Email is required';
      } else if (!isValidEmail(employer_contact_email.trim())) {
        formErrors.employer_contact_email = 'Employer Contact Email is invalid';
      }
      if (employment_postal_address.trim() === '') {
        formErrors.employment_postal_address =
          'Employment Postal Address is required';
      }
      if (employment_physical_address.trim() === '') {
        formErrors.employment_physical_address =
          'Employment Physical Address is required';
      }
      // end validation for other fields in section 2

      if (emergency_contact_name.trim() === '') {
        formErrors.emergency_contact_name =
          'Emergency Contact Name is required';
      }

      if (emergency_contact_phone.trim() === '') {
        formErrors.emergency_contact_phone =
          'Emergency Contact Phone is required';
      } else if (emergency_contact_phone.trim().length < 10) {
        formErrors.emergency_contact_phone =
          'Emergency Contact Phone should be at least 10 digits';
      }
      if (employment_status.trim() === '') {
        formErrors.employment_status = 'Employment Status is required';
      }
      if (employment_position.trim() === '') {
        formErrors.employment_position = 'Employment Position is required';
      }
      if (employer_contact_phone.trim() === '') {
        formErrors.employer_contact_phone =
          'Employer Contact Phone is required';
      } else if (employer_contact_phone.trim().length < 10) {
        formErrors.employer_contact_phone =
          'Employer Contact Phone should be at least 10 digits';
      }
      if (employer_contact_email.trim() === '') {
        formErrors.employer_contact_email =
          'Employer Contact Email is required';
      } else if (!isValidEmail(employer_contact_email.trim())) {
        formErrors.employer_contact_email = 'Employer Contact Email is invalid';
      }
      if (employment_postal_address.trim() === '') {
        formErrors.employment_postal_address =
          'Employment Postal Address is required';
      }
      if (employment_physical_address.trim() === '') {
        formErrors.employment_physical_address =
          'Employment Physical Address is required';
      }
      // end validation for other fields in section 3
    }

    return formErrors;
  };
  const isValidEmail = (email) => {
    // Email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const displayErrors = (formErrors) => {
    // Display form errors
    alert(
      'Please fix the following errors: ' + Object.values(formErrors).join(', ')
    );
  };

  const checkFormCompleteness = () => {
    // Check if all fields are filled in the form
    if (currentSection === 1) {
      if (selectedTenantType.trim() === '' || first_name.trim() === '') {
        return false;
      }
      // Check other fields in section 1
    } else if (currentSection === 2) {
      if (next_of_kin_name.trim() === '' || next_of_kin_phone.trim() === '') {
        return false;
      }
      // Check other fields in section 2
    } else if (currentSection === 3) {
      if (
        emergency_contact_name.trim() === '' ||
        emergency_contact_phone.trim() === ''
      ) {
        return false;
      }
      // Check other fields in section 3
    }

    return true;
  };

  const validateLastSection = () => {
    const lastSectionErrors = {};

    // Validate the fields of the last section
    // Add validation for each field in the last section
    // Example:
    // if (field.trim() === '') {
    //   lastSectionErrors.field = 'Field is required';
    // }

    return lastSectionErrors;
  };

  const handleSubmit = async () => {
    // Validate the form
    const formErrors = validateForm();

    // Check if there are any form errors
    const hasErrors = Object.keys(formErrors).length > 0;

    if (hasErrors) {
      // Display the form errors
      displayErrors(formErrors);
    } else {
      // Check if all fields are filled
      const isFormComplete = checkFormCompleteness();

      if (!isFormComplete) {
        alert('Please fill in all fields before submitting the form.');
        return;
      }

      if (currentSection === totalSections) {
        // Validate the last section before saving
        const lastSectionErrors = validateLastSection();

        if (Object.keys(lastSectionErrors).length > 0) {
          // Display the last section errors
          displayErrors(lastSectionErrors);
          return;
        }
      }

      const data = {
        tenant: selectedTenantType.id,
        first_name,
        middle_name,
        last_name,
        gender,
        date_of_birth,
        id_passport_number,
        marital_status,
        phone,
        email,
        country,
        city,
        postal_code,
        postal_address,
        physical_address,
        password,
        password_confirmation,
        showNextOfKin,
        stagedTenantData,
        showTenants,
        next_of_kin_name,
        next_of_kin_phone,
        next_of_kin_relation,
        emergency_contact_name,
        emergency_contact_phone,
        emergency_contact_email,
        emergency_contact_relationship,
        emergency_contact_postal_address,
        emergency_contact_physical_address,
        employment_status,
        employment_position,
        employer_contact_phone,
        employer_contact_email,
        employment_postal_address,
        employment_physical_address,
      };

      // Perform form submission logic here
      console.log('Form submitted', data);

      try {
        // Retrieve the token from cookies
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;

        // Set the request headers
        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        // Send a POST request to the endpoint with the captured data, stageData, and TenantData
        const response = await axios.post(
          'https://cloudagent.co.ke/backend/api/v1/tenants',
          data,
          { headers }
        );

        // Handle the response
        console.log('Response:', response.data);

        // Reset the form fields
        setTenant_Type('');
        setFirst_name('');
        setMiddle_name('');
        setLast_name('');
        setGender('');
        setDate_of_birth('');
        setId_passport_number('');
        setMarital_status('');
        setPhone('');
        setEmail('');
        setCountry('');
        setCity('');
        setPostal_code('');
        setPostal_address('');
        setPhysical_address('');
        setPassword('');
        setPassword_confirmation('');
        setShowNextOfKin(false);
        setStagedTenantData({});
        setShowTenants(true);
        setNext_of_kin_name('');
        setNext_of_kin_phone('');
        setNext_of_kin_relation('');
        setEmergency_contact_name('');
        setEmergency_contact_phone('');
        setEmergency_contact_email('');
        setEmergency_contact_relationship('');
        setEmergency_contact_postal_address('');
        setEmergency_contact_physical_address('');
        setEmployment_status('');
        setEmployment_position('');
        setEmployer_contact_phone('');
        setEmployer_contact_email('');
        setEmployment_postal_address('');
        setEmployment_physical_address('');
        alert('Data submitted successfully!');
        // Reset form fields
        // ...
        router.push('tenants');
      } catch (error) {
        // Handle any errors
        console.error('Error:', error);
      }
    }
  };

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="col-lg-12">
          <div className="row">
                <div className="col-lg-6 mb10">
                  <div className="breadcrumb_content style2">
                    <div className="my_profile_setting_input">
                      <h3>Add Tenant</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mb10">
                  <div className="breadcrumb_content style2">
                    <div className="my_profile_setting_input">
                      <button
                        className="btn float-end btn-danger"
                        onClick={handleBacked}
                      >
                        Back to Tenant Management
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            <div className="my_dashboard_review mb40">
             
              <div className="favorite_item_list">
                <div className="container">
                  {currentSection === 1 && (
                    <div className="profile-section mb-3">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="my_profile_setting_input ui_kit_select_search form-group">
                            <label htmlFor="tenantType">Tenant Type*</label>
                            <select
                              id="tenantType"
                              value={selectedType}
                              onChange={handleTypeChange}
                              className="selectpicker form-select"
                            >
                              <option value="">Select</option>
                              {tenantTypes.map((type) => (
                                <option
                                  key={type.tenant_type_name}
                                  value={type.tenant_type_display_name}
                                >
                                  {type.tenant_type_display_name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-4 col-xl-0">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="firstName"
                              placeholder="First Name"
                              value={first_name}
                              onChange={(e) => setFirst_name(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-xl-0">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="middleName">Middle Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="middleName"
                              placeholder="Middle Name"
                              value={middle_name}
                              onChange={(e) => setMiddle_name(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-4">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                              placeholder="Last Name"
                              value={last_name}
                              onChange={(e) => setLast_name(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-xl-0">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="gender">Gender</label>
                            <select
                              className="selectpicker form-select"
                              data-width="100%"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option value="" disabled selected>
                                Select Gender
                              </option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-4 col-xl-0">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="dateOfBirth">Date of Birth</label>
                            <input
                              type="date"
                              className="form-control"
                              id="dateOfBirth"
                              placeholder="Date of Birth"
                              value={date_of_birth}
                              onChange={(e) => setDate_of_birth(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-4">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="idPassportNumber">
                              ID/Passport Number
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="idPassportNumber"
                              placeholder="ID/Passport Number"
                              value={id_passport_number}
                              onChange={(e) =>
                                setId_passport_number(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-xl-0">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="maritalStatus">
                              Marital Status
                            </label>
                            <select
                              className="selectpicker form-select"
                              data-width="100%"
                              value={marital_status}
                              onChange={(e) =>
                                setMarital_status(e.target.value)
                              }
                            >
                              <option value="" disabled selected>
                                Select Marital Status
                              </option>
                              <option value="single">Single</option>
                              <option value="married">Married</option>
                              <option value="divorced">Divorced</option>
                              <option value="widowed">Widowed</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-4 col-xl-0">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                              type="number"
                              className="form-control"
                              id="phone"
                              placeholder="Phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-4">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="email">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-xl-0">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="country">Country</label>
                            <input
                              type="text"
                              className="form-control"
                              id="country"
                              placeholder="Country"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-xl-0">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="city">City</label>
                            <input
                              type="text"
                              className="form-control"
                              id="city"
                              placeholder="City"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-4">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="postalCode">Postal Code</label>
                            <input
                              type="text"
                              className="form-control"
                              id="postalCode"
                              placeholder="Postal Code"
                              value={postal_code}
                              onChange={(e) => setPostal_code(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-xl-0">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="postalAddress">
                              Postal Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="postalAddress"
                              placeholder="Postal Address"
                              value={postal_address}
                              onChange={(e) =>
                                setPostal_address(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="physicalAddress">
                              Physical Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="physicalAddress"
                              placeholder="Physical Address"
                              value={physical_address}
                              onChange={(e) =>
                                setPhysical_address(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="password">Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-xl-0">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="passwordConfirmation">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="passwordConfirmation"
                              placeholder="Confirm Password"
                              value={password_confirmation}
                              onChange={(e) =>
                                setPassword_confirmation(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="my_profile_setting_input">
                            <button
                              className="btn btn2 float-start"
                              onClick={handleNext}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* end of tenants details */}
                  {currentSection === 2 && (
                    <div className="profile-section2 mt-3">
                      <h2>Kin and Relationship</h2>
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="nextOfKinName">
                              Next of Kin Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="nextOfKinName"
                              placeholder="Next of Kin Name"
                              value={next_of_kin_name}
                              onChange={(e) =>
                                setNext_of_kin_name(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-xl-0">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="nextOfKinPhone">
                              Next of Kin Phone
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="nextOfKinPhone"
                              placeholder="Next of Kin Phone"
                              value={next_of_kin_phone}
                              onChange={(e) =>
                                setNext_of_kin_phone(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-xl-0">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="nextOfKinRelation">
                              Next of Kin Relation
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="nextOfKinRelation"
                              placeholder="Next of Kin Relation"
                              value={next_of_kin_relation}
                              onChange={(e) =>
                                setNext_of_kin_relation(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-4">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="emergencyContactName">
                              Emergency Contact Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="emergencyContactName"
                              placeholder="Emergency Contact Name"
                              value={emergency_contact_name}
                              onChange={(e) =>
                                setEmergency_contact_name(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-xl-0">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="emergencyContactPhone">
                              Emergency Contact Phone
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="emergencyContactPhone"
                              placeholder="Emergency Contact Phone"
                              value={emergency_contact_phone}
                              onChange={(e) =>
                                setEmergency_contact_phone(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-xl-0">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="emergencyContactEmail">
                              Emergency Contact Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="emergencyContactEmail"
                              placeholder="Emergency Contact Email"
                              value={emergency_contact_email}
                              onChange={(e) =>
                                setEmergency_contact_email(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-4">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="emergencyContactRelationship">
                              Emergency Contact Relationship
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="emergencyContactRelationship"
                              placeholder="Emergency Contact Relationship"
                              value={emergency_contact_relationship}
                              onChange={(e) =>
                                setEmergency_contact_relationship(
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-xl-0">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="emergencyContactPostalAddress">
                              Emergency Contact Postal Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="emergencyContactPostalAddress"
                              placeholder="Emergency Contact Postal Address"
                              value={emergency_contact_postal_address}
                              onChange={(e) =>
                                setEmergency_contact_postal_address(
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="emergencyContactPhysicalAddress">
                              Emergency Contact Physical Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="emergencyContactPhysicalAddress"
                              placeholder="Emergency Contact Physical Address"
                              value={emergency_contact_physical_address}
                              onChange={(e) =>
                                setEmergency_contact_physical_address(
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <h2>Employment Information</h2>
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="employmentStatus">
                              Employment Status
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="employmentStatus"
                              placeholder="Employment Status"
                              value={employment_status}
                              onChange={(e) =>
                                setEmployment_status(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-xl-0">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="employmentPosition">
                              Employment Position
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="employmentPosition"
                              placeholder="Employment Position"
                              value={employment_position}
                              onChange={(e) =>
                                setEmployment_position(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-xl-0">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="employerContactPhone">
                              Employer Contact Phone
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="employerContactPhone"
                              placeholder="Employer Contact Phone"
                              value={employer_contact_phone}
                              onChange={(e) =>
                                setEmployer_contact_phone(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-4">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="employerContactEmail">
                              Employer Contact Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="employerContactEmail"
                              placeholder="Employer Contact Email"
                              value={employer_contact_email}
                              onChange={(e) =>
                                setEmployer_contact_email(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-xl-0">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="employmentPostalAddress">
                              Employment Postal Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="employmentPostalAddress"
                              placeholder="Employment Postal Address"
                              value={employment_postal_address}
                              onChange={(e) =>
                                setEmployment_postal_address(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="employmentPhysicalAddress">
                              Employment Physical Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="employmentPhysicalAddress"
                              placeholder="Employment Physical Address"
                              value={employment_physical_address}
                              onChange={(e) =>
                                setEmployment_physical_address(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="my_profile_setting_input">
                            <button
                              className="btn btn1 float-start"
                              onClick={handleBack}
                            >
                              Back
                            </button>
                            <button
                              className="btn btn2 float-end"
                              onClick={handleSubmit}
                            >
                              Save Data
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default TenantsDetails;
