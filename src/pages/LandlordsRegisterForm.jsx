import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import DatePicker from 'react-datepicker';
import { toast } from 'react-nextjs-toast';
import 'react-datepicker/dist/react-datepicker.css';

import { useRouter } from 'next/router';

const AddLandlord = () => {
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [id_number, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [emailError, setEmailError] = useState('');
  const router = useRouter();

  // Function to handle email input change
  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!first_name.trim()) {
      alert('Please enter your first name');
      return;
    }

    if (!last_name.trim()) {
      alert('Please enter your last name');
      return;
    }

    if (!id_number.trim()) {
      alert('Please enter either the ID number or passport number');
      return;
    }

    if (!phone.trim()) {
      alert('Please enter your phone number');
      return;
    }

    // Validate email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      window.alert('Please enter a valid email address');
      return;
    }

    // Reset email error if validation passes
    setEmailError('');

    if (!password.trim()) {
      alert('Please enter your password');
      return;
    }

    if (!password_confirmation.trim()) {
      alert('Please enter your password confirmation');
      return;
    }

    if (password !== password_confirmation) {
      alert('Password and password confirmation do not match');
      return;
    }

    try {
      // Get the access token from the cookies
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;
      // Create the property details object
      const landlordDetails = {
        first_name,
        last_name,
        id_number,
        phone,
        email,
        password,
        password_confirmation,
      };
      // Clear the input fields after submission
      setFirst_name('');
      setLast_name('');
      setIdNumber('');
      setPhone('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      console.log('propertyDetails:', landlordDetails);
      // Perform request to the API using the obtained token
      const response = await axios.post(
        'https://cloudagent.co.ke/backend/api/v1/landlords',
        landlordDetails,
        {
          headers: {
            Authorization: `Bearer ${tokenFromCookie}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Data successfully posted:', response.data);
        alert('Landlord Created Successfully!!!!');
        router.push(`/login`);
        toast.notify(
          `Landlord Created Successfully!!!!, Kindly procede to LoginPage`
        );
        return;

        // Perform any additional actions upon successful response
      } else {
        console.error('API request failed with status:', response.status);
        console.error('Error response:', response.data); // Log the specific error response
      }
    } catch (error) {
      console.error('Failed to post data:', error);
      // Handle the error appropriately
    }
  };

  const handleReset = () => {
    setFirst_name('');
    setLast_name('');
    setIdNumber('');
    setPhone('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
  };
  // handle submit form

  return (
    <>
      <div className="my_dashboard_review mb40">
        <div className="favorite_item_list">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-lg-0">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="formGroupExampleInput1">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput1"
                    placeholder="UserName"
                    value={first_name}
                    onChange={({ target }) => setFirst_name(target?.value)}
                  />
                </div>
              </div>
              {/* End .col */}

              <div className="col-lg-4 col-lg-0">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="formGroupExampleEmail">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="formGroupExampleEmail"
                    placeholder="joekumsy@gmail.com"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {emailError && <p>{emailError}</p>}
                </div>
              </div>

              <div className="col-lg-4 col-lg-0">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="formGroupExampleInput4">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput4"
                    placeholder="Last Name"
                    value={last_name}
                    onChange={({ target }) => setLast_name(target?.value)}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="formGroupExampleInput15">ID Number</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="ID Number"
                    id="formGroupExampleInput15"
                    value={id_number}
                    onChange={({ target }) => setIdNumber(target?.value)}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="formGroupExampleInput6">Phone</label>
                  <input
                    type="number"
                    className="form-control"
                    id="formGroupExampleInput6"
                    value={phone}
                    placeholder="Phone Number"
                    onChange={({ target }) => setPhone(target?.value)}
                  />
                </div>
              </div>

              <div className="col-lg-6 ">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="formGroupExampleInput17">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    id="formGroupExampleInput17"
                    value={password}
                    onChange={({ target }) => setPassword(target?.value)}
                  />
                </div>
              </div>
              {/* End .col */}
              <div className="col-lg-6 ">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="formGroupExampleInput18">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm-Password"
                    id="formGroupExampleInput18"
                    value={password_confirmation}
                    onChange={({ target }) =>
                      setPasswordConfirmation(target?.value)
                    }
                  />
                </div>
              </div>
              {/* End .col */}

              <div className="col-xl-12 text-right">
                <div className="my_profile_setting_input">
                  <button
                    className="btn btn1 float-start"
                    onClick={handleReset}
                  >
                    Reset Data
                  </button>
                  <button className="btn btn2 float-end" onClick={handleSubmit}>
                    Register Landlord
                  </button>
                </div>
              </div>
              {/* End .col */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLandlord;
