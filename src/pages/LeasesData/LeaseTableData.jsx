import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';
import Info from '../Vacate/Info'
const LeaseTableData = ({ tenantId }) => {
  const [leases, setLeases] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const router = useRouter();
  const [leaseData, setLeaseData] = useState(null);
  const fetchData = async () => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/leases?filter=&page=0&limit=99999999999999999999999999999999999999999999&sortField=lease_number&sortDirection=desc&whereField=&whereValue=',
        { headers }
      );

      setLeases(response.data.data);
      setTotalPages(Math.ceil(response.data.meta.total / pageSize));
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  const filteredLeases = leases.filter((lease) => {
    const searchTerm = filter.toLowerCase();
    const { lease_number, property, unit_names, billed_on, rent_amount } =
      lease;

    return (
      lease_number.toLowerCase().includes(searchTerm) ||
      property.property_code.toLowerCase().includes(searchTerm) ||
      unit_names.toLowerCase().includes(searchTerm) ||
      billed_on.toLowerCase().includes(searchTerm) ||
      rent_amount.toString().includes(searchTerm)
    );
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddLease = () => {
    router.push('/LeasesData/AddLease');
  };

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

  const handleViewLeaseDetails = (leaseId) => {
    router.push(`/LeasesData/${leaseId}`);
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
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}

                <div className="col-lg-6 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">Leases Details</h2>
                    <p>We are glad to see you again!</p>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    <div className="favorite_item_list">
                      <div className="container">
                        <h2>Leases Management</h2>
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="my_profile_setting_input">
                              <button
                                className="btn btn1 float-start"
                                onClick={handleAddLease}
                              >
                                Add Lease
                              </button>
                            </div>
                          </div>
                          <div className="col-lg-8">
                            <div className="my_profile_setting_input form-group">
                              <input
                                type="text"
                                value={filter}
                                onChange={handleFilterChange}
                                placeholder="Filter Property by Name, Location or Property Code"
                                className="form-control border-dark"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr className="bg-dark text-danger">
                                <th className="text-light">Lease No</th>
                                <th className="text-light">Property Code</th>
                                <th className="text-light">Unit</th>
                                <th className="text-light">Rent Amount</th>
                                <th className="text-light">Start Date</th>
                                <th className="text-light">Last Billing</th>
                                <th className="text-light">Status</th>
                                <th className="text-light">Statement</th>
                                <th className="text-light">Action</th>
                              </tr>
                            </thead>

                            <tbody>
                              {filteredLeases
                                .slice(
                                  (currentPage - 1) * pageSize,
                                  currentPage * pageSize
                                )
                                .map((lease) => (
                                  <tr key={lease.id}>
                                    <td>
                                      <button    className="btn btn-link" href={`/[leaseId]/${lease.id}`}>
                                        <a
                                          onClick={() =>
                                            handleViewLeaseDetails(lease.id)
                                          }
                                        >
                                          {lease.lease_number}
                                        </a>
                                      </button>
                                    </td>
                                    <td>
                                      <button    className="btn btn-link" href={`/[leaseId]/${lease.id}`}>
                                        <a
                                          onClick={() =>
                                            handleViewLeaseDetails(lease.id)
                                          }
                                        >
                                          {lease.property.property_code}
                                        </a>
                                      </button>
                                    </td>
                                    <td>{lease.unit_names}</td>
                                    <td>{lease.rent_amount}</td>
                                    <td>{lease.start_date}</td>
                                    <td>{lease.billed_on}</td>
                                    <td>{lease.status.status_text}</td>{' '}
                                    {/* Render the status text property */}
                                    <td>{lease.statement}</td>
                                    <td>
                                      <ul className="view_edit_delete_list mb0">
                                        <li
                                          className="list-inline-item"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="Edit"
                                          onClick={() =>
                                            handleEditProperty(lease)
                                          }
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
                       
                        {renderPagination()}
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

export default LeaseTableData;
