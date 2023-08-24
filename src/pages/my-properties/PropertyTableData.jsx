import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import Link from 'next/link';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';

const PropertyTableData = () => {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const router = useRouter(); // Initialize useRouter
  const [activeTab, setActiveTab] = useState('Info');
  const [isLoading, setIsLoading] = useState(true);

  // decoding jwt from token
 
  const fetchData = async () => {
    try {
      setIsLoading(true);
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
    

      if (useScope === 'am-admin') {
        url =
          'https://cloudagent.co.ke/backend/api/v1/properties?filter=&page=&limit=999999999999999999999999999999999&sortField=updated_at&sortDirection=desc&whereField=&whereValue=';
      } else if (useScope === 'am-landlord') {
        url = `https://cloudagent.co.ke/backend/api/v1/landlords/${landlordId}/properties?filter=&page=0&limit=999999999999999999999999999999999999999999999&sortField=&sortDirection=&whereField=&whereValue=`;
      }
    }
      if (url) {
        const response = await axios.get(url, {
          headers: headers,
        });

        setProperties(response.data.data);
        setTotalPages(Math.ceil(response.data.meta.total / pageSize));
      }
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

  const filteredProperties = properties.filter((property) => {
    const searchTerm = filter.toLowerCase();
    const { property_code, property_name, location } = property;

    return (
      property_code.toLowerCase().includes(searchTerm) ||
      property_name.toLowerCase().includes(searchTerm) ||
      location.toLowerCase().includes(searchTerm)
    );
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddProperty = () => {
    router.push('/my-properties/CreateListing'); // Navigate to the /createList route
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

  const handleEditUnit = (propertyId) => {
    // Navigate to the dynamic route with the propertyId
    router.push(`/my-properties/${propertyId}`);
  };

  const handlePropertyClick = (propertyId, event) => {
    event.preventDefault(); // Prevent default anchor tag navigation behavior
    router.push(`/my-properties/${propertyId}`);
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
                  <h2>Property Management</h2>

                  <div className="row">
                  {typeof window !== 'undefined' && localStorage.getItem('useScope')  === 'am-admin' && (
                      <div className="col-lg-4">
                        <div className="my_profile_setting_input">
                          <button
                            className="btn btn1 float-start"
                            onClick={handleAddProperty}
                          >
                            Add Property
                          </button>
                        </div>
                      </div>
                    )}
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
                          <th className="text-light">Property Code</th>
                          <th className="text-light">Property Name</th>
                          <th className="text-light">Location</th>
                          <th className="text-light">Unit</th>
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
                                  className="spinner-grow spinner-grow text-info"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                                <div
                                  className="spinner-border text-info ms-auto"
                                  role="status"
                                  aria-hidden="true"
                                ></div>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          filteredProperties
                            .slice(
                              (currentPage - 1) * pageSize,
                              currentPage * pageSize
                            )
                            .map((property, index) => (
                              <tr
                                key={property.id}
                                className={
                                  index % 2 === 0
                                    ? 'table-light'
                                    : 'table-light'
                                }
                              >
                                <td>
                                  <button
                                    className="btn btn-link"
                                    onClick={(event) =>
                                      handlePropertyClick(property.id, event)
                                    }
                                  >
                                    {property.property_code}
                                  </button>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-link"
                                    onClick={(event) =>
                                      handlePropertyClick(property.id, event)
                                    }
                                  >
                                    {property.property_name}
                                  </button>
                                </td>
                                <td>{property.location}</td>
                                <td>{property.unit_total}</td>
                                <td>
                                  <ul className="view_edit_delete_list mb0">
                                    <li
                                      className="list-inline-item"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="View Property"
                                      onClick={() =>
                                        handleEditUnit(property.id)
                                      }
                                    >
                                      <span className="flaticon-view"></span>
                                    </li>
                                    {typeof window !== 'undefined' && localStorage.getItem('useScope') ===
                                      'am-admin' && (
                                      <li
                                        className="list-inline-item"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Edit Unit"
                                        onClick={() =>
                                          handleEditUnit(property.id)
                                        }
                                      >
                                        <span className="flaticon-edit"></span>
                                      </li>
                                    )}
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

export default PropertyTableData;
