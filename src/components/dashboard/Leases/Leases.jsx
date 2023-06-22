import React, { useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';

const Leases = () => {
  const [data, setData] = useState([]);
  const [property_name, setPropertyName] = useState([]);
    const [property_location, setPropertyLocation] = useState('');
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [unit_name, setUnitName] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [leaseType, setLeaseType] = useState('');
  const [rent_amount, setRentAmount] = useState('');
  const [start_date, setStartDate] = useState('');
  const [due_date, setDueDate] = useState('');
  const [currentSection, setCurrentSection] = useState('lease');
  const [rent_deposit, setRentDeposit] = useState('');
  const [utility_name, setUtilityName] = useState('');
  const [deposit_amount, setDepositAmount] = useState('');
  // tenants state declarations
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTenants, setSelectedTenants] = useState([]);
  // ends
  const [extra_charge_type, setExtraChargeType] = useState('');
  const [extra_charge_Value, setExtraChargeValue] = useState('');
  const [property_id, setExtraChargeType1] = useState(''); //need to be editted
  const [extra_charge_frequency, setExtraChargeFrequency] = useState('');
  const [late_fee_name, setLateFeeName] = useState('');
  const [late_fee_value, setLateFeeValue] = useState('');
  const [late_fee_type, setLateFeeType] = useState('');
  const [grace_period, setGracePeriod] = useState('');
  const [late_fee_frequency, setLateFeeFrequency] = useState('');
  const [utility_display_name, setUtilityDisplayName] = useState('');
  const [utility_unit_cost, setUtilityUnitCost] = useState('');
  const [utility_base_fee, setBaseFee] = useState('');
  const [payment_method_name, setPaymentMethod] = useState('');
  const [payment_method_description, setPaymentDescription] = useState('');
  const [selectedDateLease, setSelectedDateLease] = useState('');
  const [nextPeriodBilling, setNextPeriodBilling] = useState(false);
  const [waivePenalty, setWaivePenalty] = useState(false);
  const [skipStartingPeriod, setSkipStartingPeriod] = useState(false);

  // Handle next and back button
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

  const handleUnitInputChange = (event) => {
    const value = event.target.value;
    setUnitName(value);
    searchUnits(value);
  };

  const handleUnitOptionClick = (option) => {
    setUnitName(option);
    setUnitOptions([]);
  };

  const handleLeaseTypeInputChange = (event) => {
    setLeaseType(event.target.value);
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
    const amount = event.target.value;
    setRentDeposit(amount);
  };
  const handleUnitTypeChange = (event) => {
    setUtilityName(event.target.value);
  };

  const handleChangeDepositAmount = (event) => {
    setDepositAmount(event.target.value);
  };
  const handleLeaseTypeInputChange1 = (event) => {
    setExtraChargeType(event.target.value);
  };
  const handleChangeExtraChargeValue = (event) => {
    setExtraChargeValue(event.target.value);
  };
  // need to be eddited
  const handleLeaseTypeInputChange11 = (event) => {
    setExtraChargeType1(event.target.value);
  };
  // end
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
  const handleChangeUtilityName = (event) => {
    setUtilityDisplayName(event.target.value);
  };
  const handleChangeUnitCost = (event) => {
    setUtilityUnitCost(event.target.value);
  };
  const handleChangeBaseFee = (event) => {
    setBaseFee(event.target.value);
  };
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePaymentDescriptionChange = (event) => {
    setPaymentDescription(event.target.value);
  };
  const handleDateChangeLease = (event) => {
    setSelectedDateLease(event.target.value);
  };

  const handleNextPeriodBillingChange = () => {
    setNextPeriodBilling(!nextPeriodBilling);
  };

  const handleWaivePenaltyChange = () => {
    setWaivePenalty(!waivePenalty);
  };

  const handleSkipStartingPeriodChange = () => {
    setSkipStartingPeriod(!skipStartingPeriod);
  };
  // Helper function to generate an array of day options
  const generateDaysArray = () => {
    const daysArray = [];
    for (let i = 1; i <= 31; i++) {
      daysArray.push(i);
    }
    return daysArray;
  };
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
  // Fetch properties based on property_name
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
        page: 0,
        limit: 0,
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
        const propertyOptions = apiData.map(
          (property) => property.property_name
        );
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

  // Fetch units based on unit_name
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
        page: 0,
        limit: 0,
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
        page: 0,
        limit: 0,
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
  // /submit form to backend
  async function handleSubmit() {
    // Validate required fields
    if (
      !property_name ||
      !leaseType ||
      !rent_amount ||
      !start_date ||
      !due_date ||
      !rent_deposit ||
      !selectedTenants.length ||
      !late_fee_name ||
      !late_fee_value ||
      !late_fee_type ||
      !grace_period ||
      !late_fee_frequency ||
      !utility_display_name ||
      !utility_unit_cost ||
      !utility_base_fee ||
      !payment_method_name ||
      !payment_method_description ||
      !selectedDateLease
    ) {
      // Display error message or perform desired action for invalid form
      alert('Please fill in all required fields.');
      return;
    }

    // All required fields are filled, proceed with logging the form data
    console.log('Form Data:', {
      data,
      property_name,
      showOptions,
      unit_name,
      leaseType,
      rent_amount,
      start_date,
      due_date,
      currentSection,
      rent_deposit,
      utility_name,
      deposit_amount,
      searchQuery,
      selectedTenants,
      extra_charge_type,
      extra_charge_Value,
      property_id,
      extra_charge_frequency,
      late_fee_name,
      late_fee_value,
      late_fee_type,
      grace_period,
      late_fee_frequency,
      utility_display_name,
      utility_unit_cost,
      utility_base_fee,
      payment_method_name,
      payment_method_description,
      selectedDateLease,
      nextPeriodBilling,
      waivePenalty,
      skipStartingPeriod,
    });

    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      // Set the request headers
      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      // Prepare the data to be submitted
      const formData = {
        data,
        property_name,
        showOptions,
        unit_name,
        leaseType,
        rent_amount,
        start_date,
        due_date,
        currentSection,
        rent_deposit,
        utility_name,
        deposit_amount,
        searchQuery,
        selectedTenants,
        extra_charge_type,
        extra_charge_Value,
        property_id,
        extra_charge_frequency,
        late_fee_name,
        late_fee_value,
        late_fee_type,
        grace_period,
        late_fee_frequency,
        utility_display_name,
        utility_unit_cost,
        utility_base_fee,
        payment_method_name,
        payment_method_description,
        selectedDateLease,
        nextPeriodBilling,
        waivePenalty,
        skipStartingPeriod,
      };

      // Submit the form data to the endpoint
      const response = await axios.post(
        'https://cloudagent.co.ke/backend/api/v1/leases',
        formData,
        {
          headers, // Include the headers in the request
        }
      );

      // Handle successful submission
      alert('Data submitted successfully');
      console.log('Submitted Data:', response.data);
    } catch (error) {
      // Handle error
      console.error('Error submitting data:', error);
      alert('Error submitting data. Please try again.');
    }
  }
  // end

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
                  value={`${property_name} ${property_location}`}
                  onChange={handlePropertyInputChange}
                  onClick={() => setShowOptions(true)}
                  placeholder="Find property by Name"
                  className="selectpicker form-select"
                />
                {showOptions && propertyOptions.length > 0 && (
                  <ul className="autocomplete-options">
                    {propertyOptions.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => handlePropertyOptionClick(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {/* Search unit */}
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
                <label htmlFor="LEASE">Lease Type</label>
                <select
                  value={leaseType}
                  onChange={handleLeaseTypeInputChange}
                  placeholder="Enter lease type search"
                  className="selectpicker form-select"
                >
                  <option value="" disabled selected>
                    Lease Type
                  </option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
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
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="PropertyName">Unit Name</label>
                <select
                  value={utility_name}
                  onChange={handleUnitTypeChange}
                  placeholder="Enter lease type search"
                  className="selectpicker form-select"
                >
                  <option value="" disabled selected>
                    Unit Name
                  </option>
                  <option value="Electricity">Electricity</option>
                  <option value="Water">Water</option>
                  <option value="Garbage">Garbage</option>
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
            {/* <div className="col-xl-12"> */}
            <div className="col-lg-3 col-xl-0">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="Exchange Charge Type">Extra Charge Name</label>
                <select
                  value={extra_charge_type}
                  onChange={handleLeaseTypeInputChange1}
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
                  onChange={handleLeaseTypeInputChange11}
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
            <div className="col-lg-3">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="lateFeeName">Late Fee Name</label>
                <select
                  value={late_fee_name}
                  onChange={handleLateFeeName}
                  placeholder="Late Fee Name"
                  className="selectpicker form-select"
                >
                  <option value="" disabled selected>
                    Late Fee Name
                  </option>
                  <option value="Penalty">Penalty</option>
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
            {/* </div> */}
          </div>
        </div>
      )}

      {currentSection === 'latefees' && (
        <div className="latefees-section">
          {/* Render Late Fees Section */}{' '}
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-3">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="utility_display_name">Utility Name</label>
                  <select
                    value={utility_display_name}
                    onChange={(e) => setUtilityDisplayName(e.target.value)}
                    placeholder="Enter utility name"
                    className="selectpicker form-select"
                  >
                    <option value="" disabled selected>
                      Utility Name
                    </option>
                    <option value="Electricity">Electricity</option>
                    <option value="Water">Water</option>
                    <option value="Garbage">Garbage</option>
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
              <div className="col-lg-6">
                <div className="my_profile_setting_input ui_kit_select_search form-group">
                  <label htmlFor="payment_method_name">Payment Method</label>
                  <select
                    value={payment_method_name}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    placeholder="Enter payment method"
                    className="selectpicker form-select"
                  >
                    <option value="" disabled selected>
                      Payment Method
                    </option>
                    <option value="Cash">Cash</option>
                    <option value="Mpesa">Mpesa</option>
                  </select>
                </div>
              </div>

              {/* Payment Description */}

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
