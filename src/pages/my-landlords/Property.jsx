import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';
const Property = () => {
  const router = useRouter();
  const { id } = router.query; // Get the 'id' from the query parameter
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const [properties, setProperties] = useState([]);
  const [propertyCount, setPropertyCount] = useState(0);
  const fetchData = async () => {
    console.log('ID', id);
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      // Update the API endpoint to fetch property data based on the 'id' (property ID)
      const response = await axios.get(
        `https://cloudagent.co.ke/backend/api/v1/landlords/${id}/properties?limit=9999999999999999999999999999999999999999999`,
        {
          headers,
        }
      );
      const properties = response.data.data;
      setProperties(properties); // Update properties state with the fetched data
      setPropertyCount(properties.length); //
      console.log('API Response:', response.data.data);
      console.log('Token', tokenFromCookie);
      setProperties(response.data.data);
      console.log('Property data', response.data);
      setTotalPages(Math.ceil(properties.length / pageSize));
    } catch (error) {
      setLoading(false);
      setError('Error fetching data. Please try again later.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset the current page when the filter changes
  };

  const filteredproperties = Array.isArray(properties)
    ? properties.filter((property) => {
        const searchTerm = filter.toLowerCase();
        const { property_code, property_name, location } = property;

        return (
          property_code?.toLowerCase().includes(searchTerm) ||
          property_name?.toLowerCase().includes(searchTerm) ||
          location?.toLowerCase().includes(searchTerm)
        );
      })
    : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewPropertyUnit = (propertyId) => {
    router.push(`/my-properties/${propertyId}`);
  };
  

  const renderPagination = () => {
    console.log('filteredproperties:', filteredproperties);
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
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr className="bg-dark text-danger">
              <th className="text-light">Code</th>
              <th className="text-light">Name</th>
              <th className="text-light">Location</th>
              <th className="text-light">Unit</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {filteredproperties
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((property, index) => (
                <tr
                  key={property.id}
                  className={index % 2 === 0 ? 'table-light' : 'table-light'}
                >
                  <td>
                    {' '}
                    <button
                      className="btn btn-link"
                      onClick={() => handleViewPropertyUnit(property.id)}
                    >
                      {property.property_code || '-'}
                    </button>
                  </td>
                  <td>{property.property_name}</td>
                  <td>{property.location}</td>
                  <td>{property.unit_total || 0}</td>{' '}
                  {/* Display 0 if no unit */}
                  {/* Add more columns as needed */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {renderPagination()}
    </>
  );
};

export default Property;
