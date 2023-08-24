import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Table from 'react-bootstrap/Table';

const VacantUnitsTable = () => {
  const [vacantUnits, setVacantUnits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;

        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.get(
          'https://cloudagent.co.ke/backend/api/v1/units/vacants?filter=&page=0&limit=9999999&sortField=id&sortDirection=desc&whereField=&whereValue=',
          { headers }
        );

        setVacantUnits(response.data.data);
        setTotalPages(Math.ceil(response.data.data.length / pageSize));
        console.log('Vacant data', response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    if (!showAll) {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <li
            key={i}
            className={`page-item ${currentPage === i ? 'active' : ''}`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => handlePageChange(i)}
            >
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
    }
  };

  return (
    <div>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr className="bg-dark text-danger">
              <th className="text-light">Mode</th>
              <th className="text-light">Type</th>
              <th className="text-light">Unit</th>
              <th className="text-light">Property</th>
              <th className="text-light">Location</th>
            </tr>
          </thead>
          <tbody>
            {showAll
              ? vacantUnits &&
                vacantUnits.map((unit) => (
                  <tr key={unit.id}>
                    <td>{unit.unit_mode}</td>
                    <td>{unit.unit_type?.unit_type_display_name}</td>
                    <td>{unit.unit_name}</td>
                    <td>{unit.property?.property_name}</td>
                    <td>{unit.property?.property_code}</td>
                  </tr>
                ))
              : vacantUnits &&
                vacantUnits
                  .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                  .map((unit) => (
                    <tr key={unit.id}>
                      <td>{unit.unit_mode}</td>
                      <td>{unit.unit_type?.unit_type_display_name}</td>
                      <td>{unit.unit_name}</td>
                      <td>{unit.property?.property_name}</td>
                      <td>{unit.property?.property_code}</td>
                    </tr>
                  ))}
          </tbody>
        </Table>
      </div>
      <button
        onClick={() => setShowAll(!showAll)}
        className="btn btn-success form-control"
      >
        {showAll ? 'Show Paginated Data' : 'Show All Vacant Units'}
      </button>
      {showAll ? null : renderPagination()}
    </div>
  );
};

export default VacantUnitsTable;
