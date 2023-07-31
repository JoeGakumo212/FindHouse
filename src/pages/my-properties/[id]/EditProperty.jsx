import React, { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Header from '../../../components/common/header/dashboard/Header';
import SidebarMenu from '../../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../../components/common/header/MobileMenu';
const EditProperty = () => {
  const [property, setProperty] = useState(null);
  const [unitTotal, setUnitTotal] = useState('');
  const [landlord, setLandlord] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [propertyCode, setPropertyCode] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [location, setLocation] = useState('');
  
  const [selectedUnitType, setSelectedUnitType] = useState('');
  const [unitTypes, setUnitTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;
        console.log('Token:', tokenFromCookie);
        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        console.log('ID:', id);

        // Fetch property details
        const response = await fetch(
          `https://cloudagent.co.ke/backend/api/v1/properties/${id}`,
          {
            headers: headers,
          }
        );

        if (response.ok) {
          const propertyData = await response.json();
          console.log('Property Data:', propertyData);

          setUnitTotal(propertyData.unit_total);
          setLandlord(propertyData.landlord);
          setPropertyType(propertyData.property_type.display_name);
          setPropertyCode(propertyData.property_code);
          setPropertyName(propertyData.property_name);
          setLocation(propertyData.location);
       
          setProperty(propertyData);
        } else {
          throw new Error(
            `Error fetching property details: ${response.status} ${response.statusText}`
          );
        }

        // Fetch unit types
        const unitTypesResponse = await axios.get(
          'https://cloudagent.co.ke/backend/api/v1/unit_types?list=unit_type_name,unit_type_display_name', {
            headers: headers,
          }
        );

        if (unitTypesResponse.status === 200) {
          setUnitTypes(unitTypesResponse.data);
        } else {
          throw new Error('Error fetching unit types.');
        }
      } catch (error) {
        console.log('Error fetching data:', error);
    
        setProperty(null);
        setUnitTypes([]);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!id || !property) {
    return <div>Loading...</div>;
  }
  // Event handler to update the state variables on input change
  const handleUnitTotalChange = (event) => {
    setUnitTotal(event.target.value);
  };

  const handleLandlordChange = (event) => {
    setLandlord(event.target.value);
  };
  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handlePropertyCodeChange = (event) => {
    setPropertyCode(event.target.value);
  };

  const handlePropertyNameChange = (event) => {
    setPropertyName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  
  const handleUnitTypeChange = (event) => {
    setSelectedUnitType(event.target.value);
  };

  // handle save data
 
  const handleSubmit = async () => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;
      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };
  
      const dataToUpdate = {
        unit_total: unitTotal,
        landlord: landlord,
        property_type: propertyType,
        property_code: propertyCode,
        property_name: propertyName,
        location: location,
      
      };
  
      // Make the API call to update the property
      const response = await axios.put(
        `https://cloudagent.co.ke/backend/api/v1/properties/${id}`,
        dataToUpdate,
        { headers: headers }
      );
  
      if (response.status === 200) {
        // Handle success, e.g., show a success message or redirect
        console.log('Property updated successfully');
        alert("Property updated successfully"),
        router.push(`/my-properties`)
      } else {
        // Handle error, e.g., show an error message
        console.log('Error updating property:', response.data);
      }
    } catch (error) {
      console.log('Error saving property:', error);
    }
  };
  
//  handle delete and other functionality  // 
const handleDelete = () => {
  // Show the confirmation modal
  setShowModal(true);
};

const handleSubmitDelete = async () => {
  try {
    const cookies = parseCookies();
    const tokenFromCookie = cookies.access_token;
    const headers = {
      Authorization: `Bearer ${tokenFromCookie}`,
      'Content-Type': 'application/json',
    };

    // Make the API call to delete the property
    const response = await axios.delete(
      `https://cloudagent.co.ke/backend/api/v1/properties/${id}`,
      { headers: headers }
    );

    if (response.status === 200) {
      console.log('Property updated successfully');
        alert("Property deleted successfully"),
        router.push(`/my-properties`)
    } else {
      // Handle error, e.g., show an error message
    }
  } catch (error) {
    console.log('Error deleting property:', error);
  } finally {
    // Close the confirmation modal
    setShowModal(false);
  }
};

  // Render the component with fetched data
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
                <h2 className="text-light">Edit Property</h2>
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
                  <label>Total Units:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={unitTotal}
                    onChange={handleUnitTotalChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Landlords:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={landlord}
                    onChange={handleLandlordChange}
                  />
                </div>
              </div>
              </div>
              <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Property Type:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={propertyType}
                    onChange={handlePropertyTypeChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Property Code:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={propertyCode}
                    onChange={handlePropertyCodeChange}
                  />
                </div>
              </div>
              </div>
              <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Property Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={propertyName}
                    onChange={handlePropertyNameChange}
                  />
                </div>
              </div>
          
            
           
              <div className="col">
                <div className="form-group">
                  <label>Location:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={location}
                    onChange={handleLocationChange}
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
      </div></div></div></div></section>

    </>
  );
};

export default EditProperty;
