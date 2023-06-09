import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ProfileInfo = () => {
  const [profile, setProfile] = useState(null);
  const [first_name, setFirst_name] = useState('');
  const [middle_name, setMiddle_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [country, setCountry] = useState('');
  const [id_number, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [registration_date, setRegistrationDate] = useState('');
  const [postal_address, setPostalAddress] = useState('');
  const [physical_address, setPhysicalAddress] = useState('');
  const [residential_address, setResidentialAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [data, setData] = useState([]);
  const [emailError, setEmailError] = useState('');

  // Function to handle email input change
  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation for each input field
    if (!first_name.trim()) {
      alert('Please enter your first name');
      return;
    }

    if (!last_name.trim()) {
      alert('Please enter your last name');
      return;
    }

    if (!country.trim()) {
      alert('Please enter your country');
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

    //   if (!registration_date.trim()) {
    //     alert('Please enter your registration date');
    //     return;
    //   }

    if (!postal_address.trim()) {
      alert('Please enter your postal address');
      return;
    }

    if (!physical_address.trim()) {
      alert('Please enter your physical address');
      return;
    }

    if (!residential_address.trim()) {
      alert('Please enter your residential address');
      return;
    }

    if (!city.trim()) {
      alert('Please enter your city');
      return;
    }

    if (!state.trim()) {
      alert('Please enter your state');
      return;
    }

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
        middle_name,
        last_name,
        country,
        id_number,
        phone,
        email,
        registration_date,
        postal_address,
        physical_address,
        residential_address,
        city,
        state,
        password,
        password_confirmation,
      };
      // Clear the input fields after submission
      setFirst_name('');
      setMiddle_name('');
      setLast_name('');
      setCountry('');
      setIdNumber('');
      setPhone('');
      setEmail('');
      setRegistrationDate('');
      setPostalAddress('');
      setPhysicalAddress('');
      setResidentialAddress('');
      setCity('');
      setState('');
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
    setMiddle_name('');
    setLast_name('');
    setCountry('');
    setIdNumber('');
    setPhone('');
    setEmail('');
    setRegistrationDate('');
    setPostalAddress('');
    setPhysicalAddress('');
    setResidentialAddress('');
    setCity('');
    setState('');
    setPassword('');
    setPasswordConfirmation('');
  };
  // handle submit form

  // upload profile
  const uploadProfile = (e) => {
    setProfile(e.target.files[0]);
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="wrap-custom-file">
          <input
            type="file"
            id="image1"
            accept="image/png, image/gif, image/jpeg"
            onChange={uploadProfile}
          />
          <label
            style={
              profile !== null
                ? {
                    backgroundImage: `url(${URL.createObjectURL(profile)})`,
                  }
                : undefined
            }
            htmlFor="image1"
          >
            <span>
              <i className="flaticon-download"></i> Upload Photo{' '}
            </span>
          </label>
        </div>
        <p>*minimum 260px x 260px</p>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
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

      <div className="col-lg-6 col-xl-6">
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
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput3">First Name</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput3"
            value={middle_name}
            placeholder="First Name"
            onChange={({ target }) => setMiddle_name(target?.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
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
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput14">Country</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput14"
            placeholder="Country"
            value={country}
            onChange={({ target }) => setCountry(target?.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
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
      {/* End .col */}

      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
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
      {/* End .col */}
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput7">Registration Date</label>
          <div className="input-group">
            <DatePicker
              className="form-control"
              id="formGroupExampleInput7"
              placeholderText="MM/DD/YYYY"
              selected={registration_date}
              onChange={(date) => setRegistrationDate(date)}
            />
          </div>
        </div>
      </div>

      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput8">Postal Address</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput8"
            value={postal_address}
            onChange={({ target }) => setPostalAddress(target?.value)}
            placeholder="Postal Address"
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput9">Physical Address</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput9"
            placeholder="Physical Address"
            value={physical_address}
            onChange={({ target }) => setPhysicalAddress(target?.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput10">Residential Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Residentail Address"
            id="formGroupExampleInput10"
            value={residential_address}
            onChange={({ target }) => setResidentialAddress(target?.value)}
          />
        </div>
      </div>

      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput12">City</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput12"
            placeholder="Zip Code"
            value={city}
            onChange={({ target }) => setCity(target?.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput13">State</label>
          <input
            type="text"
            placeholder="State"
            className="form-control"
            id="formGroupExampleInput13"
            value={state}
            onChange={({ target }) => setState(target?.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
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
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput18">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm-Password"
            id="formGroupExampleInput18"
            value={password_confirmation}
            onChange={({ target }) => setPasswordConfirmation(target?.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-xl-12 text-right">
        <div className="my_profile_setting_input">
          <button className="btn btn1" onClick={handleReset}>
            Reset Data
          </button>
          <button className="btn btn2" onClick={handleSubmit}>
            Update Profile
          </button>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default ProfileInfo;
