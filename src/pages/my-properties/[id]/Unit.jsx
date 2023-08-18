import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import Header from '../../../components/common/header/dashboard/Header';
import SidebarMenu from '../../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../../components/common/header/MobileMenu';
import { useRouter } from 'next/router';

const Unit = () => {
  const [property, setProperty] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;
  const router = useRouter();
  const [data, setData] = useState([]);
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;

        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        console.log('ID:', id);

        const response = await fetch(
          `https://cloudagent.co.ke/backend/api/v1/properties/${id}/units?filter=&page=${
            currentPage - 1
          }&limit=9999999999999999999999999&sortField=&sortDirection=&whereField=&whereValue=`,
          {
            headers: headers,
          }
        );

        if (response.ok) {
          const propertyData = await response.json();

          setProperty(propertyData);
          setData(propertyData.data || []);
          // Calculate and set the total pages
          const totalCount = propertyData.meta?.pagination?.total;
          const totalPages = Math.ceil(totalCount / pageSize);
          setTotalPages(totalPages);
        } else {
          throw new Error(
            `Error fetching property details: ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.log('Error fetching property details:', error);
        setProperty(null);
        setData([]);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    if (id) {
      fetchPropertyDetails();
    }
  }, [id, currentPage]);

  if (isLoading) {
    return (
      <div class="d-flex align-items-center">
        <strong className="text-primary">Loading...</strong>
        <div
          class="spinner-border text-primary ms-auto"
          role="status"
          aria-hidden="true"
        ></div>
      </div>
    );
  }
  if (!property || data.length === 0) {
    return (
      <div>
        {/* Render a message indicating no property data */}
        No data available for this unit.
      </div>
    );
  }

  const handleLinkClick = (link) => {
    router.push(`/PropertyDetails/${id}/${link}`);
  };

  const occupiedUnits = data.filter((unit) => unit.status === 'occupied');
  const vacantUnits = data.filter((unit) => unit.status === 'vacant');
  // handle pagination

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
          <li>
            <a
              className="page-link"
              href="#"
              onClick={() => handlePageChange(1)}
            >
              1
            </a>
          </li>
          {currentPage > 3 && <li className="page-item disabled"><a className="page-link" href="#">...</a></li>}
          {currentPage > 2 && (
            <li>
              <a
                className="page-link"
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                {currentPage - 1}
              </a>
            </li>
          )}
          {currentPage !== 1 && currentPage !== totalPages && (
            <li className="page-item active">
              <a className="page-link" href="#">
                {currentPage}
              </a>
            </li>
          )}
          {currentPage < totalPages - 1 && (
            <li>
              <a
                className="page-link"
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                {currentPage + 1}
              </a>
            </li>
          )}
          {currentPage < totalPages - 2 && <li className="page-item disabled"><a className="page-link" href="#">...</a></li>}
          <li>
            <a
              className={`page-link ${currentPage === totalPages ? 'disabled' : ''}`}
              href="#"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </a>
          </li>
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
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
      <div className="container-fluid ovh">
        <div className="row">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Unit Name</th>
                    <th>Unit Type</th>
                    <th>Unit Mode</th>
                    <th>Bedroom</th>
                    <th>Square Foot</th>
                    <th>Lease</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data
                      .slice(
                        (currentPage - 1) * pageSize,
                        currentPage * pageSize
                      )
                      .map((unit) => (
                        <tr key={unit.id}>
                          <td>{unit.unit_name}</td>
                          <td>{unit.unit_type?.unit_type_display_name}</td>
                          <td>{unit.unit_mode}</td>
                          <td>{unit.bed_rooms}</td>
                          <td>{unit.square_foot}</td>
                          <td>{unit.lease_numbers}</td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="6">No Lease Data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {renderPagination()}
        </div>
      </div>
    </>
  );
};

export default Unit;
