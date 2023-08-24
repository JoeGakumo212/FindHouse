import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';
import EditNoticeModal from './EditNoticeModal';
import jwtDecode from 'jwt-decode';

const VacateTableData = () => {
  const [vacateNotices, setVacateNotices] = useState([]);
  const [filteredVacateNotices, setFilteredVacateNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVacateNotice, setSelectedVacateNotice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewVacateNoticeDetails = (vacateNoticeId) => {
    router.push(`/Vacate/${vacateNoticeId}`);
  };

  const fetchData = async () => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };
      const page = currentPage - 1; // Subtract 1 from currentPage to align with 0-based indexing

      let url = '';
      let tenantId = '';
      let landlordId = '';

      if (typeof window !== 'undefined') {
        // Check if running in browser environment
        const useScope = localStorage.getItem('useScope');
        const tokenFromLocalStorage = localStorage.getItem('token');
        const decodedToken = jwtDecode(tokenFromLocalStorage);
        tenantId = decodedToken.sub;
        landlordId = decodedToken.sub;

        if (useScope === 'am-admin') {
          url = `https://cloudagent.co.ke/backend/api/v1/vacation_notices?filter=&limit=999999999999999999999999999999999999999&sortField=updated_at&sortDirection=desc&whereField=&whereValue=`;
        } else if (useScope === 'am-tenant') {
      
          url = `https://cloudagent.co.ke/backend/api/v1/tenants/${tenantId}/notices?filter=&page=0&limit=0&sortField=&sortDirection=&whereField=&whereValue=`;
        } else if (useScope === 'am-landlord') {
          url = `https://cloudagent.co.ke/backend/api/v1/landlords/${landlordId}/notices?filter=&page=0&limit=0&sortField=&sortDirection=&whereField=&whereValue=`;
        }
      }
      if (url) {
        const response = await axios.get(url, {
          headers: headers,
        });

        setVacateNotices(response.data.data);

        setTotalPages(Math.ceil(response.data.total / pageSize));
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data whenever currentPage changes

  const filterAndPaginateNotices = () => {
    const filteredNotices = vacateNotices.filter(
      (notice) =>
        (notice.tenant?.first_name &&
          notice.tenant?.first_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (notice.lease?.lease_number &&
          notice.lease?.lease_number
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (notice.property?.property_name &&
          notice.property?.property_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))
    );

    setFilteredVacateNotices(filteredNotices);
    setTotalPages(Math.ceil(filteredNotices.length / pageSize)); // Use filteredNotices.length instead of vacateNotices.length
    setCurrentPage(1);
  };

  const fetchLeasesByTenantId = async (tenantId) => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;
      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(
        `https://cloudagent.co.ke/backend/api/v1/tenants/${tenantId}/leases?filter=&page=0&limit=0&sortField=&sortDirection=&whereField=&whereValue=`,
        {
          headers: headers,
        }
      );

      setLeases(response.data.data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const handleEditNotice = async (vacateNoticeId) => {
    const selectedNotice = vacateNotices.find(
      (notice) => notice.id === vacateNoticeId
    );

    setSelectedVacateNotice(selectedNotice);

    // Fetch Tenant and Lease data for the selected notice's Tenant ID
    if (selectedNotice && selectedNotice.tenant_id) {
      // Call the locally defined fetchLeasesByTenantId function
      await fetchLeasesByTenantId(selectedNotice.tenant_id);
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = (editedNotice) => {
    // Update the notice in the list or make an API call to save changes to the backend
    // For simplicity, let's just update the state here
    const updatedNotices = vacateNotices.map((notice) =>
      notice.id === editedNotice.id ? editedNotice : notice
    );

    setVacateNotices(updatedNotices);
    setIsModalOpen(false);
  };
  const handleAddVacate = () => {
    router.push('/Vacate/VacateForm');
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    filterAndPaginateNotices(); // Call the filtering and pagination function when the search term changes
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  };
  // handle pagination
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5; // Set the maximum number of visible page links

    // Calculate the start and end page indices
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    // Ensure that we display enough pages to the right if there's not enough to the left
    if (totalPages - endPage < startPage - 1) {
      startPage = Math.max(totalPages - maxVisiblePages + 1, 1);
    }

    if (currentPage > 1) {
      pages.push(
        <li key="prev" className="page-item">
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </a>
        </li>
      );
    }

    if (startPage > 1) {
      pages.push(
        <li key="1" className="page-item">
          <a className="page-link" href="#" onClick={() => handlePageChange(1)}>
            1
          </a>
        </li>
        // Add an ellipsis here if needed
      );
    }

    if (startPage > 2) {
      pages.push(
        <li key="ellipsis-left" className="page-item">
          <span className="page-link">...</span>
        </li>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
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

    if (endPage < totalPages - 1) {
      pages.push(
        <li key="ellipsis-right" className="page-item">
          <span className="page-link">...</span>
        </li>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <li key={totalPages} className="page-item">
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </a>
        </li>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
        <li key="next" className="page-item">
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </a>
        </li>
      );
    }
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">{pages}</ul>
      </nav>
    );
  };
  // end
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
                  <h2>Vacate Notices Management</h2>

                  <div className="border-dark">
                    <div className="row">
                      {typeof window !== 'undefined' &&
                        localStorage.getItem('useScope') === 'am-admin' && (
                          <div className="col-lg-4">
                            <div className="my_profile_setting_input">
                              <button
                                className="btn btn1 float-start"
                                onClick={handleAddVacate}
                              >
                                Add Vacate Notice
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
                            placeholder="Filter Notice by Name"
                            className="form-control border-dark"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr className="bg-dark text-light">
                            <th>Vacating Date</th>
                            <th>Tenant</th>
                            <th>Lease</th>
                            <th>Property</th>
                            <th>Unit</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(searchTerm ? filteredVacateNotices : vacateNotices)
                            .slice(
                              (currentPage - 1) * pageSize,
                              currentPage * pageSize
                            )
                            .map((notice, index) => (
                              <tr
                                key={notice.id}
                                className={
                                  index % 2 === 0
                                    ? 'table-light'
                                    : 'table-light'
                                }
                              >
                                <td>
                                  <button
                                    className="btn btn-link"
                                    onClick={() =>
                                      handleViewVacateNoticeDetails(notice.id)
                                    }
                                  >
                                    {notice.vacating_date_display ?? 'N/A'}
                                  </button>
                                </td>
                                <td>{notice.tenant?.first_name ?? 'N/A'}</td>
                                <td>{notice.lease?.lease_number ?? 'N/A'}</td>
                                <td>
                                  {notice.property?.property_name ?? 'N/A'}
                                </td>
                                <td>
                                  {notice.lease?.units?.length > 0
                                    ? notice.lease.units[0].unit_name
                                    : 'N/A'}
                                </td>

                                <td>
                                  <ul className="view_edit_delete_list mb0">
                                    <li
                                      className="list-inline-item"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="View Notice"
                                      onClick={() =>
                                        handleViewVacateNoticeDetails(notice.id)
                                      }
                                    >
                                      <span className="flaticon-view"></span>
                                    </li>
                                    {typeof window !== 'undefined' &&
                                      localStorage.getItem('useScope') ===
                                        'am-admin' && (
                                        <li
                                          className="list-inline-item"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="Edit Notice"
                                          onClick={() =>
                                            handleEditNotice(notice.id)
                                          }
                                        >
                                          <span className="flaticon-edit"></span>
                                        </li>
                                      )}
                                  </ul>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      {isModalOpen && (
                        <EditNoticeModal
                          notice={selectedVacateNotice}
                          onCloseModal={handleCloseModal}
                          onSaveChanges={handleSaveChanges}
                        />
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      {renderPagination()} {/* Render the pagination links */}
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

export default VacateTableData;
