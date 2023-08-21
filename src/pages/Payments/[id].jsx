
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';

const ReceiptPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedPaymentForModal, setSelectedPaymentForModal] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [receiptData, setReceiptData] = useState(null);

  // Function to fetch payment details
  const fetchPaymentDetails = async () => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(
        `https://cloudagent.co.ke/backend/api/v1/payments/${id}`,
        {
          headers: headers,
        }
      );

      const paymentData = response.data;
      setSelectedPayment(paymentData);
      setSelectedPaymentForModal(paymentData);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPaymentDetails();
    }
  }, [id]);

  // Fetch the receipt
  const fetchReceiptData = async () => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const payload = {
        id: id, // Use id from router.query here
        pdf: true,
      };

      const response = await axios.post(
        'https://cloudagent.co.ke/backend/api/v1/payments/receipt',
        payload,
        {
          headers: headers,
          responseType: 'blob', // Specify the response type as blob
        }
      );

      const receiptBlob = response.data;

      // Create a URL for the blob to use in the iframe src
      const receiptUrl = URL.createObjectURL(receiptBlob);

      setReceiptData({ pdfUrl: receiptUrl }); // Set the receiptData with the URL
      console.log('Receipt Data', receiptUrl);
    } catch (error) {
      console.error('API Error:', error);
      alert('Error while downloading the receipt. Please try again later.');
      router.push('/Payments'); 
    }
  };

  useEffect(() => {
    if (id) {
      fetchReceiptData();
    }
  }, [id]);

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
      {/* End sidebar_menu */}

      {/* Our Dashboard */}
      <div className="col-lg-12">
        <div className="my_dashboard_review mb40">
          <div className="favorite_item_list">
            <section className="our-dashbord dashbord bgc-f7 pb50">
              <div className="container-fluid ovh">
                <div className="row">
                  <div className="col">
                    <div className="my_dashboard_review mb40">
                      <div className="favorite_item_list">
                        <div className="row">
                          <div className="col-lg-12 maxw100flex-992">
                            <div className="row">
                              {/* Start Dashboard Navigation */}
                              <div className="col-lg-12">
                                <div className="dashboard_navigationbar dn db-1024">
                                  <div className="dropdown">
                                    <button
                                      className="dropbtn"
                                      data-bs-toggle="offcanvas"
                                      data-bs-target="#DashboardOffcanvasMenu"
                                      aria-controls="DashboardOffcanvasMenu"
                                    >
                                      <i className="fa fa-bars pr10"></i>{' '}
                                      Dashboard Navigation
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* End Dashboard Navigation */}

                            <div className="bg-success rounded-top text-light p-2 d-flex align-items-center justify-content-between">
                              <div>
                                <h1 className="text-light">
                                  {selectedPaymentForModal?.receipt_number ??
                                    ''}
                                </h1>
                              </div>
                            </div>
                            <div className="container mt-5">
                              {receiptData && (
                                <iframe
                                  src={receiptData.pdfUrl}
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
                  <div className="col-lg-4">
                    <div className="my_dashboard_review mb40">
                      <div className="favorite_item_list">
                        <div className="row">
                          <div className="col-lg-12 maxw100flex-992">
                            <div className="bg-success rounded-top text-light p-1 d-flex align-items-center justify-content-between">
                              <div className="breadcrumb_content style2 ">
                                <h5 className="breadcrumb_title text-light">
                                  Summary
                                </h5>
                                <h5 className="text-light mt-3">
                                  Receipt No#{' '}
                                  {selectedPaymentForModal?.receipt_number ??
                                    ''}
                                </h5>
                              </div>
                            </div>
                            <div className="col m-2">
                              {selectedPaymentForModal && (
                                <div className="row">
                                  <div className="col-lg-6">
                                    <label>Amount</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        selectedPaymentForModal?.amount ?? ''
                                      }
                                      readOnly
                                    />
                                  </div>
                                  <div className="col-lg-6">
                                    <label>Paid on</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        selectedPaymentForModal?.payment_date ??
                                        ''
                                      }
                                      readOnly
                                    />
                                  </div>
                                  {/* Add more fields as needed */}
                                </div>
                              )}
                              <div className="row">
                                <div className="col-lg-6">
                                  <label>Amount</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={selectedPaymentForModal?.amount}
                                    readOnly
                                  />
                                </div>
                                <div className="col-lg-6">
                                  <label>Paid on</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      selectedPaymentForModal?.payment_date
                                    }
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-6">
                                  <label>Payment Method</label>

                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      selectedPaymentForModal?.payment_method
                                        ?.payment_method_description ?? 'N/A'
                                    }
                                    readOnly
                                  />
                                </div>
                                <div className="col-lg-6">
                                  <label>Lease</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      selectedPaymentForModal?.lease_number ??
                                      'N/A'
                                    }
                                    readOnly
                                  />
                                </div>
                                <div className="col-lg-6">
                                  <label>Units</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      selectedPaymentForModal?.lease?.units[0]
                                        ?.unit_name ?? 'N/A'
                                    }
                                    readOnly
                                  />
                                </div>
                                <div className="col-lg-6">
                                  <label>Tenant</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={`${
                                      selectedPaymentForModal?.tenant
                                        ?.first_name ?? 'N/A'
                                    } ${
                                      selectedPaymentForModal?.tenant
                                        ?.middle_name ?? ''
                                    } ${
                                      selectedPaymentForModal?.tenant
                                        ?.last_name ?? 'N/A'
                                    }`}
                                    readOnly
                                  />
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiptPage;
