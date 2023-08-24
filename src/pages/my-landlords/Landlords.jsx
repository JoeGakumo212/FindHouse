import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';


const Landlords = () => {
  const [landlords, setLandlords] = useState([]);
  const [selectedLandlord, setSelectedLandlord] = useState(null);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const pageSize = 5;
  const router = useRouter(); // Initialize useRouter

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      // Update the API endpoint to fetch landlord data
      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/landlords?filter=&page=1&limit=999999999999999999999999999999999999999999999&sortField=updated_at&sortDirection=desc&whereField=&whereValue=',
        {
          headers: {
            Authorization: `Bearer ${tokenFromCookie}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setLandlords(response.data.data);

      setTotalPages(Math.ceil(response.data.meta.total / pageSize));
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset the current page when the filter changes
  };

  const filteredLandlords = landlords.filter((landlord) => {
    const searchTerm = filter.toLowerCase();
    const { first_name, last_name, phone } = landlord;

    return (
      first_name?.toLowerCase().includes(searchTerm) ||
      last_name?.toLowerCase().includes(searchTerm) ||
      phone?.toLowerCase().includes(searchTerm)
    );
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddLandlords = () => {
    router.push('/my-landlords/AddLandLord'); // Navigate to the /createList route
  };

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
          <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>
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
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
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
          <a className="page-link" href="#" onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </a>
        </li>
      );
    }
  
    if (currentPage < totalPages) {
      pages.push(
        <li key="next" className="page-item">
          <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </a>
        </li>
      );
    }
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {pages}
        </ul>
      </nav>
    );
  };
  

  const handleEditLandlord = (landlordId) => {
    // Navigate to the dynamic route with the landlordId
    router.push(`/my-landlords/${landlordId}/EditForm`);
  };
  const handleViewLandlord = (landlordId) => {
    // Find the selected landlord based on the landlordId
    const selected = landlords.find((landlord) => landlord.id === landlordId);
    setSelectedLandlord(selected);
    router.push(`/my-landlords/${landlordId}`);
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
                  <h2>Landlord Management</h2>

                  <div className="row">
                    <div className="col-lg-4">
                      <div className="my_profile_setting_input">
                        <button
                          className="btn btn1 float-start"
                          onClick={handleAddLandlords}
                        >
                          Add Landlord
                        </button>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="my_profile_setting_input form-group">
                        <input
                          type="text"
                          value={filter}
                          onChange={handleFilterChange}
                          placeholder="Filter Landlord by First Name, Last Name or Phone Number"
                          className="form-control border-dark"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Loader */}

                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr className="bg-dark text-danger">
                          <th className="text-light">First Name</th>
                          <th className="text-light">Last Name</th>
                          <th className="text-light">Phone</th>
                          <th className="text-light">Email Address</th>
                          {/* Add more columns as needed */}
                          <th className="text-light">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {isLoading ? (
                          <tr>
                            <td colSpan="5" className="text-center">
                              <div className="d-flex align-items-center">
                                <strong className="text-info">
                                  Loading...
                                </strong>
                                <div
                                  className="spinner-border text-info ms-auto"
                                  role="status"
                                  aria-hidden="true"
                                ></div>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          filteredLandlords
                            .slice(
                              (currentPage - 1) * pageSize,
                              currentPage * pageSize
                            )
                            .map((landlord, index) => (
                              <tr
                                key={landlord.id}
                                className={
                                  index % 2 === 0
                                    ? 'table-light'
                                    : 'table-light'
                                }
                              >
                                <td>
                                  {/* Assuming there is a unique identifier for landlords */}
                                  <Link href={`/my-landlords/${landlord.id}`}>
                                    <a>{landlord.first_name}</a>
                                  </Link>
                                </td>
                                <td>{landlord.last_name || '-'}</td>
                                <td>{landlord.phone}</td>
                                <td>{landlord.email}</td>
                                <td>
                                  <ul className="view_edit_delete_list mb0">
                                    {/* Assuming there is an Edit Landlord page */}
                                    <li
                                      className="list-inline-item"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="View Landlord"
                                      onClick={() =>
                                        handleViewLandlord(landlord.id)
                                      }
                                    >
                                      <span className="flaticon-view"></span>
                                    </li>
                                    <li
                                      className="list-inline-item"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Edit Landlord"
                                      onClick={() =>
                                        handleEditLandlord(landlord.id)
                                      }
                                    >
                                      <span className="flaticon-edit"></span>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            ))
                        )}
                      </tbody>
                    </table>
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

export default Landlords;
