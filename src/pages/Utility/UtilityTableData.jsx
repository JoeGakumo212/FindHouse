import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, ToastContainer } from 'react-nextjs-toast';
import {
  faEllipsisV,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import EditReadingModal from './EditReadingModal';
import DeleteReading from './DeleteReading';
const UtilityTableData = () => {
  const [utilityReadings, setUtilityReadings] = useState([]);
  const [filteredUtilityReadings, setFilteredUtilityReadings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReading, setSelectedReading] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUtility, setSelectedUtility] = useState(null);
  const pageSize = 5;

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
        'https://cloudagent.co.ke/backend/api/v1/readings?filter=&page=0&limit=999999999999999999999999999999999999999&sortField=property_id&sortDirection=desc&whereField=&whereValue=',
        {
          headers: headers,
        }
      );

      setUtilityReadings(response.data.data);
      setTotalPages(Math.ceil(response.data.data.length / pageSize));
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredReadings = utilityReadings.filter(
      (reading) =>
        (reading.current_reading &&
          reading.current_reading
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (reading.reading_date &&
          reading.reading_date.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setTotalPages(Math.ceil(filteredReadings.length / pageSize));
    setCurrentPage(1);
    setFilteredUtilityReadings(filteredReadings); // Update the filtered data in the state
  }, [searchTerm, pageSize, utilityReadings]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddUtility = () => {
    router.push('/Utility/UtilityForm');
  };

  const handleViewReadingDetails = (unitId) => {
    router.push(`/Utility/${unitId}/UnitInfo`);
  };

  const handleEditReading = (reading) => {
    console.log('Edit icon clicked!');
    setSelectedReading(reading);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  };
  const handleSaveReading = async (editedReading) => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };
      console.log('Wavutii evutii');

      // After successful update, fetch the updated data from the API
      const updatedResponse = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/readings?filter=&page=1&limit=5&sortField=property_id&sortDirection=desc&whereField=&whereValue=',
        {
          headers: headers,
        }
      );

      // Update the utilityReadings state with the updated data from the response
      setUtilityReadings(updatedResponse.data.data);

      // Close the modal after saving
      closeModal();
    } catch (error) {
      console.error('Error updating reading:', error);
      // You can handle error states or display an error message here
    }
  };

  // handle delete reading utility
  // Function to handle showing the delete modal
  // Function to handle showing the delete modal
  const handleShowDeleteModal = (utility) => {
    setSelectedUtility(utility);
    setShowDeleteModal(true);
  };

  // Function to handle hiding the delete modal
  const handleCloseDeleteModal = () => {
    setSelectedUtility(null);
    setShowDeleteModal(false);
  };

  const handleDeleteReading = async (reading) => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
      };

      // Replace 'YOUR_DELETE_API_ENDPOINT' with the actual API endpoint to delete the utility
      const response = await axios.delete(
        `https://cloudagent.co.ke/backend/api/v1/readings/${reading.id}`,
        {
          headers: headers,
        }
      );

      // If the deletion is successful, remove the deleted utility from the state

      setUtilityReadings((prevReadings) =>
        prevReadings.filter((item) => item.id !== reading.id)
      );
      toast.notify(`Utility Reading successfully Deleted`);
    } catch (error) {
      console.error('Error deleting reading:', error);
      // You can handle error states or display an error message here
    }
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
      {/* Main Header Nav */}
      <Header />

      {/* Mobile Menu */}
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

      {/* Our Dashboard */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="col-lg-12">
            <div className="my_dashboard_review mb40">
              <div className="favorite_item_list">
                <div className="container">
                  <h2>Utility Management</h2>

                  <div className="border-dark">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="my_profile_setting_input">
                          <button
                            className="btn btn1 float-start"
                            onClick={handleAddUtility}
                          >
                            Add Utility
                          </button>
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <div className="my_profile_setting_input form-group">
                          <input
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            placeholder="Filter Utility by Reading or Date"
                            className="form-control border-dark"
                          />
                        </div>
                      </div>
                    </div>
                    {/* edit modal */}
                    {isModalOpen && (
                      <EditReadingModal
                        selectedReading={selectedReading}
                        reading={selectedReading} // Pass the selectedReading data as 'reading' prop
                        onClose={closeModal}
                        onSaveUpdate={handleSaveReading}
                      />
                    )}
                    {/* delete modal */}
                    {showDeleteModal && (
                      <DeleteReading
                        onClose={() => setShowDeleteModal(false)} // Close the modal when the 'close' button is clicked
                        onConfirmDelete={() => {
                          handleDeleteReading(selectedUtility); // Perform the delete operation when 'Confirm' is clicked
                          setShowDeleteModal(false); // Close the modal after delete operation
                        }}
                      />
                    )}
                    <h1>Utility Table</h1>
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr className="bg-dark text-light">
                            <th>Reading</th>
                            <th>Utility</th>
                            <th>Reading Date</th>
                            <th>Property Name</th>
                            <th>Unit</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUtilityReadings
                            .slice(
                              (currentPage - 1) * pageSize,
                              currentPage * pageSize
                            )
                            .map((reading, index) => (
                              <tr
                                key={reading.id}
                                className={
                                  index % 2 === 0
                                    ? 'table-light'
                                    : 'table-light'
                                }
                              >
                                <td>
                                  {/* Reading Tab */}
                                  <button
                                    className="btn btn-link"
                                    onClick={() =>
                                      handleViewReadingDetails(reading.id)
                                    }
                                  >
                                    {reading.current_reading}
                                  </button>
                                </td>
                                <td>
                                  {reading.utility?.utility_display_name ??
                                    'N/A'}
                                </td>
                                <td>{reading.reading_date}</td>
                                <td>
                                  {reading.property?.property_name ?? 'N/A'}
                                </td>
                                <td>{reading.unit?.unit_name ?? 'N/A'}</td>
                                <td>
                                  {/* Dropdown Icon */}
                                  <FontAwesomeIcon
                                    icon={faEllipsisV}
                                    className="icon mx-1"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="View Unit"
                                    onClick={() =>
                                      handleViewReadingDetails(reading.id)
                                    }
                                    size="1x"
                                  />

                                  {/* Edit Icon */}
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    className="icon mx-1"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Edit Reading"
                                    onClick={() => handleEditReading(reading)}
                                    size="1x"
                                  />

                                  {/* Delete Icon */}
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="icon mx-1 text-danger"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Delete Unit"
                                    onClick={() =>
                                      handleShowDeleteModal(reading)
                                    }
                                    size="1x"
                                  />
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

export default UtilityTableData;
