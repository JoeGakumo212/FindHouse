import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';
import { useRouter } from 'next/router';
import { Modal, Tab, Nav, Button } from 'react-bootstrap';

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

      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/payments?filter=&page=0&limit=9999999999999999999999999999999999&sortField=updated_at&sortDirection=desc&whereField=&whereValue=',
        {
          headers: headers,
        }
      );

      const fetchedPayments = response.data.data;
      setPayments(fetchedPayments);
     
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

  
 

  const handleToggleActionModal = (paymentId, action) => {
    setSelectedPaymentId(paymentId);

    setShowActionModal((prevShowActionModal) => !prevShowActionModal);
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
      console.log('Payment Data:', paymentData);
      setSelectedPayment(paymentData.data)
    } catch (error) {
      console.error('API Error:', error);
    }
  };
  useEffect(() => {
    if (showStatusModal && selectedPaymentId) {
      fetchPaymentDetails(selectedPaymentId);
    }
  }, [showStatusModal, selectedPaymentId]);
  
  const handleToggleStatusModal = (paymentId) => {
    console.log('Selected Payment ID:', paymentId);
    setSelectedPaymentId(paymentId);
    console.log('Show Status Modal:', showStatusModal);
    setShowStatusModal((prevShowStatusModal) => !prevShowStatusModal);
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
                    <h1>Payments Table</h1>
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
                                onClick={() => handleToggleStatusModal(payment.id)}
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
                <Nav.Item>
                  <Nav.Link eventKey="approve">Approve</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="cancel">Cancel</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="view">
                  {/* Content for the "View" tab */}
                  {/* Add your view content here */}
                </Tab.Pane>
                <Tab.Pane eventKey="receipt">
                  {/* Content for the "Receipt" tab */}
                  {/* Add your receipt content here */}
                </Tab.Pane>
                <Tab.Pane eventKey="approve">
                  {/* Content for the "Approve" tab */}
                  {/* Add your approve content here */}
                </Tab.Pane>
                <Tab.Pane eventKey="cancel">
                  {/* Content for the "Cancel" tab */}
                  {/* Add your cancel content here */}
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Modal.Body>
        </Modal>
      )}

      <style jsx global>{`
        /* ... Custom CSS ... */

        /* Custom CSS to display the modal vertically */
        .custom-modal-dialog {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .td-pointer {
          cursor: pointer;
        }
      `}</style>
      {/* <Modal
        show={showStatusModal}
        onHide={() => {
          setShowStatusModal(false);
          setSelectedPaymentId(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Pending</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-lg-4">
            <label>Amount</label>
            <input
              type="text"
              className="form-control"
              value={selectedPaymentId?.amount ?? 'N/A'}
              readOnly
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleToggleStatusModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
      {/* Modal */}
      <Modal
        show={showStatusModal}
        onHide={() => {
        
          setShowStatusModal(false);
          setSelectedPaymentId(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Pending</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-lg-4">
            <label>Amount</label>
            <input
  type="text"
  className="form-control"
  Value={selectedPaymentId?.amount}
  readOnly
/>

          </div>
          <div className="col-lg-4">
            <label>Paid on</label>
            <input
  type="text"
  className="form-control"
  Value={selectedPayment?.payment_date}
  readOnly
/>

          </div>

          
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
