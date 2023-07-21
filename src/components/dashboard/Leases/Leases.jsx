import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';

const Leases = () => {
  const [data, setData] = useState([]);
  const [property_name, setPropertyName] = useState('');
  const [unit_name, setUnitName] = useState('');
  const [currentSection, setCurrentSection] = useState('lease');
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [unit_mode, setUnitMode] = useState('');
  const [rent_amount, setRentAmount] = useState('');
  const [start_date, setStartDate] = useState('');
  const [due_date, setDueDate] = useState('');
  const [rent_deposit, setRentDeposit] = useState('');
  const [utility_name, setUtilityName] = useState('');
  const [deposit_amount, setDepositAmount] = useState('');
  const [selectedTenants, setSelectedTenants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [property_id, setPropertyId] = useState('');
  const [extra_charge_type, setExtraChargeType] = useState('');
  const [extra_charge_Value, setExtraChargeValue] = useState('');
  const [extra_charge_frequency, setExtraChargeFrequency] = useState('');
  const [late_fee_name, setLateFeeName] = useState('');
  const [late_fee_value, setLateFeeValue] = useState('');
  const [late_fee_type, setLateFeeType] = useState('');
  const [grace_period, setGracePeriod] = useState('');
  const [late_fee_frequency, setLateFeeFrequency] = useState('');
  const [utility_display_name, setUtilityDisplayName] = useState('');
  const [utility_unit_cost, setUtilityUnitCost] = useState('');
  const [utility_base_fee, setUtilityBaseFee] = useState('');
  const [payment_method_description, setPaymentDescription] = useState('');
  const [selectedDateLease, setSelectedDateLease] = useState('');

  const [payment_method_id, setPayment_Method_Id] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [utilities, setUtilities] = useState([]);
  const [leaseType, setLeaseType] = useState('');
  const [selectedUtilityId, setSelectedUtilityId] = useState('');
  const [supportData, setSupportData] = useState(null);
  const [selectedLeaseType, setSelectedLeaseType] = useState('');
  const [selectedLateFee, setSelectedLateFee] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedUtility, setSelectedUtility] = useState('');
  const [selectedExtraCharge, setSelectedExtraCharge] = useState('');

  // getting the support data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/lease_support_data',
        { headers }
      );
      const data = response.data;
      setSupportData(data);
    } catch (error) {
      console.error('Error fetching support data:', error);
    }
  };
  // Define currentSectionData based on the currentSection value

  let currentSectionData = [];
  if (currentSection === 'lease') {
    currentSectionData = supportData?.lease_types || [];
  } else if (currentSection === 'extra') {
    currentSectionData = supportData?.extra_charges || [];
  } else if (currentSection === 'deposit') {
    currentSectionData = supportData?.deposit_types || [];
  } else if (currentSection === 'latefees') {
    currentSectionData = supportData?.late_fees || [];
  } else if (currentSection === 'utility') {
    currentSectionData = supportData?.utilities || [];
  }

  //  end
  const handleLeaseTypeChange = (event) => {
    const selectedName = event.target.value;
    const selectedId = supportData.lease_types.find(
      (leaseType) => leaseType.lease_type_name === selectedName
    )?.id;
   
    setSelectedLeaseType(selectedName);
  };
  const handleLateFeeChange = (event) => {
    const selectedName = event.target.value;
    const selectedLateFee = supportData.late_fees[0];

    if (selectedLateFee) {
      const selectedId = selectedLateFee.id;
     
      setSelectedLateFee(selectedName);
    }
  };

  const handlePaymentMethodChange = (event) => {
    const selectedName = event.target.value;
    const selectedId = supportData.payment_methods.find(
      (paymentMethod) => paymentMethod.payment_method_name === selectedName
    )?.id;
  
    setSelectedPaymentMethod(selectedName);
  };

  const handleUtilityChange = (event) => {
    const selectedName = event.target.value;
    const selectedId = supportData.utilities.find(
      (utility) => utility.utility_name === selectedName
    )?.id;
   
    setSelectedUtility(selectedName);
  };

  const handleExtraChargeChange = (event) => {
    const selectedName = event.target.value;
    const selectedId = supportData.extra_charges.find(
      (extraCharge) => extraCharge.extra_charge_name === selectedName
    )?.id;
   
    setSelectedExtraCharge(selectedName);
  };
  // end

  const handleNextClick = () => {
    if (currentSection === 'lease') {
      setCurrentSection('deposit');
    } else if (currentSection === 'deposit') {
      setCurrentSection('extra');
    } else if (currentSection === 'extra') {
      setCurrentSection('latefees');
    } else if (currentSection === 'latefees') {
      setCurrentSection('utility');
    }
  };

  const handleBackClick = () => {
    if (currentSection === 'deposit') {
      setCurrentSection('lease');
    } else if (currentSection === 'extra') {
      setCurrentSection('deposit');
    } else if (currentSection === 'latefees') {
      setCurrentSection('extra');
    } else if (currentSection === 'utility') {
      setCurrentSection('latefees');
    }
  };

  const handlePropertyInputChange = (event) => {
    const value = event.target.value;
    setPropertyName(value);
    searchProperties(value);
    setShowOptions(true);
  };

  const handleUnitInputChange = (event) => {
    const value = event.target.value;
    setUnitName(value);
    searchUnits(value);
  };

  const handleUnitOptionClick = (option) => {
    setUnitName(option);
    setUnitOptions([]);
  };
  const handleUnitModeInputChange = (event) => {
    const value = event.target.value;
    setUnitMode(value);
  };
  const handleRentAmountChange = (event) => {
    setRentAmount(event.target.value);
  };
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleChangeRentDepositAmount = (event) => {
    setRentDeposit(event.target.value);
  };
  const handleUnitTypeChange = (event) => {
    setUtilityName(event.target.value);
  };

  const handleChangeDepositAmount = (event) => {
    setDepositAmount(event.target.value);
  };

  const handleLeaseTypeInputChange1 = (event) => {
    setPropertyId(event.target.value);
  };

  const handleChangeExtraChargeValue = (event) => {
    setExtraChargeValue(event.target.value);
  };

  const handleLeaseTypeInputChange2 = (event) => {
    setExtraChargeFrequency(event.target.value);
  };

  const handleLateFeeName = (event) => {
    setLateFeeName(event.target.value);
  };

  const handleChangeLatefeeValue = (event) => {
    setLateFeeValue(event.target.value);
  };

  const handleChangeLateFeeType = (event) => {
    setLateFeeType(event.target.value);
  };

  const handleChangeGracePeriod = (event) => {
    setGracePeriod(event.target.value);
  };

  const handleChangeLateFeeFrequency = (event) => {
    setLateFeeFrequency(event.target.value);
  };
  const handleChangeUnitCost = (event) => {
    setUtilityUnitCost(event.target.value);
  };

  const handleChangeBaseFee = (event) => {
    setUtilityBaseFee(event.target.value);
  };

  const handleDateChangeLease = (event) => {
    setSelectedDateLease(event.target.value);
  };

  const handleLeaseTypeInputChanged = (event) => {
    setExtraChargeType(event.target.value);
  };
  const handleLeaseExtraChargeTypeInputChange = (value) => {
    setExtraChargeType(value);
  };
  // Helper function to generate an array of day options
  const generateDaysArray = () => {
    const daysArray = [];
    for (let i = 1; i <= 31; i++) {
      daysArray.push(i);
    }
    return daysArray;
  };
  const searchUnits = async (query) => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const params = {
        unit: query,
        page: 1,
        limit: 10000,
        sortField: 'updated_at',
        sortDirection: 'desc',
        whereField: '',
        whereValue: '',
      };

      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/units',
        {
          params,
          headers,
        }
      );

      if (response.status === 200) {
        const apiData = response.data.data;
        const unitOptions = apiData.map((property) => property.unit_name);
        setUnitOptions(unitOptions);
        console.log('Units Data', apiData);
        console.log('Unit Options', unitOptions);
      } else {
        console.error('Response data is not an array:', apiData.data);
      }
    } catch (error) {
      console.error('Error occurred while searching:', error);
    }
  };

  const handlePropertyOptionClick = (option) => {
    setPropertyName(option);
    setPropertyOptions([]);
    setShowOptions(false);

    const property = data.find((property) => property.property_name === option);
    if (property) {
      setUnitName(property.unit_name);
      setUnitOptions([property.unit_name]);
    } else {
      setUnitName('');
      setUnitOptions([]);
    }
  };
  // finding property and it id

  const searchProperties = async (query) => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const params = {
        property: query,
        page: 1,
        limit: 1000,
        sortField: 'updated_at',
        sortDirection: 'desc',
        whereField: '',
        whereValue: '',
      };

      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/properties',
        {
          params,
          headers,
        }
      );

      if (response.status === 200) {
        const apiData = response.data.data;
        const propertyOptions = apiData.map((property) => ({
          property_name: property.property_name,
          property_id: property.id,
        }));
        setPropertyOptions(propertyOptions);
        setData(apiData);
        console.log('Property Details Name', apiData);
      } else {
        console.error('Response data is not an array:', apiData.data);
      }
    } catch (error) {
      console.error('Error occurred while searching:', error);
    }
  };

  const handlePropertyInputChanged = (event) => {
    const { value } = event.target;
    setPropertyName(value);
    searchProperties(value);
  };
  const handlePropertyOptionClicked = (option) => {
    console.log('Selected Property Name:', option.property_name);
    console.log('Selected Property ID:', option.property_id);

    setPropertyName(option.property_name);
    setShowOptions(false);
  };
  const selectedProperty = propertyOptions.find(
    (option) => option.property_name === property_name
  );
  const propertyId = selectedProperty ? selectedProperty.id : null;
