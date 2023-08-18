import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { Modal, Button } from 'react-bootstrap';
import Header from '../../../components/common/header/dashboard/Header';
import SidebarMenu from '../../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../../components/common/header/MobileMenu';
import Swal from 'sweetalert2';

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
          `https://cloudagent.co.ke/backend/api/v1/landlords/${id}`,
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
      };

      // Make the PUT request to update the landlord details
      const response = await axios.put(
        `https://cloudagent.co.ke/backend/api/v1/landlords/${id}`,
        updatedLandlordData,
        {
          headers,
        }
      );

      // Handle the response from the server
      console.log('Landlord details updated:', response.data);

      Swal.fire({
        icon: 'success',
        title: 'Landlords Profile Updated',
        text: 'Your Landlords profile has been updated successfully!',
      });
      router.push(`/my-landlords`);
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
  // const handleSubmitDelete = async () => {
  //   try {
  //     // Get the access token from cookies
  //     const cookies = parseCookies();
  //     const tokenFromCookie = cookies.access_token;

  //     // Set headers for the DELETE request
  //     const headers = {
  //       Authorization: `Bearer ${tokenFromCookie}`,
  //       'Content-Type': 'application/json',
  //     };

  //     // Make the DELETE request to delete the landlord
  //     const response = await axios.delete(
  //       `https://cloudagent.co.ke/backend/api/v1/landlords/${id}`,
  //       {
  //         headers,
  //       }
  //     );

  //     // Handle the response from the server
  //     console.log('Landlord deleted:', response.data);

  //     // Optionally, you can show a success message to the user
  //     alert('Landlord deleted successfully!');
  //     router.push(`/my-landlords`);

  //     // Redirect the user to the desired page after successful deletion
  //     router.push(`/my-landlords`);
  //   } catch (error) {
  //     console.log('Error deleting landlord:', error);
  //     // Optionally, you can show an error message to the user
  //     alert('Error deleting landlord. Please try again later.');
  //   }
  // };
  const handleSubmitDelete = async () => {
    try {
      // Show SweetAlert confirmation
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
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
            `https://cloudagent.co.ke/backend/api/v1/landlords/${id}`,
            {
              headers,
            }
          );
  
          // Handle the response from the server
          console.log('Landlord deleted:', response.data);
  
          // Show SweetAlert success message
          Swal.fire(
            'Deleted!',
            'Landlord Deleted Successfully!!!!.',
            'success'
          ).then(() => {
            router.push(`/my-landlords`); // Redirect after successful deletion
          });
        }
      });
    } catch (error) {
      console.log('Error deleting landlord:', error);
      // Show SweetAlert error message
      Swal.fire(
        'Error',
        'An error occurred while deleting the landlord. Please try again later.',
        'error'
      );
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
                            <label>Reistration Date</label>
                            <input
                              type="text"
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
                  </div>

                  <div className="col-xl-12 text-right mt-3">
                    <div className="my_profile_setting_input">
                      <button
                        className="btn btn1 float-start"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                      {/* Modal to collect Delete reason */}
                      <Modal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title className="text-danger">
                            {' '}
                            Confirm Permanent Action. This cannot be undone.{' '}
                          </Modal.Title>
                        </Modal.Header>

                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={() => setShowModal(false)}
                          >
                            Cancel
                          </Button>
                          <Button variant="danger" onClick={handleSubmitDelete}>
                            Delete
                          </Button>
                        </Modal.Footer>
                      </Modal>
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
      </section>
    </>
  );
};

export default EditForm;
