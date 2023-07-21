import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';
import { useRouter } from 'next/router';
const PaymentsTableData = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const [activeTab, setActiveTab] = useState('1');
  const [selectedTenant, setSelectedTenant] = useState(null);
const router=useRouter()
 

  const fetchData = async () => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/payments?filter=&page=0&limit=90&sortField=updated_at&sortDirection=desc&whereField=&whereValue=',
        {
          headers: headers,
        }
      );
     
      setPayments(response.data.data);
      setFilteredPayments(response.data.data);
      setTotalPages(Math.ceil(response.data.data.length / pageSize));
      console.log("Payments",response.data.data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredPayments = payments.filter(
      (payment) =>
        (payment.first_name &&
          payment.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (payment.last_name &&
          payment.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (payment.email &&
          payment.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (payment.phone &&
          payment.phone.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredPayments(filteredPayments);
    setTotalPages(Math.ceil(filteredPayments.length / pageSize));
    setCurrentPage(1);
  }, [payments, searchTerm, pageSize]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddPayment = () => {
    router.push('Payments/PaymentForm');
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  };

  const renderPagination = () => {
    // Same as before
  };

  const handleEditPayment = (paymentId) => {
    // Implement your edit payment functionality here
    console.log('Edit Payment ID:', paymentId);
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
                            placeholder="Filter Payment by Name"
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
                            <th>Last Name</th>
                            <th>Gender</th>
                            <th>Phone</th>
                            <th>Address</th>
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
                                  index % 2 === 0 ? 'table-light' : 'table-light'
                                }
                              >
                                <td>
                                  <button
                                    className="btn btn-link"
                                    onClick={() =>
                                      handleViewTenantDetails(payment.id)
                                    }
                                  >
                                    {payment.first_name}
                                  </button>
                                </td>
                                <td>{payment.amount}</td>
                                <td>{payment.gender}</td>
                                <td>{payment.phone}</td>
                                <td>{payment.physical_address}</td>
                                <td>
                                  <ul className="view_edit_delete_list mb0">
                                    <li
                                      className="list-inline-item"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Edit Payment"
                                      onClick={() => handleEditPayment(payment.id)}
                                    >
                                      <span className="flaticon-edit"></span>
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
    </>
  );
};

export default PaymentsTableData;
