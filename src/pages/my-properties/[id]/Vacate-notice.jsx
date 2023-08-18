import React, { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import Header from '../../../components/common/header/dashboard/Header';
import SidebarMenu from '../../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../../components/common/header/MobileMenu';
import { useRouter } from 'next/router';

const VacateNotice = () => {
  const [property, setProperty] = useState(null);
  const [notices, setNotices] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const fetchNotices = async () => {
    try {
      setIsLoading(true);
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;
      console.log('Token notice:', tokenFromCookie);
      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(
        `https://cloudagent.co.ke/backend/api/v1/properties/${id}/notices?filter=&page=${currentPage - 1}&limit=${pageSize}&sortField=&sortDirection=&whereField=&whereValue=`,
        {
          headers: headers,
        }
      );

      if (response.ok) {
        const noticesData = await response.json();
        console.log('Notices Data:', noticesData);
        setNotices(noticesData);
        setProperty(noticesData.property || null);
        setData(noticesData.data || []);
        const totalCount = noticesData.meta?.pagination?.total;
        const totalPages = Math.ceil(totalCount / pageSize);
        setTotalPages(totalPages);
      } else {
        throw new Error(
          `Error fetching notices: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.log('Error fetching notices:', error);
      setNotices([]);
      setData([]);
      setProperty(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchNotices();
    }
  }, [id, currentPage]);

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
            <div className="spinner-border text-info ms-auto" role="status"></div>
          </div>
        ) : (
          <div>
            {(!property && data.length === 0) ? (
              <p>No Vacate Notice Data available</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Notice Title</th>
                    <th>Notice Date</th>
                    <th>Notice Description</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((notice) => (
                    <tr key={notice.id}>
                      <td>{notice.title}</td>
                      <td>{notice.date}</td>
                      <td>{notice.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {renderPagination()}
          </div>
        )}
      </div>
    </>
  );
};

export default VacateNotice;
