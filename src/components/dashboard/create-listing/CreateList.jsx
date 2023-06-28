import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import DetailedInfo from './DetailedInfo';
import { toast, ToastContainer } from 'react-nextjs-toast';

const CreateList = () => {
  const [landlord_id, setlandlord_id] = useState('');
  const [property_code, setproperty_code] = useState('');
  const [property_type_id, setproperty_type_id] = useState('');
  const [location, setlocation] = useState('');
  const [property_name, setproperty_name] = useState('');

  const [agent_commission_value, setagent_commission_value] = useState(0);
  const [agent_commission_type, setagent_commission_type] = useState('');
  const [payment_method_id, setpayment_method_id] = useState('');
  const [payment_method_description, setpayment_method_description] =
    useState('');
  const [utility_id, setutility_id] = useState('');
  const [utility_unit_cost, setutility_unit_cost] = useState('');
  const [utility_base_fee, setutility_base_fee] = useState('');
  const [extra_charge_id, setextra_charge_id] = useState('');
  const [extra_charge_value, setextra_charge_value] = useState(0);
  const [extra_charge_type, setextra_charge_type] = useState('');
  const [extra_charge_frequency, setextra_charge_frequency] = useState('');

 

  const handleIncreaseutility_base_fee = () => {
    setutility_base_fee((prevValue) => prevValue + 1);
  };

  const handleDecreaseutility_base_fee = () => {
    if (utility_base_fee > 1) {
      setutility_base_fee((prevValue) => prevValue - 1);
    }
  };

  const handleInputChangeutility_base_fee = (event) => {
    const newValue = parseInt(event.target.value);
    setutility_base_fee(newValue);
  };
  // end
  // handle agentcommisionvalue
  const handleIncreaseagent_commission_value = () => {
    setagent_commission_value((prevValue) => prevValue + 1);
  };

  const handleDecreaseagent_commission_value = () => {
    if (agent_commission_value > 1) {
      setagent_commission_value((prevValue) => prevValue - 1);
    }
  };

  const handleInputChangeagent_commission_value = (event) => {
    const newValue = parseInt(event.target.value);
    setagent_commission_value(newValue);
  };
  // end
  // handle exchangefield
  const handleIncreaseextra_charge_value = () => {
    setextra_charge_value((prevValue) => prevValue + 1);
  };

  const handleDecreaseextra_charge_value = () => {
    if (extra_charge_value > 1) {
      setextra_charge_value((prevValue) => prevValue - 1);
    }
  };

  const handleInputChangeextra_charge_value = (event) => {
    const newValue = parseInt(event.target.value);
    setextra_charge_value(newValue);
  };
  // end

  // reset the input fields
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

  const router = useRouter();
  const [data, setData] = useState({});
  const id = router.query.id;

  useEffect(() => {
    if (!id) return; // Exit early if no id is available

    const fetchData = async () => {
      try {
        // Get the access token from the cookies
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;
        // Perform request to the API using the obtained token
        const apiResponse = await fetch(
          `https://cloudagent.co.ke/backend/api/v1/properties/${id}`,
          {
            headers: {
              Authorization: `Bearer ${tokenFromCookie}`,
            },
          }
        );

        if (apiResponse.ok) {
          console.log('token', tokenFromCookie);
          const propertyData = await apiResponse.json();
          setData(propertyData);
        } else {
          // Handle unauthorized or other error cases for the API request
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();

    return () => {};
  }, [id]);

  if (Object.keys(data).length === 0) {
    // Render a loading state or a message while fetching the data
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Retrieve the unitFields from state or variable
    // const storedUnitFields = unitFields;
    const propertyDetails = {
      landlord_id,
      property_name,
      property_code,
      property_type_id,
      location,
      // unit_name,
      // unitFields: storedUnitFields,

      agent_commission_value,
      agent_commission_type,
      payment_method_id,
      payment_method_description,
      utility_unit_cost,
      utility_id,
      utility_base_fee,
      extra_charge_id,
      extra_charge_value,
      extra_charge_type,
      extra_charge_frequency,
    };

    console.log('propertyDetails:', propertyDetails);

    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      // Create the property
      const createPropertyResponse = await axios.post(
        'https://cloudagent.co.ke/backend/api/v1/properties',
        propertyDetails,
        {
          headers: {
            Authorization: `Bearer ${tokenFromCookie}`,
          },
        }
      );

      if (createPropertyResponse.status === 200) {
        console.log(
          'Property created successfully:',
          createPropertyResponse.data
        );

        const propertyId = createPropertyResponse.data.id;

      const unitDetails = {
        property_id: propertyId,
        unitFields, // Include the captured unit fields here
      };

      const createUnitResponse = await axios.post(
        'https://cloudagent.co.ke/backend/api/v1/units',
        unitDetails,
          {
            headers: {
              Authorization: `Bearer ${tokenFromCookie}`,
            },
          }
        );

        if (createUnitResponse.status === 200) {
          console.log('Unit created successfully:', createUnitResponse.data);
          
          toast.notify('Property and unit added successfully!');
         
          clearInputFields();
          ded
        } else {
          console.error(
            'Failed to create unit:',
            createUnitResponse.statusText
          );
        
        }
      } else if (createPropertyResponse.status === 422) {
        console.error('Data already exists:', createPropertyResponse.data);
        // Show error alert message for existing data
        alert('Data already exists!');
        // Handle success if needed
      } else {
        console.error(
          'Failed to create property:',
          createPropertyResponse.statusText
        );
        // Handle error if needed
      }
    } catch (error) {
      console.error('Failed to post data:', error);
      // Handle error if needed
    }
  };


  return (
    <>
      <form>
        <div className="row">
          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="landlordName">LandLord</label>
              <input
                type="text"
                className="form-control"
                id="landlord_id"
                placeholder="Find Landlord"
                value={landlord_id}
                onChange={({ target }) => setlandlord_id(target?.value)}
              />
            </div>
          </div>
         
          {/* end */}
          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label>Property Type</label>
              <select
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
                value={property_type_id}
                onChange={(e) => setproperty_type_id(e.target.value)}
              >
                <option value="" disabled selected>
                  Property Type
                </option>
                <option data-tokens="Duplex" value="Duplex">Duplex</option>
                <option data-tokens="House" value="House">House</option>
                <option data-tokens="Other" value="other">Other</option>
                <option data-tokens="Commercial" value="commercial">Commercial</option>
                <option data-tokens="Mixed_Use" value="mixed_use">Mixed Use</option>
                <option data-tokens="Apartment" value="apartment">Apartment</option>
              </select>
            </div>
          </div>
        </div>
        {/* End .col */}
        <div className="col-lg-12">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="property_name">Property Name</label>
            <input
              type="text"
              className="form-control"
              id="property_name"
              placeholder="Property Name"
              value={property_name}
              onChange={({ target }) => setproperty_name(target?.value)}
            />
          </div>
        </div>
        {/* end */}
        <div className="row">
          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="propertyTitle">Property Code</label>
              <input
                type="text"
                className="form-control"
                id="property_code"
                placeholder="Property Code"
                value={property_code}
                onChange={({ target }) => setproperty_code(target?.value)}
              />
            </div>
          </div>
          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="propertyTitle">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                placeholder="Location"
                value={location}
                onChange={({ target }) => setlocation(target?.value)}
              />
            </div>
          </div>
        </div>
        <div className="my_dashboard_review mt30">
          <div className="col-lg-12">
            <h3 className="mb30 text-danger">Unit Name</h3>
          </div>
          <DetailedInfo />
          </div>

        {/* payments deails */}
        <div className="my_dashboard_review mb-3">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="mb30 text-danger">Payments Details</h3>
            </div>
            <div className="col-lg-6 col-xs-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="agent_commission_value ">
                  Agent Commision Value
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="agent_commission_value"
                    placeholder="agentcommisionvalue"
                    value={agent_commission_value}
                    onChange={handleInputChangeagent_commission_value}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleIncreaseagent_commission_value}
                    >
                      <IoIosArrowUp />
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleDecreaseagent_commission_value}
                    >
                      <IoIosArrowDown />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label> Agent Commission Type</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  value={extra_charge_id}
                  onChange={(e) => setextra_charge_id(e.target.value)}
                >
                  <option value="" disabled selected>
                    Agent Commission Type
                  </option>
                  <option data-tokens="Duplex">Fixed</option>
                  <option data-tokens="House">% of Total Rent</option>
                  <option data-tokens="Other">% of Total Collected Rent</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Payment Method Name</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  value={payment_method_id}
                  onChange={(e) => setpayment_method_id(e.target.value)}
                >
                  <option value="" disabled selected>
                    Payment Method Name
                  </option>
                  <option data-tokens="cash">Cash</option>
                  <option data-tokens="Mpesa">Mpesa</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="propertyTitle">
                  Payment Method Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="payment_method_description"
                  placeholder="Payment Method Description"
                  value={payment_method_description}
                  onChange={({ target }) =>
                    setpayment_method_description(target?.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        {/* Extra charges */}
        <div className="my_dashboard_review mb-3">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="mb30 text-danger">Extra Charges Details</h3>
            </div>

            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label> Extra Charge Name</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  value={agent_commission_type}
                  onChange={(e) => setagent_commission_type(e.target.value)}
                >
                  <option value="" disabled selected>
                    Extra Charge Name
                  </option>
                  <option data-tokens="Duplex">VAT</option>
                  <option data-tokens="House">Services Fee</option>
                  <option data-tokens="Other">Processing Fee</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6 col-xs-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="extra_charge_value ">Extra Charge Value</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="extra_charge_value"
                    placeholder="extra_charge_value"
                    value={extra_charge_value}
                    onChange={handleInputChangeextra_charge_value}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleIncreaseextra_charge_value}
                    >
                      <IoIosArrowUp />
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleDecreaseextra_charge_value}
                    >
                      <IoIosArrowDown />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Extra Charge Type</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  value={extra_charge_type}
                  onChange={(e) => setextra_charge_type(e.target.value)}
                >
                  <option value="" disabled selected>
                    Extra Charge Type
                  </option>
                  <option data-tokens="cash">Fixed</option>
                  <option data-tokens="totalent">% of Total Rent</option>
                  <option data-tokens="totalamountoverdue">
                    % of Total Amount Over Due
                  </option>
                </select>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label>Frequency</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  value={extra_charge_frequency}
                  onChange={(e) => setextra_charge_frequency(e.target.value)}
                >
                  <option value="" disabled selected>
                    Frequency
                  </option>

                  <option data-tokens="Onetime">One Time</option>
                  <option data-tokens="periodtoperiod">Period to Period</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* utilities */}

        <div className="my_dashboard_review mb-3">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="mb30 text-danger">Utilities Details</h3>
            </div>

            <div className="col-lg-4">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label> Utility Name</label>
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  value={utility_id}
                  onChange={(e) => setutility_id(e.target.value)}
                >
                  <option value="" disabled selected>
                    Utility Name
                  </option>
                  <option data-tokens="Electricity">Electricity</option>
                  <option data-tokens="Water">Water</option>
                  <option data-tokens="Garbage">Garbage</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 ">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="property_name">Unit Cost</label>
                <input
                  type="text"
                  className="form-control"
                  id="utility_unit_cost"
                  placeholder="1. Unit Cost"
                  value={utility_unit_cost}
                  onChange={({ target }) => setutility_unit_cost(target?.value)}
                />
              </div>
            </div>
            <div className="col-lg-4 ">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="agent_commission_value ">Base Fee</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="utility_base_fee"
                    placeholder="agentcommisionvalue"
                    value={utility_base_fee}
                    onChange={handleInputChangeutility_base_fee}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleIncreaseutility_base_fee}
                    >
                      <IoIosArrowUp />
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleDecreaseutility_base_fee}
                    >
                      <IoIosArrowDown />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* end */}
        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button className="btn btn1 float-start" >
              Reset
            </button>
            <button className="btn btn2 float-end" onClick={handleSubmit}>
              Save Data
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
