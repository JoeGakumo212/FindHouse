import React, { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';
const Payments = () => {
  const [tenantSearchTerm, setTenantSearchTerm] = useState('');
  const [leaseSearchTerm, setLeaseSearchTerm] = useState('');
  const [tenants, setTenants] = useState([]);
  const [leases, setLeases] = useState([]);
  const [isTenantLoading, setIsTenantLoading] = useState(false);
  const [isLeaseLoading, setIsLeaseLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // New payment fields
  const [payment_method_id, setPayment_Method_Id] = useState('');
  const [amount, setAmount] = useState(0);
  const [payment_date, setPaymentDate] = useState('');
  const [notes, setNotes] = useState('');
  const [paid_by, setPaidBy] = useState('');
  const [reference_number, setReferenceNumber] = useState('');
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [referenceNumbers, setReferenceNumbers] = useState([]);

  const [paymentMethods, setPaymentMethods] = useState([]);
  // end
  // fetching paymentIdMethod
  useEffect(() => {
    const cookies = parseCookies();
    const tokenFromCookie = cookies.access_token;

    const headers = {
      Authorization: `Bearer ${tokenFromCookie}`,
      'Content-Type': 'application/json',
    };

    // Fetch payment methods from the endpoint
    axios
      .get(
        'https://cloudagent.co.ke/backend/api/v1/payment_methods?list=payment_method_name,payment_method_display_name',
        {
          headers: headers,
        }
      )
      .then((response) => {
        setPaymentMethods(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePaymentMethodChange = (e) => {
    const selectedPaymentMethodId = e.target.value;
    const selectedPaymentMethod = paymentMethods.find(
      (method) => method.id === selectedPaymentMethodId
    );

    if (selectedPaymentMethod) {
      console.log(
        'Selected Payment Method:',
        selectedPaymentMethod.payment_method_display_name
      );
      console.log('Payment Method ID:', selectedPaymentMethod.id);
    }

    setPayment_Method_Id(selectedPaymentMethodId);
  };
  // end
  const handleTenantInputChange = async (e) => {
    const inputValue = e.target.value;
    setTenantSearchTerm(inputValue);
    setIsTenantLoading(true);
    setErrorMessage('');

    if (inputValue.trim() === '') {
      setTenants([]);
      setIsTenantLoading(false);
      return;
    }

    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const params = {
        $or: [
          { first_name: inputValue },
          { middle_name: inputValue },
          { last_name: inputValue },
        ],
        page: 1,
        limit: 90000,
        sortField: 'updated_at',
        sortDirection: 'desc',
        whereField: '',
        whereValue: '',
      };

      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/tenants',
        {
          params,
          headers,
        }
      );

      if (response.status === 200) {
        setTenants(response.data.data);
      } else {
        setTenants([]);
        setErrorMessage('No tenants found');
        console.error('Response data is not an array:', response.data);
      }
    } catch (error) {
      setTenants([]);
      setErrorMessage('Error searching for tenants.');
      console.error('Error occurred while searching:', error);
    }

    setIsTenantLoading(false);
  };

  const handleLeaseInputChange = async (e) => {
    const inputValue = e.target.value;
    setLeaseSearchTerm(inputValue);
    setIsLeaseLoading(true);
    setErrorMessage('');

    if (inputValue.trim() === '') {
      setLeases([]);
      setIsLeaseLoading(false);
      return;
    }

    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const params = {
        lease_number: inputValue,
        page: 0,
        limit: 0,
        sortField: 'updated_at',
        sortDirection: 'desc',
        whereField: '',
        whereValue: '',
      };

      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/leases',
        {
          params,
          headers,
        }
      );

      if (response.status === 200) {
        setLeases(response.data.data);
      } else {
        setLeases([]);
        setErrorMessage('No leases found');
        console.error('Response data is not an array:', response.data);
      }
    } catch (error) {
      setLeases([]);
      setErrorMessage('Error searching for leases.');
      console.error('Error occurred while searching:', error);
    }

    setIsLeaseLoading(false);
  };

  const handleTenantSelection = (tenant) => {
    setSelectedTenant(tenant);
    setTenantSearchTerm(
      `${tenant.first_name} ${tenant.middle_name} ${tenant.last_name}`
    );
    setTenants([tenant]);
  };

  const handleLeaseSelection = (lease) => {
    setLeaseSearchTerm(lease.lease_number);
    setLeases([lease]);
  };
  // handle submit the form here
  const handleSave = async () => {
    if (tenants.length === 1 && leases.length === 1) {
      // Validation logic
      if (!payment_method_id || amount <= 0 || !payment_date || !paid_by) {
        console.log('Please fill in all required fields.');
        alert('Please fill in all required fields.');
        return;
      }

      console.log('Selected Tenant:', tenants[0]);
      console.log('Selected Lease:', leases[0]);
      console.log('Payment Method ID:', payment_method_id);
      console.log('Amount:', amount);
      console.log('Payment Date:', payment_date);
      console.log('Notes:', notes);
      console.log('Paid By:', paid_by);
      console.log('Reference Number:', reference_number);

      try {
        // Submit payment data
        const paymentData = {
          payment_method_id,
          amount,
          payment_date,
          notes,
          paid_by,
          reference_number,
          tenant_id: tenants[0].id,
          lease_id: leases[0].id,
          property_id: leases[0].property.property_id,
          lease_number: leases[0].lease_number,
          tenant_name: tenants[0].first_name,
        };

        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;

        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.post(
          'https://cloudagent.co.ke/backend/api/v1/payments',
          paymentData,
          { headers }
        );

        // Check if the reference number is already present
        if (referenceNumbers.includes(reference_number)) {
          console.log('Reference number is not unique');
          alert('Check or Re-Enter the Reference Number, It Should be Unique');
          // Handle the case where the reference number is not unique, such as displaying an error message or updating the state.
        } else {
          console.log('Reference number is unique');
          // Add the reference number to the referenceNumbers array
          setReferenceNumbers([...referenceNumbers, reference_number]);
          alert('Payment submitted successfully');
          // Reset the form fields
          setPayment_Method_Id('');
          setAmount(0);
          setPaymentDate('');
          setNotes('');
          setPaidBy('');
          setReferenceNumber('');
          setSelectedTenant(null);
          setTenantSearchTerm('');
          setLeaseSearchTerm('');
          setTenants([]);
          setLeases([]);

          // You can perform further actions here, such as displaying a success message or updating the state.
        }
      } catch (error) {
        console.error('Error occurred while submitting payment data:', error);
        // You can handle the error here, such as displaying an error message or updating the state.
      }
    } else {
      console.log(
        'No tenant or lease selected, or multiple tenants/leases selected'
      );
      alert('All fields need to be filled');
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
            <div className="my_dashboard_review mb40">
              <div className="favorite_item_list">
                <div className="container">
                  <h2>Payments Management</h2>

                  <div className="border-dark">
                    <div className="row">
                      <h3>Add Payments</h3>
                      <div className="col-lg-6">
                        <div className="my_profile_setting_input ui_kit_select_search form-group">
                          <label htmlFor="tenantName">Tenant Name</label>
                          <input
                            type="text"
                            id="tenantName"
                            className="selectpicker form-select"
                            placeholder={
                              tenantSearchTerm.trim() ? '' : 'Find Tenant'
                            }
                            value={tenantSearchTerm}
                            onChange={handleTenantInputChange}
                          />
                          {isTenantLoading && <p>Finding Tenants...</p>}
                          {errorMessage && (
                            <p className="error-message">{errorMessage}</p>
                          )}
                        </div>
                        {tenants.length > 0 && !isLeaseLoading ? (
                          <div>
                            {tenants.map((tenant, index) => (
                              <div key={index} className="col-lg-4 mb-2">
                                <p
                                  className={`my_profile_setting_input ${
                                    selectedTenant === tenant ? 'selected' : ''
                                  }`}
                                  onClick={() => handleTenantSelection(tenant)}
                                >
                                  <strong className="text-success">
                                    Name:
                                  </strong>{' '}
                                  {tenant.first_name} {tenant.middle_name}{' '}
                                  {tenant.last_name}
                                </p>
                                {selectedTenant === tenant && (
                                  <strong className="text-success">
                                    ID/Pass: {tenant.id_passport_number}
                                  </strong>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          tenantSearchTerm.trim() !== '' &&
                          !isLeaseLoading && <p>No tenants found</p>
                        )}
                      </div>
                      <div className="col-lg-6">
                        <div className="my_profile_setting_input ui_kit_select_search form-group">
                          <label htmlFor="leaseNumber">Lease Number</label>
                          <input
                            type="text"
                            id="leaseNumber"
                            className="selectpicker form-select"
                            placeholder={
                              leaseSearchTerm.trim() ? '' : 'Find Lease'
                            }
                            value={leaseSearchTerm}
                            onChange={handleLeaseInputChange}
                          />
                          {isLeaseLoading && <p>Finding Leases...</p>}
                          {errorMessage && (
                            <p className="error-message">{errorMessage}</p>
                          )}
                        </div>
                        {leases.length > 0 && !isTenantLoading ? (
                          <div>
                            {leases.map((lease, index) => (
                              <div key={index} className="col-lg-4">
                                <p
                                  className="my_profile_setting_input"
                                  onClick={() => handleLeaseSelection(lease)}
                                >
                                  <strong className="text-success">
                                    Lease Number:
                                  </strong>{' '}
                                  {lease.lease_number}
                                  <p className="text-success">
                                    propertyName:{lease.property.property_name}{' '}
                                    <br></br>Unit: {lease.unit_names} <br></br>
                                    Type:{' '}
                                    {lease.lease_type.lease_type_display_name}
                                  </p>
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          leaseSearchTerm.trim() !== '' &&
                          !isTenantLoading && <p>No leases found</p>
                        )}
                      </div>

                      <div className="col-lg-6">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="paymentMethod">Payment Method</label>
                          <select
                            value={payment_method_id}
                            onChange={handlePaymentMethodChange}
                            id="paymentMethod"
                            className="selectpicker form-select"
                            placeholder="Payment Method"
                          >
                            <option value="" disabled defaultValue>
                              Payment Method
                            </option>
                            {paymentMethods.map((method) => (
                              <option key={method.id} value={method.id}>
                                {method.payment_method_display_name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="amount">Amount</label>
                          <input
                            type="number"
                            id="amount"
                            className="form-control"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="paymentDate">Payment Date</label>
                          <input
                            type="date"
                            id="paymentDate"
                            className="form-control"
                            placeholder="Payment Date"
                            value={payment_date}
                            onChange={(e) => setPaymentDate(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="paidBy">Paid By</label>
                          <input
                            type="text"
                            id="paidBy"
                            placeholder="Paid By"
                            className="form-control"
                            value={paid_by}
                            onChange={(e) => setPaidBy(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="referenceNumber">
                            Reference Number
                          </label>
                          <input
                            type="text"
                            id="referenceNumber"
                            className="form-control"
                            placeholder="Reference Number"
                            value={reference_number}
                            onChange={(e) => setReferenceNumber(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="notes">Notes</label>
                          <textarea
                            type="text"
                            id="notes"
                            className="form-control"
                            placeholder="Extra Notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-xl-12">
                          <div className="my_profile_setting_input">
                            <button
                              className="btn btn2 float-end"
                              onClick={handleSave}
                            >
                              Save
                            </button>
                          </div>
                        </div>
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

export default Payments;
