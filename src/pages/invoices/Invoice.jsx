import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';
const InvoiceTableData = () => {
  const [leases, setLeases] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const router = useRouter();
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const fetchData = async () => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/invoices?filter=&page=0&limit=090&sortField=updated_at&sortDirection=desc&whereField=&whereValue=',
        { headers }
      );

      setLeases(response.data.data);
      setTotalPages(Math.ceil(response.data.meta.total / pageSize));
      console.log('Invoice data', response.data.data);
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
    const {
      invoice_number,
      lease_number,
      invoice_amount,
      billed_on,
      rent_amount,
    } = lease;

    return (
      (invoice_number && invoice_number.toLowerCase().includes(searchTerm)) ||
      (lease_number && lease_number.toLowerCase().includes(searchTerm)) ||
      (invoice_amount && invoice_amount.toLowerCase().includes(searchTerm)) ||
      (billed_on && billed_on.toLowerCase().includes(searchTerm)) ||
      (rent_amount && rent_amount.toString().includes(searchTerm))
    );
  });

  const filteredAndPaginatedLeases = filteredLeases.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
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
            {/* ... (previous code) */}
            <div className="col-lg-12">
              <div className="my_dashboard_review mb40">
                <div className="favorite_item_list">
                  <div className="container">
                    <h2>Invoice Management</h2>
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="my_profile_setting_input form-group">
                          <input
                            type="text"
                            value={filter}
                            onChange={handleFilterChange}
                            placeholder="Filter by Invoice Number"
                            className="form-control border-dark"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr className="bg-dark text-light">
                            <th>Invoice Number</th>
                            <th>Invoice Date</th>
                            <th>Lease</th>
                            <th>Period</th>
                            <th> Amount</th>
                            <th> Paid</th>
                            <th> Balance</th>
                            <th> Due</th>
                            <th> Status</th>
                            <th> Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {filteredAndPaginatedLeases.map((invoice) => (
                            <tr key={invoice.invoice_number}>
                              <td>
                                <Link href={`/invoices/${invoice.id}`}>
                                  <a className="btn btn-link">
                                    {invoice.invoice_number}
                                  </a>
                                </Link>
                              </td>
                              <td>{invoice.invoice_date}</td>
                              <td>{invoice.lease.lease_number}</td>
                              <td>{invoice.period_name}</td>
                              <td>{invoice.summary.amount_due}</td>
                              <td>{invoice.summary.amount_paid}</td>
                              <td>{invoice.summary.invoice_amount}</td>
                              <td>{invoice.due_date}</td>

                              <td>
                                <span
                                  className={` ${invoice.summary.status.status_btn} ${invoice.summary.status.status_color}`}
                                >
                                  <i
                                    className={`fa fa-${invoice.summary.status.status_icon}`}
                                  />{' '}
                                  {invoice.summary.status.status_text}
                                </span>
                              </td>
                              <td>
                                <ul className="view_edit_delete_list mb0">
                                  <li
                                    className="list-inline-item"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="View Invoice"
                                  >
                                    <a href={`/invoices/${invoice.id}`}>
                                      <span className="flaticon-view"></span>
                                    </a>
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
      </section>
    </>
  );
};

export default InvoiceTableData;