console.log("Property Id",propertyId)  
  // tenants search logic

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    searchTenants(event.target.value);
  };

  const handleTenantSelect = (tenant) => {
    if (selectedTenants.includes(tenant)) {
      setSelectedTenants(
        selectedTenants.filter((selected) => selected !== tenant)
      );
    } else {
      setSelectedTenants([...selectedTenants, tenant]);
    }
  };

  const handleCheckboxChange = (tenant) => {
    if (selectedTenants.includes(tenant)) {
      setSelectedTenants(
        selectedTenants.filter((selected) => selected !== tenant)
      );
    } else {
      setSelectedTenants([tenant]);
    }

    setSearchQuery(`${tenant.first_name} ${tenant.middle_name}`);
    setSearchResults([]); // Clear the search results to hide other tenants
  };
  // ends here
  // search tenants starts here
  const searchTenants = async (query) => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      // Set the request headers
      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const params = {
        $or: [
          { first_name: { $regex: query, $options: 'i' } },
          { middle_name: { $regex: query, $options: 'i' } },
        ],
        page: 1,
        limit: 100,
        sortField: 'updated_at',
        sortDirection: 'desc',
        whereField: '',
        whereValue: '',
      };

      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/tenants',
        {
          params,
          headers, // Include the headers in the request
        }
      );

      if (response.status === 200) {
        const apiData = response.data.data;
        setSearchResults(apiData);
      } else {
        console.error('Response data is not an array:', apiData.data);
      }
    } catch (error) {
      console.error('Error occurred while searching:', error);
    }
  };
  // ends
  // handle submit function
  async function handleSubmit() {
    const selectedProperty = propertyOptions.find(
      (option) => option.property_name === property_name
    );
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };
      // Extract the IDs of the selected items
      const selectedLeaseTypeId = supportData.lease_types.find(
        (leaseType) => leaseType.lease_type_name === selectedLeaseType
      )?.id;
      const selectedLateFeeId = supportData.late_fees.find(
        (lateFee) => lateFee.late_fee_name === selectedLateFee
      )?.id;
      const selectedPaymentMethodId = supportData.payment_methods.find(
        (paymentMethod) =>
          paymentMethod.payment_method_name === selectedPaymentMethod
      )?.id;
      const selectedUtilityId = supportData.utilities.find(
        (utility) => utility.utility_name === selectedUtility
      )?.id;
      const selectedExtraChargeId = supportData.extra_charges.find(
        (extraCharge) => extraCharge.extra_charge_name === selectedExtraCharge
      )?.id;

      const formData = {
        data: {
          tenants: selectedTenants,
        
          propertyId: selectedProperty.property_id,
          units: [
            {
              unit_name: unit_name,
              unit_mode: unit_mode,
              rent_amount: rent_amount,
            },
          ],
          start_date,
          due_date,
          rent_deposit,
          utilityDeposits: deposit_amount,            
          extra_charge_Value,
          extra_charge_frequency,
          late_fee_name,
          late_fee_value,
          late_fee_type,
          grace_period,
          late_fee_frequency,
          utility_display_name,
          utility_unit_cost,
          utility_base_fee,
          payment_method_description,
          selectedDateLease,
          leaseTypeId: selectedLeaseTypeId,
          lateFeeId: selectedLateFeeId,
          paymentMethodId: selectedPaymentMethodId,
          utilityId: selectedUtilityId,
          extraChargeId: selectedExtraChargeId,
        },
      };

      const response = await axios.post(
        'https://cloudagent.co.ke/backend/api/v1/leases',
        formData,
        {
          headers,
        }
      );

      alert('Data submitted successfully');
      console.log('Submitted Data:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data. Please try again.');
    }
  }
  // ends here
  return (
    <>
      {currentSection === 'lease' && (
        <div className="lease-section">
          <div className="row">
            <h3>Lease Info</h3>
            <div className="col-lg-4">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="PropertyName">Property Name</label>
                <input
                  type="text"
                  value={property_name}
                  onChange={handlePropertyInputChanged}
                  onClick={() => setShowOptions(true)}
                  placeholder="Find property by Name"
                  className="selectpicker form-select"
                />
                {showOptions && propertyOptions.length > 0 && (
                  <ul className="autocomplete-options">
                    {propertyOptions.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => handlePropertyOptionClicked(option)}
                      >
                        {option.property_name} - {option.id}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="unitname">Unit Name</label>
                <input
                  type="text"
                  value={unit_name}
                  onChange={handleUnitInputChange}
                  placeholder="Find Unit ..."
                  className="selectpicker form-select"
                />
                {unitOptions.length > 0 && (
                  <ul className="autocomplete-options">
                    {unitOptions.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => handleUnitOptionClick(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="col-lg-4 col-xl-0">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="LEASE">Lease Types</label>
                <select
                  value={selectedLeaseType}
                  onChange={handleLeaseTypeChange}
                  className="selectpicker form-select"
                >
                  {currentSectionData.map((leaseType) => (
                    <option
                      key={leaseType.id}
                      value={leaseType.lease_type_name}
                    >
                      {leaseType.lease_type_display_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="RentAmount">Rent Amount</label>
                <input
                  type="number"
                  className="form-control"
                  id="totalentAmount"
                  placeholder="Rent Amount"
                  value={rent_amount}
                  onChange={handleRentAmountChange}
                />
              </div>
            </div>
            <div className="col-lg-4 col-xl-0">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="dateOfBirth">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="start_date"
                  placeholder="Start date"
                  value={start_date}
                  onChange={handleStartDateChange}
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="dueonmonthday">Due on (Day of the Month)</label>
                <select
                  value={due_date}
                  onChange={handleDateChange}
                  className="selectpicker form-select"
                >
                  <option value="" disabled>
                    Select a day
                  </option>
                  {generateDaysArray().map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="my_profile_setting_input">
                  <button
                    className="btn btn2 float-end"
                    onClick={handleNextClick}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentSection === 'deposit' && (
        <div className="deposit-section">
          <h1>Deposit</h1>
          <div className="row">
            <div className="col-lg-12">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="PropertyName">Rent Deposit Amount</label>
                <input
                  type="number"
                  placeholder="Rent Deposit Amount"
                  className="form-control"
                  value={rent_deposit}
                  onChange={handleChangeRentDepositAmount}
                />
              </div>
            </div>
            <div className="col-lg-6 col-xl-0">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="UTILITY">Utilities</label>
                <select
                  value={selectedUtility}
                  onChange={handleUtilityChange}
                  className="selectpicker form-select"
                >
                  {supportData.utilities.map((utility) => (
                    <option key={utility.id} value={utility.utility_name}>
                      {utility.utility_display_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="PropertyName">Rent Deposit Amount</label>
                <input
                  type="number"
                  placeholder="Deposit Amount"
                  className="form-control"
                  value={deposit_amount}
                  onChange={handleChangeDepositAmount}
                />
              </div>
            </div>
            <h2 className="text-danger">Tenants Name</h2>
            <div className="col-lg-12">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <input
                  type="text"
                  placeholder="Find Tenants Name"
                  className="selectpicker form-select"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
              </div>
              {searchResults.length > 0 && (
                <ul className="autocomplete-options">
                  {searchResults.map((tenant, index) => (
                    <li key={index} onClick={() => handleTenantSelect(tenant)}>
                      <input
                        type="checkbox"
                        checked={selectedTenants.includes(tenant)}
                        onChange={() => handleCheckboxChange(tenant)}
                      />
                      {tenant.first_name} {tenant.middle_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="col-xl-12">
              <div className="my_profile_setting_input">
                <button
                  className="btn btn1 float-start"
                  onClick={handleBackClick}
                >
                  Back
                </button>
                <button
                  className="btn btn2 float-end"
                  onClick={handleNextClick}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentSection === 'extra' && (
        <div className="Extra-Charge-section">
          <div className="row">
            <div className="col-lg-6 col-xl-0">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="EXTRA_CHARGE">Extra Charges</label>
                <select
                  value={selectedExtraCharge}
                  onChange={handleExtraChargeChange}
                  className="selectpicker form-select"
                >
                  {currentSectionData.map((extraCharge) => (
                    <option
                      key={extraCharge.id}
                      value={extraCharge.extra_charge_name}
                    >
                      {extraCharge.extra_charge_display_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="PropertyName">extra_charge_Value</label>
                <input
                  type="number"
                  placeholder="extra_charge_Value"
                  className="form-control"
                  value={extra_charge_Value}
                  onChange={handleChangeExtraChargeValue}
                />
              </div>
            </div>
            <div className="col-lg-3 col-xl-0">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="Exchange Charge Type">Extra Charge Type</label>
                <select
                  value={property_id}
                  onChange={handleLeaseTypeInputChanged}
                  placeholder="Enter lease type search"
                  className="selectpicker form-select"
                >
                  <option value="" disabled selected>
                    Extra Charge Type
                  </option>
                  <option value="Fixed">Fixed</option>
                  <option value="% of Total Rent">% of Total Rent</option>
                  <option value="% of Total Amunt Over Due">
                    % of Total Amunt Over Due
                  </option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-xl-0">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="Frequency">Frequency</label>
                <select
                  value={extra_charge_frequency}
                  onChange={handleLeaseTypeInputChange2}
                  placeholder="Enter lease type search"
                  className="selectpicker form-select"
                >
                  <option value="" disabled selected>
                    Frequency
                  </option>
                  <option value="One Time">One Time</option>
                  <option value="Period to Period">Period to Period</option>
                </select>
              </div>
            </div>
            <hr />
            <h2 className="text-center text-danger">Late Fees</h2>
            <div className="col-lg-3 col-xl-0">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="LATE_FEE">Late Fees</label>
                <select
                  value={selectedLateFee}
                  onChange={handleLateFeeChange}
                  className="selectpicker form-select"
                >
                  {supportData.late_fees.map((lateFee) => (
                    <option key={lateFee.id} value={lateFee.late_fee_name}>
                      {lateFee.late_fee_display_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="PropertyName">late_fee_value </label>
                <input
                  type="number"
                  placeholder="late_fee_value "
                  className="form-control"
                  value={late_fee_value}
                  onChange={handleChangeLatefeeValue}
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="late_fee_type">Late Fee Type</label>
                <select
                  value={late_fee_type}
                  onChange={handleChangeLateFeeType}
                  placeholder="Enter late fee type search"
                  className="selectpicker form-select"
                >
                  <option value="" disabled selected>
                    Late Fee Type
                  </option>
                  <option value="Fixed">Fixed</option>
                  <option value="% of Total Rent">% of Total Rent</option>
                  <option value="% of Total Amount Over Due">
                    % of Total Amount Over Due
                  </option>
                </select>
              </div>
            </div>{' '}
            <div className="col-lg-3">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="PropertyName">Grace Period </label>
                <input
                  type="number"
                  placeholder="Grace Period "
                  className="form-control"
                  value={grace_period}
                  onChange={handleChangeGracePeriod}
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="frequency">Frequency</label>
                <select
                  value={late_fee_frequency}
                  onChange={handleChangeLateFeeFrequency}
                  placeholder="Enter frequency search"
                  className="selectpicker form-select"
                >
                  <option value="" disabled selected>
                    Frequency
                  </option>
                  <option value="OneTime">One Time</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-Weekely">Bi-Weekely</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
            </div>
            <div className="my_profile_setting_input">
              <button
                className="btn btn1 float-start"
                onClick={handleBackClick}
              >
                Back
              </button>
              <button className="btn btn2 float-end" onClick={handleNextClick}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {currentSection === 'latefees' && (
        <div className="latefees-section">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-3 col-xl-0">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="UTILITY">Utilities</label>
                  <select
                    value={selectedUtility}
                    onChange={handleUtilityChange}
                    className="selectpicker form-select"
                  >
                    {supportData.utilities.map((utility) => (
                      <option key={utility.id} value={utility.utility_name}>
                        {utility.utility_display_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="UtilityName">utility unit cost </label>
                  <input
                    type="number"
                    placeholder="Unit cost "
                    className="form-control"
                    value={utility_unit_cost}
                    onChange={handleChangeUnitCost}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="UtilityName">Base Fee</label>
                  <input
                    type="number"
                    placeholder="Base Fee "
                    className="form-control"
                    value={utility_base_fee}
                    onChange={handleChangeBaseFee}
                  />
                </div>
              </div>
              <hr />
              <h3>Payments Methods</h3>

              {/* Payment Description */}
              <div className="col-lg-6 col-xl-0">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="PAYMENT_METHOD">Payment Methods</label>
                  <select
                    value={selectedPaymentMethod}
                    onChange={handlePaymentMethodChange}
                    className="selectpicker form-select"
                  >
                    {supportData.payment_methods.map((paymentMethod) => (
                      <option
                        key={paymentMethod.id}
                        value={paymentMethod.payment_method_name}
                      >
                        {paymentMethod.payment_method_display_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="payment_method_description">
                    Payment Description
                  </label>
                  <input
                    type="text"
                    value={payment_method_description}
                    onChange={(e) => setPaymentDescription(e.target.value)}
                    placeholder="Payment Description"
                    className="form-control"
                  />
                </div>
              </div>

              <hr />
              <h2 className=" text-danger">Lease Settings</h2>
              <div className="row">
                <div className="col-lg-12">
                  <div className="my_profile_setting_input ui_kit_select_search form-group">
                    <label htmlFor="leaseDays">Lease Days</label>
                    <select
                      value={selectedDateLease}
                      onChange={handleDateChangeLease}
                      className="selectpicker form-select"
                    >
                      <option value="" disabled>
                        Select a day
                      </option>
                      {generateDaysArray().map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="billingPeriod">Billing Period</label>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="nextPeriodBilling"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="nextPeriodBilling"
                      >
                        Next Period Billing (When billing, invoice period is set
                        as next month.)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="my_profile_setting_input form-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="waivePenalty"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="waivePenalty"
                      >
                        Waive Penalty (For this lease, do not charge penalties.)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="my_profile_setting_input form-group">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="skipStartingPeriod"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="skipStartingPeriod"
                      >
                        Skip Starting Period (For this lease, do not bill the
                        first period.)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my_profile_setting_input">
                <button
                  className="btn btn1 float-start"
                  onClick={handleBackClick}
                >
                  Back
                </button>
                <button className="btn btn2 float-end" onClick={handleSubmit}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Leases;
