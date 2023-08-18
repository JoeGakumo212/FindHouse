import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { Modal, Button } from 'react-bootstrap';
import Header from '../../../components/common/header/dashboard/Header';
import SidebarMenu from '../../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../../components/common/header/MobileMenu';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const EditForm = () => {
  // State to hold the landlord details
  const router = useRouter();
  const { id } = router.query;
  const [landlord, setLandlord] = useState(null);
  // State to hold the editable landlord details
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const [state, setState] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalAddress, setPostalAddress] = useState('');
  const [physicalAddress, setPhysicalAddress] = useState('');
  const [residentialAddress, setResidentialAddress] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // decoding jwt from token
  const tokenFromLocalStorage = localStorage.getItem('token');

  const useScope = localStorage.getItem('useScope');

  const decodedToken = jwtDecode(tokenFromLocalStorage);

  const tenantId = decodedToken.sub;
  const landlordId = decodedToken.sub;
  // Fetch landlord details using the landlordId
  useEffect(() => {
    const fetchLandlordDetails = async () => {
      try {
        // Get the access token from cookies
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;
        console.log('Token land', tokenFromCookie);
        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        // Make the API call to fetch the landlord details using the landlordId
        const response = await axios.get(
          `https://cloudagent.co.ke/backend/api/v1/landlords/${landlordId}`,
          {
            headers,
          }
        );
        // Extract the relevant data and set it in the state
        const {
          first_name,
          middle_name,
          last_name,
          phone,
          email,
          registration_date_display,
          state,
          id_number,
          country,
          city,
          postal_address,
          physical_address,
          residential_address,
          current_password,
          password,
          password_confirmation,
        } = response.data;
        setFirstName(first_name);
        setMiddleName(middle_name);
        setLastName(last_name);
        setPhone(phone);
        setEmail(email);
        setRegistrationDate(registration_date_display);
        setState(state);
        setIdNumber(id_number);
        setCountry(country);
        setCity(city);
        setPostalAddress(postal_address);
        setPhysicalAddress(physical_address);
        setResidentialAddress(residential_address);
        setCurrentPassword(current_password);
        setNewPassword(password);
        setConfirmPassword(password_confirmation);
        // Set the landlord details in the state
        setLandlord(response.data);

        console.log('Token landlord me', tokenFromCookie);
        console.log('Id', id);
        console.log('Landlord data', response.data);
      } catch (error) {
        console.log('Error fetching landlord details:', error);
      }
    };

    // Call the fetchLandlordDetails function
    fetchLandlordDetails();
  }, [id]);

  if (!landlord) {
    return <p>Loading...</p>; // Add a loading state until the data is fetched
  }

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Get the access token from cookies
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      // Set headers for the PUT request
      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      // Construct the updated landlord data object
      const updatedLandlordData = {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        phone: phone,
        email: email,
        registration_date_display: registrationDate,
        state: state,
        id_number: idNumber,
        country: country,
        city: city,
        postal_address: postalAddress,
        physical_address: physicalAddress,
        residential_address: residentialAddress,
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      };

      // Make the PUT request to update the landlord details
      const response = await axios.put(
        `https://cloudagent.co.ke/backend/api/v1/landlords/${landlordId}`,
        updatedLandlordData,
        {
          headers,
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Landlords Profile Updated',
        text: 'Your Landlords profile has been updated successfully!',
      });

      router.push(`/my-dashboard`);
    } catch (error) {
      console.log('Error updating landlord details:', error);
      // Optionally, you can show an error message to the user
      alert('Error updating landlord details. Please try again later.');
    }
  };

  const handleDelete = async () => {
    // First, show the modal to collect the Delete reason
    setShowModal(true);
  };

  // Function to handle delete landlord
  const handleSubmitDelete = async () => {
    try {
      // Get the access token from cookies
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      // Set headers for the DELETE request
      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      // Make the DELETE request to delete the landlord
      const response = await axios.delete(
        `https://cloudagent.co.ke/backend/api/v1/landlords/${landlordId}`,
        {
          headers,
        }
      );

      // Handle the response from the server
      console.log('Landlord deleted:', response.data);

      // Redirect the user to the desired page after successful deletion
      router.push(`/my-landlords`);
    } catch (error) {
      console.log('Error deleting landlord:', error);
      // Optionally, you can show an error message to the user
      alert('Error deleting landlord. Please try again later.');
    }
  };

  // Render the form to edit the landlord details using the 'landlord' state
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
            <div className=" row  rounded-top text-light p-2 d-flex align-items-center justify-content-between">
              <div className=" row bg-success rounded-top text-light p-2 d-flex align-items-center justify-content-between">
                <div className="col-lg-8">
                  {' '}
                  <h2 className="text-light">Edit Landlord</h2>
                </div>
              </div>
            </div>
            <div className="my_dashboard_review mb40">
              <div className="favorite_item_list">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label>First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-group">
                            <label>Middle Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={middleName}
                              onChange={(e) => setMiddleName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label>Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-group">
                            <label>Phone</label>
                            <input
                              type="text"
                              className="form-control"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="text"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-group">
                            <label>Registration Date</label>
                            <input
                              type="date"
                              className="form-control"
                              value={registrationDate}
                              onChange={(e) =>
                                setRegistrationDate(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label>State</label>
                            <input
                              type="text"
                              className="form-control"
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                            />
                          </div>
                        </div>{' '}
                        <div className="col">
                          <div className="form-group">
                            <label>National ID/Passport Number</label>
                            <input
                              type="text"
                              className="form-control"
                              value={idNumber}
                              onChange={(e) => setIdNumber(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {' '}
                        <div className="col">
                          <div className="form-group">
                            <label>Country</label>
                            <input
                              type="text"
                              className="form-control"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-group">
                            <label>City</label>
                            <input
                              type="text"
                              className="form-control"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label>Postal Adress</label>
                            <input
                              type="text"
                              className="form-control"
                              value={postalAddress}
                              onChange={(e) => setPostalAddress(e.target.value)}
                            />
                          </div>
                        </div>{' '}
                        <div className="col">
                          <div className="form-group">
                            <label>Physical Address</label>
                            <input
                              type="text"
                              className="form-control"
                              value={physicalAddress}
                              onChange={(e) =>
                                setPhysicalAddress(e.target.value)
                              }
                            />
                          </div>
                        </div>{' '}
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label>Residential Address</label>
                            <input
                              type="text"
                              className="form-control"
                              value={residentialAddress}
                              onChange={(e) =>
                                setResidentialAddress(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label>Current Password</label>
                          <input
                            type="password"
                            className="form-control"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            readOnly
                            placeholder="Password Hidden"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Confirm Password</label>
                          <input
                            type="password"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-12 text-right mt-3">
                      <div className="my_profile_setting_input">
                        <button
                          className="btn btn2 float-end"
                          onClick={handleSubmit}
                        >
                          Save Landlord
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditForm;
