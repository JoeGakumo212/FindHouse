import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState, useEffect } from 'react';

import { Button, Modal, Form } from 'react-bootstrap';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import Header from '../../../components/common/header/dashboard/Header';
import SidebarMenu from '../../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../../components/common/header/MobileMenu';

const EditUnit = ({ propertyId }) => {
  const router = useRouter(); // Initialize useRouter
  const handleBack = () => {
    router.push('my-dashboard');
  };
  const [units, setUnits] = useState([]);
  const [unitAdded, setUnitAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [unit_name, setunit_name] = useState('');
  const [unit_floor, setFloorUnit] = useState(0);
  const [unit_type_id, setunit_type_id] = useState('');
  const [unit_mode, setPropertyType] = useState('');
  const [rent_amount, setrentAmount] = useState(0);
  const [bed_rooms, setBedRooms] = useState(0);
  const [bath_rooms, setBathRooms] = useState(0);
  const [total_rooms, setTotalRooms] = useState(0);
  const [square_foot, setSquareFoot] = useState(0);
  const [shouldPreventClose, setShouldPreventClose] = useState(false);

  const [unitTypes, setUnitTypes] = useState([]);
  const [utility_id, setUtilityId] = useState('');
  const cookies = parseCookies();
  const tokenFromCookie = cookies.access_token;

  const headers = {
    Authorization: `Bearer ${tokenFromCookie}`,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    const fetchUnitTypes = async () => {
      try {
        const response = await axios.get(
          'https://cloudagent.co.ke/backend/api/v1/unit_types?list=unit_type_name,unit_type_display_name',
          { headers }
        );
        setUnitTypes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUnitTypes();
  }, []);

  const handleUtilityChange = (event) => {
    const selectedUtilityName = event.target.value;
    const selectedUtility = unitTypes.find(
      (utility) => utility.unit_type_name === selectedUtilityName
    );

    if (selectedUtility) {
      setUtilityId(selectedUtility.id);
      console.log(selectedUtility.id); // Log the selected utility ID
    }
  };

  useState('');
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePropertyTypeSelect = (type) => {
    setPropertyType(type);
    handleOpenModal();
  };

  // increment and decrement floor unit
  const handleIncrement = () => {
    setFloorUnit((prevValue) => prevValue + 1);
  };

  const handleDecrement = () => {
    if (unit_floor > 1) {
      setFloorUnit((prevValue) => prevValue - 1);
    }
  };

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value);
    setFloorUnit(newValue);
  };
  // increment and decrement fro rent amount
  const handleIncrementAmount = () => {
    setrentAmount((prevValue) => prevValue + 1);
  };

  const handleDecrementAmount = () => {
    if (rent_amount > 1) {
      setrentAmount((prevValue) => prevValue - 1);
    }
  };

  const handleInputChangeAmount = (event) => {
    const newValue = parseInt(event.target.value);
    setrentAmount(newValue);
  };

  // increment and decrement fro bedRooms
  const handleIncreBedRooms = () => {
    setBedRooms((prevValue) => prevValue + 1);
  };

  const handleDecrBedRooms = () => {
    if (bed_rooms > 1) {
      setBedRooms((prevValue) => prevValue - 1);
    }
  };

  const handleInputChangeBedRooms = (event) => {
    const newValue = parseInt(event.target.value);
    setBedRooms(newValue);
  };
  // end
  // increment and decrement fro bathrooms
  const handleIncrBathRooms = () => {
    setBathRooms((prevValue) => prevValue + 1);
  };

  const handleDecrBathRooms = () => {
    if (unitFields.bath_rooms > 1) {
      setBathRooms((prevValue) => prevValue - 1);
    }
  };

  const handleInputChangeBathRooms = (event) => {
    const newValue = parseInt(event.target.value);
    setBathRooms(newValue);
  };
  // end
  // handle total rooms
  const handleIncreaseTotalRooms = () => {
    setTotalRooms((prevValue) => prevValue + 1);
  };

  const handleDecreaseTotalRooms = () => {
    if (total_rooms > 1) {
      setTotalRooms((prevValue) => prevValue - 1);
    }
  };

  const handleInputChangeTotalRooms = (event) => {
    const newValue = parseInt(event.target.value);
    setTotalRooms(newValue);
  };
  // end

  // handle square foots
  const handleIncrSquareFoot = () => {
    setSquareFoot((prevValue) => prevValue + 1);
  };

  const handleDecrSquareFoot = () => {
    if (square_foot > 1) {
      setSquareFoot((prevValue) => prevValue - 1);
    }
  };

  const handleInputChangeSquareFoot = (event) => {
    const newValue = parseInt(event.target.value);
    setSquareFoot(newValue);
  };
  const handleSaveProperty = () => {
    // Perform any necessary action with the property title
    console.log('Property title:', propertyTitle);

    // Close the modal
    setShowModal(false);
  };
// refresh the page upon successful creation or editing of unit
// refresh the page upon successful creation or editing of unit

// Function to fetch updated unit data based on propertyId
const fetchUpdatedUnitData = async (propertyId) => {
  try {
    const response = await axios.get(
      `https://cloudagent.co.ke/backend/api/v1/units/${propertyId}`,
      { headers }
    );
    return response.data; // Return the updated unit data
  } catch (error) {
    console.error('Error fetching updated unit data:', error);
    return null;
  }
};
useEffect(() => {
  // Check if the unit was added or edited
  if (unitAdded) {
    // Fetch updated data here or use another method to update the unit data
    fetchUpdatedUnitData(propertyId).then((updatedUnitData) => {
      // Update the state with the updated unit data
      if (updatedUnitData) {
        setUnits(updatedUnitData); // Assuming updatedUnitData is the list of units after the update
      }
    });
  }
}, [unitAdded]);

// ... (your existing code)

  // save the Unit
  const handleSave = async () => {
    // Handle saving the data along with other input fields on the main page
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const unitDetails = {
        unit_name: unit_name,
        unit_floor: unit_floor,
        unit_type_id: utility_id,
        unit_mode: unit_mode,
        rent_amount: rent_amount,
        bed_rooms: bed_rooms,
        bath_rooms: bath_rooms,
        total_rooms: total_rooms,
        square_foot: square_foot,
        property_id: propertyId,
      };

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
      };

      const createUnitResponse = await axios.post(
        'https://cloudagent.co.ke/backend/api/v1/units',
        unitDetails,
        { headers }
      );

      console.log('Unit creation response:', createUnitResponse.data);
      alert('Unit created successfully');
        // Add the newly created unit to the existing list of units
        setUnits((prevUnits) => [...prevUnits, createUnitResponse.data]);
           // Update the unitAdded state to true after successful unit creation
      setUnitAdded(true); // Set the unitAdded state to true after successful unit creation
      clearInputFields();
    } catch (error) {
      console.error('Error creating unit:', error);
    }
    setShowModal(false);
  };

  const closeModal = () => {
    if (!shouldPreventClose) {
      setShowModal(false);
    }
  };

  return (
    <>
     
        <div className="container-fluid ovh">
         
          <div className="row">
            {/* modal goes */}
            <div>
             
              <div className="btn btn-danger btn-otline" id="propertyTitle"
                  placeholder="1. Unit Name"
                  value={unit_name}
                  onChange={(e) => setunit_name(e.target.value)}
                  onClick={handleOpenModal}>Add Unit</div>

              <Modal
                show={showModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                className="dark"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Unit Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="my_profile_setting_input form-group">
                    <Button
                      variant={
                        unit_mode === 'Residential'
                          ? 'primary'
                          : 'outline-primary'
                      }
                      onClick={() => handlePropertyTypeSelect('Residential')}
                    >
                      Residential
                    </Button>
                    <Button
                      variant={
                        unit_mode === 'Commercial'
                          ? 'primary'
                          : 'outline-primary'
                      }
                      onClick={() => handlePropertyTypeSelect('Commercial')}
                    >
                      Commercial
                    </Button>
                  </div>
                  {unit_mode && (
                    <>
                      <div className="my_profile_setting_input form-group">
                        <label htmlFor="unitName">Unit Name</label>
                        <input
                          type="text"
                          className="form-control border-danger"
                          id="unitName"
                          placeholder="Enter Unit Name"
                          value={unit_name}
                          onChange={(e) => setunit_name(e.target.value)}
                        />
                      </div>
                      <div className="my_profile_setting_input form-group">
                        <label htmlFor="unitFloor">Unit Floor</label>
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control"
                            id="unitFloor"
                            value={unit_floor}
                            onChange={handleInputChange}
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={handleIncrement}
                            >
                              <IoIosArrowUp />
                            </button>
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={handleDecrement}
                            >
                              <IoIosArrowDown />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="my_profile_setting_input form-group">
                        <label htmlFor="unitFloor">Rent Amount</label>
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control"
                            id="rentAmount"
                            placeholder="Rent Amount"
                            value={rent_amount}
                            onChange={handleInputChangeAmount}
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={handleIncrementAmount}
                            >
                              <IoIosArrowUp />
                            </button>
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={handleDecrementAmount}
                            >
                              <IoIosArrowDown />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="my_profile_setting_input ui_kit_select_search form-group">
                          <label>Utility Name</label>
                          <select
                            className="selectpicker form-select"
                            data-live-search="true"
                            data-width="100%"
                            value={utility_id}
                            onChange={handleUtilityChange}
                          >
                            <option value="" disabled>
                              Utility Name
                            </option>
                            {unitTypes.map((utility) => (
                              <option
                                key={utility.id}
                                value={utility.unit_type_name}
                              >
                                {utility.unit_type_display_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-xs-6">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="BedRooms">Bed Rooms</label>
                            <div className="input-group">
                              <input
                                type="number"
                                className="form-control"
                                id="BedRooms"
                                placeholder="BedRooms"
                                value={bed_rooms}
                                onChange={handleInputChangeBedRooms}
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-outline-secondary"
                                  type="button"
                                  onClick={handleIncreBedRooms}
                                >
                                  <IoIosArrowUp />
                                </button>
                                <button
                                  className="btn btn-outline-secondary"
                                  type="button"
                                  onClick={handleDecrBedRooms}
                                >
                                  <IoIosArrowDown />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-xs-6">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="BathRooms">Bath Rooms</label>
                            <div className="input-group">
                              <input
                                type="number"
                                className="form-control"
                                id="BathRooms"
                                placeholder="BathRooms"
                                value={bath_rooms}
                                onChange={handleInputChangeBathRooms}
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-outline-secondary"
                                  type="button"
                                  onClick={handleIncrBathRooms}
                                >
                                  <IoIosArrowUp />
                                </button>
                                <button
                                  className="btn btn-outline-secondary"
                                  type="button"
                                  onClick={handleDecrBathRooms}
                                >
                                  <IoIosArrowDown />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 col-xs-6">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="Total Rooms">Total Rooms</label>
                            <div className="input-group">
                              <input
                                type="number"
                                className="form-control"
                                id="TotalRooms"
                                placeholder="TotalRooms"
                                value={total_rooms}
                                onChange={handleInputChangeTotalRooms}
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-outline-secondary"
                                  type="button"
                                  onClick={handleIncreaseTotalRooms}
                                >
                                  <IoIosArrowUp />
                                </button>
                                <button
                                  className="btn btn-outline-secondary"
                                  type="button"
                                  onClick={handleDecreaseTotalRooms}
                                >
                                  <IoIosArrowDown />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-xs-6">
                          <div className="my_profile_setting_input form-group">
                            <label htmlFor="Square foots">Square Foots</label>
                            <div className="input-group">
                              <input
                                type="number"
                                className="form-control"
                                id="square_foot"
                                placeholder="square_foot"
                                value={square_foot}
                                onChange={handleInputChangeSquareFoot}
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-outline-secondary"
                                  type="button"
                                  onClick={handleIncrSquareFoot}
                                >
                                  <IoIosArrowUp />
                                </button>
                                <button
                                  className="btn btn-outline-secondary"
                                  type="button"
                                  onClick={handleDecrSquareFoot}
                                >
                                  <IoIosArrowDown />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      
                      </div>
                    </>
                  )}
                </Modal.Body>

                <Modal.Footer show={showModal} onHide={closeModal}>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  {unit_mode && (
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleSave();
                        closeModal();
                      }}
                    >
                      Continue
                    </Button>
                  )}
                </Modal.Footer>
              </Modal>
            </div>

            {/* end */}
          </div>
        </div>
  
    </>
  );
};

export default EditUnit;
