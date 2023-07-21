import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import { useRouter } from 'next/router';

const TenantsTable = () => {
  const [tenantTypes, setTenantTypes] = useState([]);
  const [filteredTenantTypes, setFilteredTenantTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8; // Update page size to 5
  const router = useRouter();

  const fetchData = async () => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(
      
        `https://cloudagent.co.ke/backend/api/v1/tenants?filter=&page=1&limit=9999&sortField=first_name&sortDirection=desc&whereField=&whereValue=`,
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
    router.push('TenantsDetails');
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }
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
  const handleEditProperty = (property) => {
    router.push(``);
  };
  return (
    <>
      <div className='border-dark'>
        <div className="row">
          <div className="col-lg-4">
            <div className="my_profile_setting_input">
              <button className="btn btn1 float-start" onClick={handleAddTenant}>
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
        <h1>Tenants Table</h1>
        <table className="table table-striped">
          <thead>
            <tr className='bg-dark text-light'>
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
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((tenant, index) => (
                <tr key={tenant.id} className={index % 2 === 0 ? 'table-light' : 'table-light'}>
                  <td>
                    <Link href={`/tenant/${tenant.id}`}>
                      <a>{tenant.first_name}</a>
                    </Link>
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
                      title="Edit"
                    
                        onClick={() => handleEditProperty}
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
    </>
  );
};

export default TenantsTable;
