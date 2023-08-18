import React, { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import Header from '../../../components/common/header/dashboard/Header';
import SidebarMenu from '../../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../../components/common/header/MobileMenu';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Lease = () => {
  const [property, setProperty] = useState(null);
  const [leases, setLeases] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const dataRangeStart = (currentPage - 1) * pageSize + 1;
  const dataRangeEnd = Math.min(currentPage * pageSize, data.length);

  const fetchLeases = async () => {
    try {
      setIsLoading(true);
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;
      console.log('Token lease:', tokenFromCookie);
      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(
        `https://cloudagent.co.ke/backend/api/v1/properties/${id}/leases?filter=&page=${
          currentPage - 1
        }&limit=${pageSize}&sortField=&sortDirection=&whereField=&whereValue=`,
        {
          headers: headers,
        }
      );

      if (response.ok) {
        const leasesData = await response.json();
        console.log('Leases Data:', leasesData);
        setLeases(leasesData);
        setProperty(leasesData.property || null);
        setData(leasesData.data || []);
        const totalCount = leasesData.meta?.pagination?.total;
        const totalPages = Math.ceil(totalCount / pageSize);
        setTotalPages(totalPages);
      } else {
        throw new Error(
          `Error fetching leases: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.log('Error fetching leases:', error);
      setLeases([]);
      setData([]);
      setProperty(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchLeases();
    }
  }, [id, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
      <Header />
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
      <div className="container-fluid ovh">
        {isLoading ? (
          <div className="d-flex align-items-center">
            <strong className="text-info">Loading...</strong>
            <div
              className="spinner-border text-info ms-auto"
              role="status"
            ></div>
          </div>
        ) : (
          <div>
            {!property && (leases.length === 0 || data.length === 0) ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Unit</th>
                    <th>Amount</th>
                    <th>Lease Type</th>
                    <th>Due On</th>
                    <th>Last Billing</th>
                    <th>Tenant</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="8">No Lease Data available</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Number</th>
                      <th>Unit</th>
                      <th>Amount</th>
                      <th>Lease Type</th>
                      <th>Due On</th>
                      <th>Last Billing</th>
                      <th>Tenant</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((lease) => (
                      <tr key={lease.id}>
                        <td>
                          <Link href={`/LeasesData/`}>
                            <a className="nav-link text-success">
                              {lease.lease_number}
                            </a>
                          </Link>
                        </td>
                        <td>{lease.unit_name}</td>
                        <td>{lease.rent_amount}</td>
                        <td>{lease.lease_type?.lease_type_display_name}</td>
                        <td>{lease.due_on}</td>
                        <td>{lease.billed_on}</td>
                        <td>
                          {lease.tenants[0]?.first_name}{' '}
                          {lease.tenants[0]?.last_name}
                        </td>
                        <td>{lease.status?.status_text}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {renderPagination()}
                <p className="text-center mb-3">
                  Showing {dataRangeStart}-{dataRangeEnd} of {data.length}{' '}
                  leases
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Lease;
