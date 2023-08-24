import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';

const TenantsTableData = () => {
  const [tenantTypes, setTenantTypes] = useState([]);
  const [filteredTenantTypes, setFilteredTenantTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5; // Update page size to 5
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('1'); // Default to the first tab
  const [selectedTenant, setSelectedTenant] = useState(null);

  const handleViewTenantDetails = (tenantId) => {
    router.push(`/tenants/${tenantId}`);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const fetchData = async () => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(
        `https://cloudagent.co.ke/backend/api/v1/tenants?filter=&page=1&limit=9999999999999999999999999999999999999&sortField=first_name&sortDirection=desc&whereField=&whereValue=`,
        {
          headers: headers,
        }
      );

      setTenantTypes(response.data.data);
      setFilteredTenantTypes(response.data.data);
      setTotalPages(Math.ceil(response.data.data.length / pageSize));
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredTenants = tenantTypes.filter(
      (tenant) =>
        (tenant.first_name &&
          tenant.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (tenant.last_name &&
          tenant.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (tenant.email &&
          tenant.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (tenant.phone &&
          tenant.phone.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredTenantTypes(filteredTenants);
    setTotalPages(Math.ceil(filteredTenants.length / pageSize));
    setCurrentPage(1);
  }, [tenantTypes, searchTerm, pageSize]);

  const handleFilterSearch = () => {
    const filteredTenants = tenantTypes.filter(
      (tenant) =>
        (tenant.first_name &&
          tenant.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (tenant.last_name &&
          tenant.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (tenant.email &&
          tenant.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (tenant.phone &&
          tenant.phone.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredTenantTypes(filteredTenants);
    setTotalPages(Math.ceil(filteredTenants.length / pageSize));
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddTenant = () => {
    router.push('/tenants/TenantsDetails');
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
// end
  const handleEditTenant = (tenantId) => {
    console.log('Clicked here for tenant ID:', tenantId);
    router.push(`/tenants/${tenantId}/EditTenant`);
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
                {typeof window !== 'undefined' && localStorage.getItem('useScope') === 'am-admin' && (
                  <h2>Tenants Management</h2>
                )}
                 
                  <div className="border-dark">
                  {typeof window !== 'undefined' && localStorage.getItem('useScope') === 'am-admin' && (
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="my_profile_setting_input">
                          <button
                            className="btn btn1 float-start"
                            onClick={handleAddTenant}
                          >
                            Add Tenant
                          </button>
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <div className="my_profile_setting_input form-group">
                          <input
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            placeholder="Filter Tenant by Name"
                            className="form-control border-dark"
                          />
                        </div>
                      </div>
                    </div>
                     )}
                     {typeof window !== 'undefined' && localStorage.getItem('useScope')  === 'am-admin' && (
                    <h1>Tenants Table</h1>
                      )}
                    <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr className="bg-dark text-light">
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Gender</th>
                          <th>Phone</th>
                          <th>Address</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTenantTypes
                          .slice(
                            (currentPage - 1) * pageSize,
                            currentPage * pageSize
                          )
                          .map((tenant, index) => (
                            <tr
                              key={tenant.id}
                              className={
                                index % 2 === 0 ? 'table-light' : 'table-light'
                              }
                            >
                              <td>
                                {/* <Link href={`/tenant/${tenant.id}`}>
                      <a>{tenant.first_name}</a>
                    </Link> */}

                                <button
                                   className="btn btn-link"
                                  onClick={() =>
                                    handleViewTenantDetails(tenant.id)
                                  }
                                >
                                  {tenant.first_name}
                                </button>
                              </td>
                              <td>{tenant.last_name}</td>
                              <td>{tenant.gender}</td>
                              <td>{tenant.phone}</td>
                              <td>{tenant.physical_address}</td>
                              <td>
                                <ul className="view_edit_delete_list mb0">
                                  <li
                                    className="list-inline-item"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Edit Tenant"
                                    onClick={() => handleEditTenant(tenant.id)}
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

export default TenantsTableData;
