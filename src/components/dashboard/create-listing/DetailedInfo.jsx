import CheckBoxFilter from '../../common/CheckBoxFilter';
import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
const DetailedInfo = () => {
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
  // clear input fields
  const clearInputFields = () => {
    setlandlord_id('');
    setproperty_code('');
    setproperty_type_id('');
    setlocation('');
    setproperty_name('');
    setUnitFields('');
    setunit_name('');
    setFloorUnit(0);
    setunit_type_id('');
    setPropertyType('');
    setrentAmount(0);
    setBedRooms(0);
    setBathRooms(0);
    setTotalRooms(0);
    setSquareFoot(0);
    setagent_commission_value(0);
    setagent_commission_type('');
    setpayment_method_id('');
    setpayment_method_description('');
    setutility_id('');
    setutility_unit_cost('');
    setutility_base_fee('');
    setextra_charge_id('');
    setextra_charge_value('');
    setextra_charge_type('');
    setextra_charge_frequency('');
  };
  // end
  const handleSaveProperty1 = async () => {
    // Create an object with the data to be sent
    const propertyData = {
      unit_name,
      unit_floor,
      unit_type_id,
      unit_mode,
      rent_amount,
      bed_rooms,
      bath_rooms,
      total_rooms,
      square_foot,
    };
    console.log('propertyDetails:', propertyData);

    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      // Create the unit
      const createUnitResponse = await axios.post(
        'https://cloudagent.co.ke/backend/api/v1/units',
        propertyData,
        {
          headers: {
            Authorization: `Bearer ${tokenFromCookie}`,
          },
        }
      );

      if (createUnitResponse.status === 200) {
        // Close the modal
        closeModal();

        clearInputFields();
      }
    } catch (error) {
      // Handle the error
      console.error('Error saving unit:', error);
    }
  };

  const closeModal = () => {
    // Add code to close the modal
    setShowModal(false);
  };

  return (
    <div className="row">
      {/* modal goes */}
      <div>
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle"></label>
          <input
            type="text"
            className="form-control"
            id="propertyTitle"
            placeholder="1. Unit Name"
            value={unit_name}
            onChange={(e) => setunit_name(e.target.value)}
            onClick={handleOpenModal}
          />
        </div>

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
                  unit_mode === 'Residential' ? 'primary' : 'outline-primary'
                }
                onClick={() => handlePropertyTypeSelect('Residential')}
              >
                Residential
              </Button>
              <Button
                variant={
                  unit_mode === 'Commercial' ? 'primary' : 'outline-primary'
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
                    className="form-control"
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
                <div className="col-lg-12 ">
                  <div className="my_profile_setting_input ui_kit_select_search form-group">
                    {/* <label>Unit Type</label> */}
                    <select
                      className="selectpicker form-select"
                      data-live-search="true"
                      data-width="100%"
                      placeholder="Unit Type"
                      value={unit_type_id}
                      onChange={(e) => setunit_type_id(e.target.value)}
                    >
                      <option value="" disabled selected>
                        Unit Type
                      </option>
                      <option data-tokens="One_Bed_Room">One Bed Room</option>
                      <option data-tokens="Two_Bed_Roo">Two Bed Room</option>
                      <option data-tokens="Single_Room">Single Room</option>
                      <option data-tokens="cloudagent">cloudagent</option>
                      <option data-tokens="Test_cloudagent">
                        Test cloudagent
                      </option>
                      <option data-tokens="Test_Cloudagent1">
                        Test Cloudagent1
                      </option>
                      <option data-tokens="Bed_sitter">Bed sitter</option>
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
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            {unit_mode && (
              <Button
                variant="primary"
                onClick={() => {
                  handleSaveProperty1();
                  closeModal();
                }}
              >
                Save
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>

      {/* end */}
    </div>
  );
};

export default DetailedInfo;
