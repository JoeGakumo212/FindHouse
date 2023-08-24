import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import jwtDecode from 'jwt-decode';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';
import { useRouter } from 'next/router';
import { Modal, Tab, Nav, Button } from 'react-bootstrap';
import Link from 'next/link';
import Swal from 'sweetalert2'; 

const PaymentsTableData = () => {
  const [payments, setPayments] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('view');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedPaymentForModal, setSelectedPaymentForModal] = useState(null);
  const [cancelReason, setCancelReason] = useState('');

  const pageSize = 5;

  const router = useRouter();
 
  const fetchData = async () => {
  
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;
     
      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      
      let url = '';
  let tenantId = '';
  let landlordId = '';

  if (typeof window !== 'undefined') { // Check if running in browser environment
    const useScope = localStorage.getItem('useScope');
    const tokenFromLocalStorage = localStorage.getItem('token');
    const decodedToken = jwtDecode(tokenFromLocalStorage);
    tenantId = decodedToken.sub;
    landlordId = decodedToken.sub;

      if (useScope  === 'am-admin') {
        url ='https://cloudagent.co.ke/backend/api/v1/payments?filter=&page=0&limit=9999999999999999999999999999999999&sortField=updated_at&sortDirection=desc&whereField=&whereValue='

      } else if (useScope === 'am-tenant'){       
        url = `https://cloudagent.co.ke/backend/api/v1/tenants/${tenantId}/payments?filter=&page=&limit=999999999999999999999999999999999999999999999999999&sortField=&sortDirection=&whereField=&whereValue=`; 
      }else if (useScope  ==='am-landlord'){
        console.log('landlord payments data:',landlordId);
        url=`https://cloudagent.co.ke/backend/api/v1/landlords/${landlordId}/payments?filter=&page=0&limit=999999999999999999999999999999999999999999999&sortField=&sortDirection=&whereField=&whereValue=`;
      }
    }
      if (url) {
        const response = await axios.get(url, {
          headers: headers,
        });

        const fetchedPayments = response.data.data;
        setPayments(fetchedPayments);
      }
    
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredPayments = payments.filter(
    (payment) =>
      payment.receipt_number &&
      payment.receipt_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPayments.length / pageSize);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddPayment = () => {
    router.push('Payments/PaymentForm');
  };

  // Function to fetch payment details
  const fetchPaymentDetails = async (paymentId) => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(
        `https://cloudagent.co.ke/backend/api/v1/payments/${paymentId}`,
        {
          headers: headers,
        }
      );

      const paymentData = response.data;

      setSelectedPayment(paymentData);
      console.log('data', paymentData);
      setSelectedPaymentForModal(paymentData);
    } catch (error) {
      console.error('API Error:', error);
    }
  };
  useEffect(() => {
    if (showStatusModal && selectedPaymentId) {
      fetchPaymentDetails(selectedPaymentId);
    }
  }, [showStatusModal, selectedPaymentId]);
  // status modal
  const handleToggleStatusModal = (paymentId) => {
    setSelectedPaymentId(paymentId);

    setShowStatusModal((prevShowStatusModal) => !prevShowStatusModal);
  };
  // action modal
  const handleToggleActionModal = (paymentId, action) => {
    setSelectedPaymentId(paymentId);
    setActiveTab('view');
    setShowActionModal((prevShowActionModal) => !prevShowActionModal);
    // Fetch and set the selected payment details for the modal
    fetchPaymentDetails(paymentId);
  };
  // Function to handle the approval action
  const handleApproval = async () => {
    alert("You do Not Have Permissio to Access This!!!!")
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      // Update the status of the selected payment to "approved" using POST request
      await axios.post(
        `https://cloudagent.co.ke/backend/api/v1/payments/approve`,
        {
          paymentId: selectedPaymentId, // You may need to provide additional data depending on your API requirements
        },
        {
          headers: headers,
        }
      );

      // Optionally, you can refetch the updated payment data after approval
      await fetchPaymentDetails(selectedPaymentId);
      alert('Payment has been approved successfully!');
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Payment has been approved successfully!',
      });
  
      // Close the action modal after successful approval
      setShowActionModal(false);
    } catch (error) {
      console.error('API Error:', error);
      // Handle error and show appropriate message to the user
    }
     // Display an error alert if the response status is 403 (Forbidden)
     if (error.response && error.response.status === 403) {
      alert('You do not have permission to access this resource.');
    } 
  };
  // handle cancel payment

  const handleCancelApproval = () => {
    // Close the action modal when the "Cancel" button is clicked
    setShowActionModal(false);
  };
  const handleCancelReasonChange = (event) => {
    setCancelReason(event.target.value);
  };
  const handleCancelPayment = async () => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      // You may need to adjust the cancel API endpoint and payload based on your specific requirements
      await axios.post(
        `https://cloudagent.co.ke/backend/api/v1/payments/cancel`,
        {
          id: selectedPaymentId,
          cancel_notes: cancelReason,
        },
        {
          headers: headers,
        }
      );
      console.log('token cancel', tokenFromCookie);
      // Optionally, you can refetch the updated payment data after canceling
      await fetchPaymentDetails(selectedPaymentId);

      // Show success message to the user
      alert('Payment has been canceled successfully!');

      // Close the action modal after successful cancelation
      setShowActionModal(false);
    } catch (error) {
      console.error('API Error:', error);
      // Handle error and show appropriate message to the user
    }
  };

  // pagination
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? 'active' : ''}`}
        >
          <a className="page-link" href="#" onClick={() => handlePageChange(i)}>
            {i}
          </a>
        </li>
      );
    }
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a
              className="page-link"
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </a>
          </li>
          {pages}
          <li
            className={`page-item ${
              currentPage === totalPages ? 'disabled' : ''
            }`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    );
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
      {/* End sidebar_menu */}

      {/* Our Dashbord */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="col-lg-12">
            <div className="my_dashboard_review mb40">
              <div className="favorite_item_list">
                <div className="container">
                  <h2>Payments Management</h2>

                  <div className="border-dark">
                 
                    <div className="row">
                    {typeof window !== 'undefined' && localStorage.getItem('useScope') === 'am-admin' && (
                      <div className="col-lg-4">
                        <div className="my_profile_setting_input">
                          <button
                            className="btn btn1 float-start"
                            onClick={handleAddPayment}
                          >
                            Add Payment
                          </button>
                        </div>
                      </div>
                      )}
                      <div className="col-lg-8">
                        <div className="my_profile_setting_input form-group">
                          <input
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            placeholder="Filter Payment by Receipt Number eg RCT-001"
                            className="form-control border-dark"
                          />
                        </div>
                      </div>
                    </div>
                    
                  
                    
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr className="bg-dark text-light">
                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>Payment Date</th>
                            <th>Tenant</th>
                            <th>Lease</th>

                            <th>Receipt No</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPayments
                            .slice(
                              (currentPage - 1) * pageSize,
                              currentPage * pageSize
                            )
                            .map((payment, index) => (
                              <tr
                                key={payment.id}
                                className={
                                  index % 2 === 0
                                    ? 'table-light'
                                    : 'table-light'
                                }
                              >
                                <td>{payment.amount ?? 'N/A'}</td>
                                <td>
                                  {payment.payment_method
                                    ?.payment_method_description ?? 'N/A'}
                                </td>
                                <td>{payment.payment_date ?? 'N/A'}</td>
                                <td>{payment.tenant?.first_name ?? 'N/A'}</td>
                                <td>{payment.lease_number ?? 'N/A'}</td>

                                <td>{payment.receipt_number ?? 'N/A'}</td>
                                <td
                                  onClick={() =>
                                    handleToggleStatusModal(payment.id)
                                  }
                                  className="text-info td-pointer"
                                >
                                  {payment.status?.status_text ??
                                    'Default Status'}
                                </td>

                                <td>
                                  <ul className="view_edit_delete_list mb0">
                                    <li
                                      className="list-inline-item"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="More Actions"
                                      onClick={() =>
                                        handleToggleActionModal(
                                          payment.id,
                                          'view'
                                        )
                                      }
                                      // onClick={() =>
                                      //   handleEditPayment(payment.id)
                                      // }
                                    >
                                      <span className="flaticon-edit text-danger"></span>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {renderPagination()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedPaymentId && (
        <Modal
          show={showActionModal}
          onHide={() => {
            setShowActionModal(false);
            setSelectedPaymentId(null);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Action to Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Container
              activeKey={activeTab}
              onSelect={(tab) => setActiveTab(tab)}
            >
              <Nav variant="tabs" className="justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="view">View</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="receipt">Receipt</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link eventKey="approve">Approve</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="cancel">Cancel</Nav.Link>
                </Nav.Item> */}
             {/* Show 'Approve' tab only if the selectedPayment is not canceled or approved */}
             {typeof window !== 'undefined' && localStorage.getItem('useScope') === 'am-admin' && (
              <>
        {!selectedPaymentId ||
        !['canceled', 'approved'].includes(selectedPayment?.status?.status_text) ? (
          <Nav.Item>
            <Nav.Link eventKey="approve">Approve</Nav.Link>
          </Nav.Item>
        ) : null}
        {/* Show 'Cancel' tab only if the selectedPayment is not canceled */}
        {!selectedPaymentId ||
        selectedPayment?.status?.status_text !== 'canceled' ? (
          <Nav.Item>
            <Nav.Link eventKey="cancel">Cancel</Nav.Link>
          </Nav.Item>
        ) : null}
             </>)}
      </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="view">
                  {selectedPaymentForModal && (
                    <div className="row">
                      <div className="col-lg-4">
                        <label>Amount</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedPaymentForModal?.amount ?? ''}
                          readOnly
                        />
                      </div>
                      <div className="col-lg-4">
                        <label>Paid on</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedPaymentForModal?.payment_date ?? ''}
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
                        value={selectedPaymentForModal?.payment_date}
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
                      <label>Tenant</label>
                      <input
                        type="text"
                        className="form-control"
                        value={`${
                          selectedPaymentForModal?.tenant?.first_name ?? 'N/A'
                        } ${
                          selectedPaymentForModal?.tenant?.middle_name ?? ''
                        } ${
                          selectedPaymentForModal?.tenant?.last_name ?? 'N/A'
                        }`}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <label>Recorded By</label>
                    <input
                      type="text"
                      className="form-control"
                      value={
                        selectedPaymentForModal?.tenant?.first_name ?? 'N/A'
                      }
                      readOnly
                    />
                  </div>
                  <div className="col-lg-12">
                    <label>Notes</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedPaymentForModal?.notes ?? 'N/A'}
                      readOnly
                    />
                  </div>
                  {selectedPaymentForModal?.status?.status_text ===
                    'cancelled' && (
                    <>
                      <div className="col-lg-12">
                        <label>Canceled By</label>
                        <input
                          type="text"
                          className="form-control"
                          value={`${
                            selectedPaymentForModal?.cancel_user?.first_name ??
                            'N/A'
                          } ${
                            selectedPaymentForModal?.cancel_user?.last_name ??
                            'N/A'
                          }`}
                          readOnly
                        />
                      </div>
                      <div className="col-lg-12">
                        <label>Cancel Comments</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedPaymentForModal?.cancel_notes ?? 'N/A'}
                          readOnly
                        />
                      </div>
                    </>
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="receipt">
                  {selectedPaymentId && (
                    <div className="row">
                      <div className="col-lg-12">
                        <Link href={`/Payments/${selectedPaymentId}`}>
                          <a ><h1 className='text-info'>View Receipt</h1></a>
                        </Link>
                      </div>
                    </div>
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="approve">
                  <div className="row">
                    <div className="col-lg-12">
                      <h3 className="text-danger">
                        Approve Payment? Confirm permanent action.
                      </h3>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <button
                        type="button"
                        className="btn btn-primary me-3"
                        onClick={handleApproval}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCancelApproval}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Tab.Pane>
                ;
                <Tab.Pane eventKey="cancel">
                  <div className="row">
                    <div className="col-lg-12">
                      <label className="text-danger">Cancel Reason</label>
                      <input
                        type="text"
                        className="form-control"
                        value={cancelReason}
                        onChange={handleCancelReasonChange}
                        required // Add the "required" attribute here
                      />
                    </div>
                  </div>
                  <h4 className="text-danger mt-3">
                    {selectedPayment
                      ? selectedPayment.status.status_text
                      : 'Loading...'}
                  </h4>
                  {selectedPaymentForModal && (
                    <div className="row">
                      <div className="col-lg-4">
                        <label>Amount</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedPaymentForModal?.amount ?? ''}
                          readOnly
                        />
                      </div>
                      <div className="col-lg-4">
                        <label>Paid on</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedPaymentForModal?.payment_date ?? ''}
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
                        value={selectedPaymentForModal?.payment_date}
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
                      <label>Tenant</label>
                      <input
                        type="text"
                        className="form-control"
                        value={`${
                          selectedPaymentForModal?.tenant?.first_name ?? 'N/A'
                        } ${
                          selectedPaymentForModal?.tenant?.middle_name ?? ''
                        } ${
                          selectedPaymentForModal?.tenant?.last_name ?? 'N/A'
                        }`}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <label>Recorded By</label>
                    <input
                      type="text"
                      className="form-control"
                      value={
                        selectedPaymentForModal?.tenant?.first_name ?? 'N/A'
                      }
                      readOnly
                    />
                  </div>
                  <div className="col-lg-12">
                    <label>Notes</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedPaymentForModal?.notes ?? 'N/A'}
                      readOnly
                    />
                  </div>
                  <div className="row mt-3">
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="my_profile_setting_input">
                          <button
                            type="button"
                            className="btn float-start btn-primary"
                            onClick={() => setShowActionModal(false)}
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn  btn-secondary float-end  me-3"
                            onClick={handleCancelPayment}
                          >
                            Cancel Payment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Modal.Body>
        </Modal>
      )}

      

      <Modal
        show={showStatusModal}
        onHide={() => {
          setShowStatusModal(false);
          setSelectedPaymentId(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="text-danger">
              {selectedPayment
                ? selectedPayment.status.status_text
                : 'Loading...'}
            </h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
              <label>Amount</label>
              <input
                type="text"
                className="form-control"
                value={selectedPayment?.amount}
                readOnly
              />
            </div>
            <div className="col-lg-6">
              <label>Paid on</label>
              <input
                type="text"
                className="form-control"
                value={selectedPayment?.payment_date}
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
              <label>Tenant</label>
              <input
                type="text"
                className="form-control"
                value={`${selectedPayment?.tenant?.first_name ?? 'N/A'} ${
                  selectedPayment?.tenant?.middle_name ?? ''
                } ${selectedPayment?.tenant?.last_name ?? 'N/A'}`}
                readOnly
              />
            </div>
          </div>
          <div className="col-lg-12">
            <label>Recorded By</label>
            <input
              type="text"
              className="form-control"
              value={selectedPayment?.tenant?.first_name ?? 'N/A'}
              readOnly
            />
          </div>
          <div className="col-lg-12">
            <label>Notes</label>
            <input
              type="text"
              className="form-control"
              value={selectedPayment?.notes ?? 'N/A'}
              readOnly
            />
          </div>
          {selectedPayment?.status?.status_text === 'cancelled' && (
            <>
              <div className="col-lg-12">
                <label>Canceled By</label>
                <input
                  type="text"
                  className="form-control"
                  value={`${
                    selectedPayment?.cancel_user?.first_name ?? 'N/A'
                  } ${selectedPayment?.cancel_user?.last_name ?? 'N/A'}`}
                  readOnly
                />
              </div>
              <div className="col-lg-12">
                <label>Cancel Comments</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedPayment?.cancel_notes ?? 'N/A'}
                  readOnly
                />
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleToggleStatusModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PaymentsTableData;
