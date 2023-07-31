import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import { Modal, Button } from 'react-bootstrap';
import Header from '../../../components/common/header/dashboard/Header';
import SidebarMenu from '../../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../../components/common/header/MobileMenu';
// ... other imports

const EditTenant = () => {
  const router = useRouter();
  const { id } = router.query; // Access tenantId using the variable 'id'
  console.log('ID', id);

  // State variables for tenant details
  const [tenant_type, setTenant_Type] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [middle_name, setMiddle_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [gender, setGender] = useState('');
  const [date_of_birth, setDate_of_birth] = useState('');
  const [id_passport_number, setid_passport_number] = useState('');
  const [marital_status, setmarital_status] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [country, setcountry] = useState('');
  const [city, setCity] = useState('');
  const [postal_address, setpostal_address] = useState('');
  const [physical_address, setphysical_address] = useState('');
  const [postal_code, setpostal_code] = useState('');
  const [password, setpassword] = useState('');
  const [password_confirmation, setpassword_confirmation] = useState('');
  const [tenantTypes, setTenantTypes] = useState([]);
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

  // State variables for collapsing/expanding sections
  const [tenantInfoExpanded, setTenantInfoExpanded] = useState(true);
  const [nextOfKinExpanded, setNextOfKinExpanded] = useState(false);
  const [emergencyExpanded, setEmergencyExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // Function to toggle the expanded state of each section
  const toggleSection = (section) => {
    if (section === 'tenantInfo') {
      setTenantInfoExpanded(true);
      setNextOfKinExpanded(false);
      setEmergencyExpanded(false);
    } else if (section === 'nextOfKin') {
      setTenantInfoExpanded(false);
      setNextOfKinExpanded(true);
      setEmergencyExpanded(false);
    } else if (section === 'emergency') {
      setTenantInfoExpanded(false);
      setNextOfKinExpanded(false);
      setEmergencyExpanded(true);
    }
  };

  // Fetch tenant types and tenant data on component mount
  useEffect(() => {
    fetchTenantTypes();
    fetchTenantData();
  }, [id]);

  // Fetch tenant types
  const fetchTenantTypes = async () => {
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

      // Update state with tenant types
      setTenantTypes(response.data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  // Fetch tenant data
  const fetchTenantData = async () => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(
        `https://cloudagent.co.ke/backend/api/v1/tenants/${id}`, // Endpoint to get tenant details by ID
        { headers }
      );
      console.log('Tenant fetched data', response.data);
      const tenantData = response.data;
      // Update state variables with the retrieved tenant data
      setTenant_Type(tenantData.tenant_type);
      setFirst_name(tenantData.first_name);
      setMiddle_name(tenantData.middle_name);
      setLast_name(tenantData.last_name);
      setGender(tenantData.gender);
      setDate_of_birth(tenantData.date_of_birth);
      setid_passport_number(tenantData.id_passport_number);
      setmarital_status(tenantData.marital_status);
      setphone(tenantData.phone);
      setemail(tenantData.email);
      setcountry(tenantData.country);
      setCity(tenantData.city);
      setpostal_address(tenantData.postal_address);
      setphysical_address(tenantData.physical_address);
      setpostal_code(tenantData.postal_code);
      // next of kin
      setNext_of_kin_name(tenantData.next_of_kin_name);
      setNext_of_kin_phone(tenantData.next_of_kin_phone);
      setNext_of_kin_relation(tenantData.next_of_kin_relation);
      setEmergency_contact_name(tenantData.emergency_contact_name);
      setEmergency_contact_phone(tenantData.emergency_contact_phone);
      setEmergency_contact_email(tenantData.emergency_contact_email);
      setEmergency_contact_relationship(
        tenantData.emergency_contact_relationship
      );
      setEmergency_contact_physical_address(
        tenantData.emergency_contact_physical_address
      );
      setEmergency_contact_postal_address(
        tenantData.emergency_contact_postal_address
      );
      // Employe details
      setEmployment_status(tenantData.employment_status);
      setEmployment_position(tenantData.employment_position);
      setEmployer_contact_phone(tenantData.employer_contact_phone);
      setEmployer_contact_email(tenantData.employer_contact_email);
      setEmployment_postal_address(tenantData.employment_postal_address);
      setEmployment_physical_address(tenantData.employment_physical_address);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const isValidEmail = (email) => {
    // Email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      // Create a payload object with updated tenant data
      const payload = {
        tenant_type,
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
        postal_address,
        physical_address,
        postal_code,
        password,
        password_confirmation,
        // next of kin section
        next_of_kin_name,
        next_of_kin_phone,
        next_of_kin_relation,
        emergency_contact_name,
        emergency_contact_phone,
        emergency_contact_email,
        emergency_contact_relationship,
        emergency_contact_postal_address,
        emergency_contact_physical_address,
        // employment details
        employment_status,
        employment_position,
        employer_contact_phone,
        employer_contact_email,
        employment_postal_address,
        employment_physical_address,
        // ... other fields ...
      };

      // Assuming the endpoint for updating tenant data is:
      const tenantId = router.query.id; // Get the tenant ID from the URL query parameters
      const apiUrl = `https://cloudagent.co.ke/backend/api/v1/tenants/${tenantId}`;

      // Make a PUT request to the API with the payload and headers
      const response = await axios.put(apiUrl, payload, { headers });

      // Handle the response if needed
      console.log('Tenant data updated successfully!', response.data);
      alert('Tenant data updated successfully!');
      router.push(`/tenants`);
    } catch (error) {
      // Handle any errors that occurred during the form submission process
      console.error('Error updating tenant data:', error.message);
    }
  };

  const handleDelete = async () => {
    // First, show the modal to collect the Delete reason
    setShowModal(true);
  };

  // Function to handle deleting a tenant
  const handleDeleteTenant = async () => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const apiUrl = `https://cloudagent.co.ke/backend/api/v1/tenants/${id}`;

      // Make a DELETE request to the API to delete the tenant
      await axios.delete(apiUrl, { headers });

      // Optionally, you can handle any success messages or redirect to a different page after deletion
      console.log('Tenant deleted successfully!');
      alert('Tenant deleted successfully!');
      router.push(`/tenants`);

      // For example, redirect to a different page after deletion
      router.push('/tenants');
    } catch (error) {
      console.error('Error deleting tenant:', error.message);
      // Optionally, you can handle errors and show error messages to the user
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
          <h2 className='bg-success rounded-top text-light p-2 d-flex align-items-center justify-content-between'>Update Tenants Details</h2>
            <div className="my_dashboard_review mb40">
              <div className="favorite_item_list">
                <div className="container">
                
                  <div>
                    {/* Your JSX for the edit tenant form */}
                    <div className="row">
                      <h3
                        onClick={() => toggleSection('tenantInfo')}
                        className="text text-success"
                      >
                        1. Edit Tenant Info
                      </h3>
                    </div>
                    {tenantInfoExpanded && (
                      <div className="row">
                        <div className="col-lg-4">
                          <label>Tenant Type:</label>
                          <select
                            value={tenant_type}
                            className="form-control select"
                            onChange={(e) => setTenant_Type(e.target.value)}
                          >
                            {tenantTypes.map((type) => (
                              <option
                                key={type.id}
                                value={type.tenant_type_display_name}
                              >
                                {type.tenant_type_display_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-lg-4">
                          <label>First Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            value={first_name}
                            onChange={(e) => setFirst_name(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-4">
                          <label>Middle Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            value={middle_name}
                            onChange={(e) => setMiddle_name(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-4">
                          <label>Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={last_name}
                            onChange={(e) => setLast_name(e.target.value)}
                          />
                        </div>

                        <div className="row">
                          <div className="col-lg-4">
                            <label>Gender</label>
                            <input
                              type="text"
                              className="form-control"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            />
                          </div>
                          <div className="col-lg-4">
                            <label>Date of Birth</label>
                            <input
                              type="date"
                              className="form-control"
                              value={date_of_birth}
                              onChange={(e) => setDate_of_birth(e.target.value)}
                            />
                          </div>
                          <div className="col-lg-4">
                            <label>ID Passport/National ID</label>
                            <input
                              type="text"
                              className="form-control"
                              value={id_passport_number}
                              onChange={(e) =>
                                setid_passport_number(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-4">
                            <label>Status</label>
                            <input
                              type="text"
                              className="form-control"
                              value={marital_status}
                              onChange={(e) =>
                                setmarital_status(e.target.value)
                              }
                            />
                          </div>
                          <div className="col-lg-4">
                            <label>Phone Phone</label>
                            <input
                              type="text"
                              className="form-control"
                              value={phone}
                              onChange={(e) => setphone(e.target.value)}
                            />
                          </div>
                          <div className="col-lg-4">
                            <label>Email Address</label>
                            <input
                              type="text"
                              className="form-control"
                              value={email}
                              onChange={(e) => setemail(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-4">
                            <label>Country</label>
                            <input
                              type="text"
                              className="form-control"
                              value={country}
                              onChange={(e) => setcountry(e.target.value)}
                            />
                          </div>
                          <div className="col-lg-4">
                            <label>City</label>
                            <input
                              type="text"
                              className="form-control"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            />
                          </div>
                          <div className="col-lg-4">
                            <label>Postal Code</label>
                            <input
                              type="text"
                              className="form-control"
                              value={postal_code}
                              onChange={(e) => setpostal_code(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-4">
                            <label>Postal Address</label>
                            <input
                              type="text"
                              className="form-control"
                              value={postal_address}
                              onChange={(e) =>
                                setpostal_address(e.target.value)
                              }
                            />
                          </div>
                          <div className="col-lg-4">
                            <label>Physical Address</label>
                            <input
                              type="text"
                              className="form-control"
                              value={physical_address}
                              onChange={(e) =>
                                setphysical_address(e.target.value)
                              }
                            />
                          </div>
                          <div className="col-lg-4">
                            <label>Password</label>
                            <input
                              type="text"
                              className="form-control"
                              value={password}
                              onChange={(e) => setpassword(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <label>Confirm Password</label>
                          <input
                            type="text"
                            className="form-control"
                            value={password_confirmation}
                            onChange={(e) =>
                              setpassword_confirmation(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    )}
                    {/* Next of Kin Section */}
                    <div className="row">
                      <h3
                        onClick={() => toggleSection('nextOfKin')}
                        className="text text-success"
                      >
                        2. Edit Next of Kin
                      </h3>
                    </div>
                    {nextOfKinExpanded && (
                      <div className="row">
                        <div className="col-lg-4">
                          <label>Next of Kin Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={next_of_kin_name}
                            onChange={(e) =>
                              setNext_of_kin_name(e.target.value)
                            }
                          />
                        </div>
                        <div className="col-lg-4">
                          <label>Next of Kin Phone</label>
                          <input
                            type="number"
                            className="form-control"
                            value={next_of_kin_phone}
                            onChange={(e) =>
                              setNext_of_kin_phone(e.target.value)
                            }
                          />
                        </div>
                        <div className="col-lg-4">
                          <label>Next of Kin Relation</label>
                          <input
                            type="text"
                            className="form-control"
                            value={next_of_kin_relation}
                            onChange={(e) =>
                              setNext_of_kin_relation(e.target.value)
                            }
                          />
                        </div>

                        <div className="col-lg-4">
                          <label>Emergency Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={emergency_contact_name}
                            onChange={(e) =>
                              setEmergency_contact_name(e.target.value)
                            }
                          />
                        </div>
                        <div className="col-lg-4">
                          <label>Emergency Phone</label>
                          <input
                            type="number"
                            className="form-control"
                            value={emergency_contact_phone}
                            onChange={(e) =>
                              setEmergency_contact_phone(e.target.value)
                            }
                          />
                        </div>
                        <div className="col-lg-4">
                          <label>Emergency Email</label>
                          <input
                            type="text"
                            className="form-control"
                            value={emergency_contact_email}
                            onChange={(e) =>
                              setEmergency_contact_email(e.target.value)
                            }
                          />
                        </div>

                        <div className="col-lg-4">
                          <label>Emergency Relationship</label>
                          <input
                            type="text"
                            className="form-control"
                            value={emergency_contact_relationship}
                            onChange={(e) =>
                              setEmergency_contact_relationship(e.target.value)
                            }
                          />
                        </div>
                        <div className="col-lg-4">
                          <label>Emergency Postal Address</label>
                          <input
                            type="text"
                            className="form-control"
                            value={emergency_contact_postal_address}
                            onChange={(e) =>
                              setEmergency_contact_postal_address(
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="col-lg-4">
                          <label>Emergency Physical Address</label>
                          <input
                            type="text"
                            className="form-control"
                            value={emergency_contact_physical_address}
                            onChange={(e) =>
                              setEmergency_contact_physical_address(
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    )}

                    {/* Emergency section */}
                    <div className="row">
                      <h3
                        onClick={() => toggleSection('emergency')}
                        className="text text-success"
                      >
                        3. Edit Emergency
                      </h3>
                    </div>
                    {emergencyExpanded && (
                      <div className="row">
                        <div className="col-lg-4">
                          <label htmlFor="status">Employment Status</label>
                          <input
                            type="text"
                            className="form-control"
                            value={employment_status}
                            onChange={(e) =>
                              setEmployment_status(e.target.value)
                            }
                          />
                        </div>
                        <div className="col-lg-4">
                          <label htmlFor="status">Employment Position</label>
                          <input
                            type="text"
                            className="form-control"
                            value={employment_position}
                            onChange={(e) =>
                              setEmployment_position(e.target.value)
                            }
                          />
                        </div>
                        <div className="col-lg-4">
                          <label htmlFor="status">
                            Employment Contact Phone
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            value={employer_contact_phone}
                            onChange={(e) =>
                              setEmployer_contact_phone(e.target.value)
                            }
                          />
                        </div>

                        <div className="col-lg-4">
                          <label htmlFor="status">
                            Employment Contact Email
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={employer_contact_email}
                            onChange={(e) =>
                              setEmployer_contact_email(e.target.value)
                            }
                          />
                        </div>
                        <div className="col-lg-4">
                          <label htmlFor="status">
                            Employment Postal Address
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={employment_postal_address}
                            onChange={(e) =>
                              setEmployment_postal_address(e.target.value)
                            }
                          />
                        </div>
                        <div className="col-lg-4">
                          <label htmlFor="status">
                            Employment Physical Address
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={employment_physical_address}
                            onChange={(e) =>
                              setEmployment_physical_address(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    )}
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
                            <Button
                              variant="danger"
                              onClick={handleDeleteTenant}
                            >
                              Delete
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        <button
                          className="btn btn2 float-end"
                          onClick={handleSubmit}
                        >
                          Save Tenant
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

export default EditTenant;
