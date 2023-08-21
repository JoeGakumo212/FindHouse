import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';
import { Row } from 'react-bootstrap';

const InvoiceDetails = () => {
  const router = useRouter();
  const { invoiceId } = router.query;
  const [invoiceData, setInvoiceData] = useState(null);
  const [invoicedata, setinvoicedata] = useState(null);
  const [pdfBlobURL, setPdfBlobURL] = useState('');
  const { data } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [waiverDate, setWaiverDate] = useState('');
  const [amount, setAmount] = useState('');
  const [waiverNote, setWaiverNote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
 
  const toggleDropdown = () => {
    // Toggle the value of isDropdownOpen
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;

        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        // Create the request payload with the invoiceId and pdf set to true
        const requestPayload = {
          id: invoiceId,
          pdf: true,
        };
        setIsLoading(true);
        // Fetch the data for the specific invoice using the first endpoint
        const response = await axios.post(
          'https://cloudagent.co.ke/backend/api/v1/invoices/download',
          requestPayload,
          { headers, responseType: 'blob' } // Set the responseType to 'blob'
        );

        // Create a URL for the blob to use in the iframe src
        const invoiceBlobURL = URL.createObjectURL(response.data);
        setInvoiceData({ pdfUrl: invoiceBlobURL }); // Set the invoiceData with the URL

        const responsed = await axios.get(
          `https://cloudagent.co.ke/backend/api/v1/invoices/${invoiceId}`,
          { headers }
        );

        setinvoicedata(responsed.data);
        console.log('Clicked Invoice data', responsed.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching invoice data:', error);
      }
    };

    if (invoiceId) {
      fetchInvoiceData();
    }
  }, [invoiceId]);

  // Function to handle waiver submission
  const handleSubmit = async () => {
    const { id, lease_id, property_id ,lease} = invoicedata || {};

    const data = {
      waiver_date: waiverDate,
      amount: parseInt(amount),
      waiver_note: waiverNote,
      invoice_id: id || null,
      lease_id: lease_id || null,
      property_id: property_id || null,
      lease_number: lease?.lease_number || null,
    };


    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch('https://cloudagent.co.ke/backend/api/v1/waivers', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log('Response:', responseData);
      alert('Waiver 1 submitted successfully!');
      // Optionally, do something with the response data here
      if (responseData.success) {
        alert('Waiver2 submitted successfully!');
        setIsSuccess(true); // Set the success state to true
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle any errors that occurred during the API call
    }
  };

  return (
    <>
      {/* Main Header Nav */}
      <Header />

      {/* Mobile Menu */}
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

      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-9">
              <div className="my_dashboard_review mb40">
                <div className="favorite_item_list">
                  <div className="row">
                    <div className="col-lg-12 maxw100flex-992">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="dashboard_navigationbar dn db-1024">
                            <div className="dropdown">
                              <button
                                className="dropbtn"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#DashboardOffcanvasMenu"
                                aria-controls="DashboardOffcanvasMenu"
                              >
                                <i className="fa fa-bars pr10"></i> Dashboard
                                Navigation
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-success rounded-top text-light p-2 d-flex align-items-center justify-content-between">
                          <div className="breadcrumb_content style ">
                            <p className="breadcrumb_title text-light">
                              Invoice Details
                            </p>
                            <h3 className="text-light"></h3>
                          </div>
                        </div>

                        <div className="container mt-5">
                          {/* Show loading spinner and "Loading..." text when data is fetching */}
                          {isLoading ? (
                            <div className="d-flex align-items-center">
                              <strong className=" text-primary">
                                Downloading Invoice...
                              </strong>
                              <div
                                className="spinner-border ms-auto  text-primary"
                                role="status"
                                aria-hidden="true"
                              ></div>
                            </div>
                          ) : (
                            // Show the iframe when data is fetched
                            <iframe
                              src={invoiceData.pdfUrl}
                              title="Receipt"
                              width="100%"
                              height="500px"
                            ></iframe>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="row">
                <div className="my_dashboard_review mb40">
                  <div className="favorite_item_list">
                    <div className="row">
                      <div className="col-lg-12 maxw100flex-992">
                        <div className="bg-success rounded-top text-light p-2 d-flex align-items-center justify-content-between">
                          <div className="breadcrumb_content style ">
                            <p className="breadcrumb_title text-light">
                              Summary
                            </p>
                            <p className="text-light">
                              Invoice #:{invoicedata?.invoice_number}
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4">
                            <p>
                              Property:{' '}
                              {invoicedata?.lease.property.property_name}
                            </p>
                          </div>
                          <div className="col-lg-4">
                            <p>Lease: {invoicedata?.lease.lease_number}</p>
                          </div>
                          <div className="col-lg-4">
                            <p>Unit: {invoicedata?.due_date}</p>
                          </div>
                          <div className="col-lg-12">
                            {invoicedata?.lease?.tenants.map((tenant) => (
                              <p key={tenant.id}>
                                Tenant:{' '}
                                {`${tenant.first_name} ${tenant.last_name} ${tenant.middle_name}`}
                              </p>
                            ))}
                          </div>
                          <div className="col-lg-4">
                            <p>Total: {invoicedata?.summary.invoice_amount}</p>
                          </div>
                          <div className="col-lg-4">
                            <p>Paid: {invoicedata?.summary.amount_paid}</p>
                          </div>
                          <div className="col-lg-4">
                            <p>Amount Due: {invoicedata?.summary.amount_due}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my_dashboard_review mb40">
                  <div className="favorite_item_list">
                    <div className="row">
                      <div className="col-lg-12 maxw100flex-992">
                        <div className="bg-success rounded-top text-light p-2 d-flex align-items-center justify-content-between">
                          <div className="breadcrumb_content style ">
                            <h4 className="breadcrumb_title text-light">
                              Payment History
                            </h4>
                            <p className="text-light">
                              Total Paid: {invoicedata?.summary.amount_paid}
                            </p>
                          </div>
                        </div>
                        <div className="dropdown mt-3">
                          <button
                            className="btn btn dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton2"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            onClick={toggleDropdown} // Add onClick handler to toggle the dropdown
                          >
                            <span className="text-dark px-1">
                              {
                                invoicedata?.payment_summary?.receipt_items?.[
                                  'RCT-0001'
                                ]?.summary?.receipt_number
                              }
                            </span>
                            <span className="text-secondary px-1">
                              {
                                invoicedata?.payment_summary?.receipt_items?.[
                                  'RCT-0001'
                                ]?.summary?.amount
                              }
                            </span>
                            <span className="text-info px-1">
                              {
                                invoicedata?.payment_summary?.receipt_items?.[
                                  'RCT-0001'
                                ]?.summary?.payment_date_ago
                              }
                            </span>
                          </button>

                          {/* Show the hidden div when isDropdownOpen is true */}
                          {isDropdownOpen && (
                            <div className="text-dark m-2 p-3">
                              <p>
                                Payment method:{' '}
                                {
                                  invoicedata?.payment_summary?.receipt_items?.[
                                    'RCT-0001'
                                  ]?.summary?.payment_method_name
                                }
                              </p>
                              <p>
                                Receipt Number:
                                {
                                  invoicedata?.payment_summary?.receipt_items?.[
                                    'RCT-0001'
                                  ]?.summary?.receipt_number
                                }
                              </p>
                              <p>
                                Payment Date:{' '}
                                {
                                  invoicedata?.payment_summary?.receipt_items?.[
                                    'RCT-0001'
                                  ]?.summary?.payment_date
                                }
                              </p>
                              <p>Payment Amount: {invoicedata.amount_paid}</p>
                              <p>
                                Ref:
                                {
                                  invoicedata?.payment_summary?.receipt_items?.[
                                    'RCT-0001'
                                  ]?.summary?.payment_reference
                                }
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my_dashboard_review mb40">
                  <div className="favorite_item_list">
                    <div className="row">
                      <div className="col-lg-12 maxw100flex-992">
                        <div className="bg-success rounded-top text-light p-2 d-flex align-items-center justify-content-between">
                          <div className="breadcrumb_content style ">
                            <h4 className="breadcrumb_title text-light">
                              Waiver History
                            </h4>
                            {/* Assuming `invoiceData` is the object containing the data */}
                            <p className="text-light">
                              Waivers:{' '}
                              {invoicedata?.waiver_summary?.transactions_count}
                            </p>
                            <p className="text-light">
                              Total Amount:{' '}
                              {invoicedata?.waiver_summary?.transactions_total}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {localStorage.getItem('useScope') === 'am-admin' && (
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Waiver Invoice {invoicedata?.invoice_number}
                </button>
                )}
                {/* <!-- Modal --> */}
                <div
                  className="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header bg-secondary">
                        <h3
                          className="modal-title text-dark"
                          id="staticBackdropLabel"
                        >
                          Invoice Waiver {invoicedata?.invoice_number}
                        </h3>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>

                      <div className="modal-body">
                        <div className="col-lg-12">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="waiver_date">Waiver Date</label>
                          <input
                            type="date"
                            className="form-control"
                            id="waiver_date"
                            value={waiverDate}
                            onChange={(e) => setWaiverDate(e.target.value)}
                          />
                        </div>
                        </div>
                      
                      <div className="col-lg-12">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="amount">Amount</label>
                          <input
                            type="number"
                            className="form-control"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="my_profile_setting_input form-group">
                          <label htmlFor="waiver_note">Note</label>
                          <input
                            type="text"
                            className="form-control"
                            id="waiver_note"
                            value={waiverNote}
                            onChange={(e) => setWaiverNote(e.target.value)}
                          />
                        </div>
                      </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="btn btn-secondary"
                        >
                          Add Waiver
                        </button>
                      </div>
                      {isSuccess && (
        <div className="alert alert-success" role="alert">
          Waiver submitted successfully!
        </div>
      )}
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

export default InvoiceDetails;
