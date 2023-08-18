import React, { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import Header from '../../../components/common/header/dashboard/Header';
import SidebarMenu from '../../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../../components/common/header/MobileMenu';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Invoice = () => {
  const [property, setProperty] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const fetchInvoices = async () => {
    try {
      setIsLoading(true);
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;
      console.log('Token invoice:', tokenFromCookie);
      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(
        `https://cloudagent.co.ke/backend/api/v1/properties/${id}/invoices?filter=&page=${currentPage - 1}&limit=${pageSize}&sortField=&sortDirection=&whereField=&whereValue=`,
        {
          headers: headers,
        }
      );

      if (response.ok) {
        const invoicesData = await response.json();
        console.log('Invoices Data:', invoicesData); // Log the fetched data to the console
        setInvoices(invoicesData);
        setProperty(invoicesData.property || null);
        setData(invoicesData.data || []);
        // Calculate and set the total pages
        const totalCount = invoicesData.meta?.pagination?.total;
        const totalPages = Math.ceil(totalCount / pageSize);
        setTotalPages(totalPages);
      } else {
        throw new Error(
          `Error fetching invoices: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.log('Error fetching invoices:', error);
      setInvoices([]);
      setData([]);
      setProperty(null);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (id) {
      fetchInvoices();
    }
  }, [id, currentPage]);

  const handleLinkClick = (link) => {
    router.push(`/PropertyDetails/${id}/${link}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
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
            <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </a>
          </li>
          {pages}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>
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

      {/* Our Dashboard */}
      <div className="container-fluid ovh">
        {isLoading ? (
          <div className="d-flex align-items-center">
            <strong className="text-info">Loading...</strong>
            <div className="spinner-border text-info ms-auto" role="status"></div>
          </div>
        ) : (
          <>
            {(!property && (invoices.length === 0 || data.length === 0)) ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Invoice Number</th>
                    <th>Invoice Date</th>
                    <th>Invoice Amount</th>
                    <th>Paid Amount</th>
                    <th>Invoice Balance</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="7">No Invoice Data available</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Invoice Number</th>
                      <th>Invoice Date</th>
                      <th>Invoice Amount</th>
                      <th>Paid Amount</th>
                      <th>Invoice Balance</th>
                      <th>Due Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((invoice) => (
                      <tr key={invoice.id}>
                        <td>
                          {' '}
                          <Link href={`/Invoice`}>
                            <a className="nav-link text-success">
                              {invoice.invoice_number}
                            </a>
                          </Link>
                        </td>
                        <td>{invoice.invoice_date}</td>
                        <td>{invoice.summary.invoice_amount}</td>
                        <td>{invoice.amount_paid}</td>
                        <td>{invoice.summary.amount_due}</td>
                        <td>{invoice.due_date}</td>
                        <td>{invoice.status_text}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {renderPagination()}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Invoice;
