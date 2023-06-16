import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import DatePicker from 'react-datepicker';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
const Leases = () => {




  const [lateFeeFields, setLateFeeFields] = useState({
    late_fee_id: '',
    late_fee_value: '',
    late_fee_type: '',
    late_fee_frequency: '',
    grace_period: '',
  });

  const [data, setData] = useState([]);

  const [property_name, setPropertyInput] = useState('');
  const [unit_name, setUnitInput] = useState('');
  const [unit_mode, setLeaseTypeInput] = useState('');
  const [utility_name, setUnitType] = useState('');
  const [extra_charge_name, setextra_charge_name] = useState('');
  const [rent_amount, settotalrentAmount] = useState(0);
  const [start_date, setStartDate] = useState(null);
  const [due_date, setSelectedDate] = useState('');
  const [selectedDateLease, setselectedDateLease] = useState('');
  const [first_name, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [leaseTypeOptions, setLeaseTypeOptions] = useState([]);
  const [tenantOptions, setTenantOptions] = useState([]);
  const [currentSection, setCurrentSection] = useState('lease');
  const [selectedTenants, setSelectedTenants] = useState([]);

  // const [late_fee_type, setLateFeeType] = useState('');
  // const [gracePeriod, setGracePeriod] = useState(0);
  // const [late_fee_frequency, setFrequency] = useState('');
  const [utility_display_name, setUtilityName] = useState('');
  const [utility_unit_cost, setCost] = useState('');
  const [utility_base_fee, setBaseFee] = useState(0);
  const [payment_method_name, setPaymentMethod] = useState('');
  const [payment_method_description, setPaymentDescription] = useState('');
  // const [late_fee_value, setLateFeeCharges] = useState(0);
  const [deposit_amount, setDepositAmount] = useState(0);
  const [extra_charge_value, setRentAmount1] = useState(0);
  const [extra_charge_type, setLeaseTypeInput1] = useState('');
  const [extra_charge_frequency, setLeaseTypeInput2] = useState('');
  const [late_fee_name, setLeaseTypeInput3] = useState('');
  const [grace_period, setGracePeriod1] = useState(0);
  const [rent_deposit, setRentDepositAmount] = useState(0);
  // Event handlers
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLateFeeFields((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangeRentDepositAmount = (event) => {
    setRentDepositAmount(event.target.value);
  };
  const handlergracePeriodChange = (event) => {
    setGracePeriod(event.target.value);
  };
  const handletotalrentAmount = (event) => {
    settotalrentAmount(event.target.value);
  };
  const handleRentAmount1 = (event) => {
    setRentAmount1(event.target.value);
  };
  const handledepositAmount = (event) => {
    setDepositAmount(event.target.value);
  };
  const handleLateFeeCharges = (event) => {
    setLateFeeCharges(event.target.value);
  };

  const handleUnitOptionClick = (unit) => {
    setUnitInput(unit);
    setUnitOptions([]); // Hide unit options
    setPropertyOptions([]); // Hide property options
    setLeaseTypeOptions([]); // Hide lease type options
  };

  const handleLateFeeTypeChange = (event) => {
    setLateFeeType(event.target.value);
  };

  const handleGracePeriod = (event) => {
    setGracePeriod1(event.target.value);
  };

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  const handlePropertyInputChange = (event) => {
    setPropertyInput(event.target.value);
    searchProperties(event.target.value);
  };

  const handleUnitInputChange = (event) => {
    setUnitInput(event.target.value);
    searchUnits(event.target.value);
  };
  const handleUnitInputClick = () => {
    searchUnits(unit_name);
  };

  const handleLeaseTypeInputChange = (event) => {
    setLeaseTypeInput(event.target.value);
    searchLeaseTypes(event.target.value);
  };
  const handleLeaseTypeInputChanges = (event) => {
    setextra_charge_name(event.target.value);
    searchLeaseTypes(event.target.value);
  };
  const handleLeaseTypeInputChange1 = (event) => {
    setLeaseTypeInput1(event.target.value);
    searchLeaseTypes(event.target.value);
  };
  const handleLeaseTypeInputChange2 = (event) => {
    setLeaseTypeInput2(event.target.value);
    searchLeaseTypes(event.target.value);
  };
  const handleLeaseTypeInputChange3 = (event) => {
    setLeaseTypeInput3(event.target.value);
    searchLeaseTypes(event.target.value);
  };
  const handleUnitTypeChange = (event) => {
    setUnitType(event.target.value);
    searchUnits(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const handleDateChangeLease = (event) => {
    setselectedDateLease(event.target.value);
  };
  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
    searchTenants(inputValue);
  };

  const handleTenantSelect = (tenant) => {
    setSelectedTenants([...selectedTenants, tenant]);
    setSearchInput('');
    setSearchResults([]);
  };

  const handleRemoveTenant = (index) => {
    const updatedTenants = [...selectedTenants];
    updatedTenants.splice(index, 1);
    setSelectedTenants(updatedTenants);
  };
  const handleCheckboxChange = (tenant) => {
    if (selectedTenants.includes(tenant)) {
      setSelectedTenants(
        selectedTenants.filter((selected) => selected !== tenant)
      );
    } else {
      setSelectedTenants([...selectedTenants, tenant]);
    }
  };

  // Generate an array of all days in a month
  const generateDaysArray = () => {
    const daysArray = [];
    const currentDate = new Date();
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    for (let i = 1; i <= lastDay; i++) {
      daysArray.push(i.toString());
    }

    return daysArray;
  };
  // end
  const searchProperties = async (query) => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;
      console.log('teke teke token', tokenFromCookie);
      // Set the request headers
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
          params: {
            property: query,
            page: 0,
            limit: 0,
            sortField: 'updated_at',
            sortDirection: 'desc',
            whereField: '',
            whereValue: '',
          },
          headers: headers, // Include the headers in the request
        }
      );

      if (response.status === 200) {
        const apiData = response.data.data;
        const propertyOptions = apiData.map(
          (property) => property.property_code
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
  // end of search property name
  // login to fetch the endpoint for units
  const searchUnits = async (query) => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      // Set the request headers
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
          params: {
            unit: query,
            page: 0,
            limit: 0,
            sortField: 'updated_at',
            sortDirection: 'desc',
            whereField: '',
            whereValue: '',
          },
          headers: headers, // Include the headers in the request
        }
      );

      if (response.status === 200) {
        const apiData = response.data.data;
        // const unitOptions = apiData.map((item) => item.units).flat();
        console.log('Units Data', apiData);
        const unitOptions = apiData.map((property) => property.unit_name);
        setUnitOptions(unitOptions);
        console.log('Unit Options', unitOptions);
      } else {
        console.error('Response data is not an array:', apiData.data);
      }
    } catch (error) {
      console.error('Error occurred while searching:', error);
    }
  };
  // end of unitsearch  //
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

  const handlePropertyOptionClick = (property) => {
    setPropertyInput(property);
    setUnitInput(''); // Reset unit input value
    setPropertyOptions([]); // Hide property options
    setLeaseTypeInput(''); // Reset lease type input value

    const selectedProperty = data.find(
      (item) => item.property_code === property
    );
    if (selectedProperty && selectedProperty.units) {
      const unitOptions = selectedProperty.units.map((unit) => unit.unit_name);
      setUnitOptions(unitOptions);
    } else {
      setUnitOptions([]);
    }
  };

  const searchLeaseTypes = async (query) => {
    // TODO: Implement search function for lease types
  };

  const handleTenantInputChange = (event) => {
    // TODO: Implement handling of tenant input change
  };

  const handleNextClick = () => {
    if (currentSection === 'lease') {
      setCurrentSection('deposit');
    } else if (currentSection === 'deposit') {
      setCurrentSection('tenant');
    } else if (currentSection === 'tenant') {
      setCurrentSection('latefees');
    } else if (currentSection === 'latefees') {
      setCurrentSection('utility');
    }
  };

  const handleBackClick = () => {
    if (currentSection === 'deposit') {
      setCurrentSection('lease');
    } else if (currentSection === 'tenant') {
      setCurrentSection('deposit');
    } else if (currentSection === 'latefees') {
      setCurrentSection('tenant');
    } else if (currentSection === 'utility') {
      setCurrentSection('latefees');
    }
  };

  useEffect(() => {
    // Perform any necessary initialization or side effects here
  }, []);
  // handle form submit here
  const handleSubmit = async () => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      // Set the request headers
      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const formData = {
        // Your formData properties here

        property_name,
        unit_name,
        unit_mode,
        utility_name,
        rent_amount,
        start_date,
        due_date,
        selectedDateLease,
        searchResults,
        propertyOptions,
        unitOptions,
        tenantOptions,
        currentSection,
        selectedTenants,
        rent_deposit,
        extra_charge_name,
        late_fee_type,
        late_fee_frequency,
        utility_display_name,
        utility_unit_cost,
        utility_base_fee,
        payment_method_name,
        payment_method_description,
        late_fee_value,
        deposit_amount,
        extra_charge_value,
        extra_charge_type,
        extra_charge_frequency,
        late_fee_name,
        grace_period,
      };

      const response = await axios.post(
        'https://cloudagent.co.ke/backend/api/v1/leases',
        formData,
        {
          headers, // Include the headers in the request
        }
      );
      console.log('Data sent:', formData);
      if (response.status === 200) {
        alert('Form submitted successfully'); // Display an alert on success
        // Handle the successful response
      } else {
        console.error('Failed to submit form');
        // Handle the error response
      }
    } catch (error) {
      console.error('Error occurred while submitting form:', error);
    }
      // Reset form fields
  setPropertyInput('');
  setUnitInput('');
  setLeaseTypeInput('');
  setUtilityName('');
 
  setStartDate(null);
  setSelectedDate('');
  setselectedDateLease('');
  setSearchResults([]);
  setPropertyOptions([]);
  setUnitOptions([]);
  setTenantOptions([]);
  setCurrentSection('lease');
  setSelectedTenants([]);
  
  setLateFeeType('');
 
  
  setGracePeriod(0);
  };

  return (
    <>
      {currentSection === 'lease' && (
        <div className="lease-section">
          <div className="row">
            <div className="col-lg-4">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="PropertyName">Property Name</label>
                <input
                  type="text"
                  value={property_name}
                  onChange={handlePropertyInputChange}
                  onClick={() => setPropertyOptions([])} // Clear property options on click
                  placeholder="Find property by Name"
                  className="selectpicker form-select"
                />
                {propertyOptions.length > 0 && (
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

            <div className="col-lg-4">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="unitname">Unit Name</label>
                <input
                  type="text"
                  value={unit_name}
                  onChange={handleUnitInputChange}
                  onClick={handleUnitInputClick}
                  placeholder=" unit search"
                  className="selectpicker form-select"
                />
                {unitOptions.length > 0 && (
                  <ul className="autocomplete-options">
                    {unitOptions.map((option, index) => (
                      <li
                        key={index} // Assign a unique key
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
                  value={unit_mode}
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

            <div className="col-lg-4 ">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="agent_commission_value">Rent Amount</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="totalentAmount"
                    placeholder="Rent Amount"
                    value={rent_amount}
                    onChange={handletotalrentAmount}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => settotalrentAmount(rent_amount + 1)}
                    >
                      <IoIosArrowUp />
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => settotalrentAmount(rent_amount - 1)}
                    >
                      <IoIosArrowDown />
                    </button>
                  </div>
                </div>
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
                  onChange={(e) => setStartDate(e.target.value)}
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
      )}

      {currentSection === 'deposit' && (
        <div className="deposit-section">
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
                <label htmlFor="PropertyName">Deposit Amount</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="deposit_amount"
                    placeholder="Rent Amount"
                    value={deposit_amount}
                    onChange={handledepositAmount}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setDepositAmount(deposit_amount + 1)}
                    >
                      <IoIosArrowUp />
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setDepositAmount(deposit_amount - 1)}
                    >
                      <IoIosArrowDown />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
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

      {currentSection === 'tenant' && (
        <div className="tenant-section">
          <div className="row">
            <h2>Tenants Name</h2>
            <div className="col-lg-12">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <input
                  type="text"
                  placeholder="Search Tenant Name"
                  className="selectpicker form-select"
                  value={first_name}
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
            <div className="col-lg-12">
              {selectedTenants.length > 0 && (
                <div className="my_profile_setting_input">
                  <label>Selected Tenants:</label>
                  <ul>
                    {selectedTenants.map((tenant, index) => (
                      <li key={index}>
                        {tenant.first_name} {tenant.middle_name}
                        <div className="my_profile_setting_input">
                          <button
                            className="remove-tenant-btn btn btn1 "
                            onClick={() => handleRemoveTenant(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedTenants.length > 0 && (
                <div className="my_profile_setting_input form-group">
                  <input
                    type="text"
                    placeholder="Enter selected tenants"
                    className="selectpicker form-select"
                    value={selectedTenants
                      .map(
                        (tenant) => `${tenant.first_name} ${tenant.middle_name}`
                      )
                      .join(', ')}
                    readOnly
                  />
                </div>
              )}
            </div>
          </div>
          <hr />
          <div className="row">
            <h1>Extra Charges</h1>
            <div className="col-lg-3 col-xl-0">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="Extra Charges Name">Extra Charges Name</label>
                <select
                  value={extra_charge_name}
                  onChange={handleLeaseTypeInputChanges}
                  placeholder="Enter lease type search"
                  className="selectpicker form-select"
                >
                  <option value="" disabled selected>
                    Extra Charges Name
                  </option>
                  <option value="VAT">VAT</option>
                  <option value="Service Fee">Service Fee</option>
                  <option value="Proccessing Fee">Proccessing Fee</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 ">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="Extra Charge Value">Extra Charge Value</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="extra_charge_value"
                    placeholder="Rent Amount"
                    value={extra_charge_value}
                    onChange={handleRentAmount1}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setRentAmount1(extra_charge_value + 1)}
                    >
                      <IoIosArrowUp />
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setRentAmount1(extra_charge_value - 1)}
                    >
                      <IoIosArrowDown />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-xl-0">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="Exchange Charge Type">Extra Charge Type</label>
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
            <hr />
          </div>
          <div className="row">
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

      {/*  */}
      {currentSection === 'latefees' && (
        <div className="latefees-section">
          <h2 className="text-center text-danger">Late Fees</h2>
          <div className="row">
            <div className="col-lg-12">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="lateFeeName">Late Fee Name</label>
                <select
                  value={late_fee_name}
                  onChange={handleLeaseTypeInputChange3}
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
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="lateFeeCharges">Late Fee Value</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="late_fee_value"
                    placeholder="Late Fee"
                    value={lateFeeFields.late_fee_value}
                    onClick={handleChange}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setLateFeeFields(lateFeeFields.late_fee_value + 1)}
                    >
                      <IoIosArrowUp />
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setLateFeeFields(lateFeeFields.late_fee_value - 1)}
                    >
                      <IoIosArrowDown />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="late_fee_type">Late Fee Type</label>
                <select
                  value={lateFeeFields.late_fee_type}
                  onChange={handleChange}
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
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="grace_period">Grace Period</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="grace_period"
                    placeholder="Rent Amount"
                    value={lateFeeFields.grace_period}
                    onChange={handleChange}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() =>  setLateFeeFields(lateFeeFields.grace_period + 1)}
                    >
                      <IoIosArrowUp />
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() =>  setLateFeeFields(lateFeeFields.grace_period - 1)}
                    >
                      <IoIosArrowDown />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="frequency">Frequency</label>
                <select
                  value={lateFeeFields.late_fee_frequency}
                  onChange={handleChange}
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
          </div>
          <div className="row">
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
      {currentSection === 'utility' && (
        <div className="utility-section">
          {/* Utility Name */}
          <div className="row">
            <div className="col-lg-12">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="utility_display_name">Utility Name</label>
                <select
                  value={utility_display_name}
                  onChange={(e) => setUtilityName(e.target.value)}
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
          </div>

          {/* Cost */}
          <div className="row">
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="cost">Cost</label>
                <input
                  type="number"
                  value={utility_unit_cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="utility_unit_cost"
                  className="form-control"
                />
              </div>
            </div>
          </div>

          {/* Base Fee */}
          <div className="row">
            <div className="col-lg-6">
              <div className="my_profile_setting_input ui_kit_select_search form-group">
                <label htmlFor="utility_base_fee">Base Fee</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="utility_base_fee"
                    placeholder="Base Fee Amount"
                    value={utility_base_fee}
                    onChange={(e) => setBaseFee(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setBaseFee(utility_base_fee + 1)}
                    >
                      <IoIosArrowUp />
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setBaseFee(utility_base_fee - 1)}
                    >
                      <IoIosArrowDown />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}

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
          <div className="lease-settings-section">
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
                    <label className="form-check-label" htmlFor="waivePenalty">
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
          </div>
          <div className="row">
            <div className="col-xl-12">
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
