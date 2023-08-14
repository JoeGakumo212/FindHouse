import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import Link from 'next/link';

const TenantsDetails = () => {
  const router = useRouter();

  const [first_name, setFirst_name] = useState('');

  const [last_name, setLast_name] = useState('');
  const [gender, setGender] = useState('');
  const [date_of_birth, setDate_of_birth] = useState('');
  const [id_passport_number, setId_passport_number] = useState('');

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');

  const validateForm = () => {
    const formErrors = {};

    if (first_name.trim() === '') {
      formErrors.first_name = 'First Name is required';
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

    if (password.trim().length < 6) {
      formErrors.password = 'Password should be at least 6 characters';
    }
    if (password_confirmation.trim() === '') {
      formErrors.password_confirmation = 'Password Confirmation is required';
    }
    if (password.trim() !== password_confirmation.trim()) {
      formErrors.password_confirmation = 'Passwords do not match';
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate the form
    console.log('Button clicked');
    const data = {
      first_name,
      last_name,
      gender,
      date_of_birth,
      id_passport_number,
      phone,
      email,
      password,
      password_confirmation,
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

      setFirst_name('');
      setLast_name('');
      setGender('');
      setDate_of_birth('');
      setId_passport_number('');
      setPhone('');
      setEmail('');
      setPassword('');
      setPassword_confirmation('');

      alert('Tenant Created Successfully!!!!, Kindly procede to LoginPage!');

      router.push('/login');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="my_dashboard_review mb40">
        <div className="favorite_item_list">
          <div className="container">
            <div className="profile-section mb-3">
              <div className="row">
                <div className="col-lg-4">
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

                <div className="col-lg-4">
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
              </div>
              <div className="row">
                <div className="col-lg-4 ">
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

                <div className="col-lg-4">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="idPassportNumber">ID/Passport Number</label>
                    <input
                      type="number"
                      className="form-control"
                      id="idPassportNumber"
                      placeholder="ID/Passport Number"
                      value={id_passport_number}
                      onChange={(e) => setId_passport_number(e.target.value)}
                    />
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

                <div className="col-lg-12">
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
                      onChange={(e) => setPassword_confirmation(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-12">
                  <div className="my_profile_setting_input">
                    <button
                      className="btn btn2 float-end"
                      onClick={handleSubmit}
                    >
                      Register Tenant
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TenantsDetails;
