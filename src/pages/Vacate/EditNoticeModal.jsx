import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const EditNoticeModal = ({ notice, onCloseModal, onSaveChanges }) => {
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(notice?.tenant_id || null);
  const [leases, setLeases] = useState([]);
  const [selectedLease, setSelectedLease] = useState(notice?.lease_id || null);
  const [vacatingDate, setVacatingDate] = useState(
    notice?.vacating_date_display || ''
  );
  const [vacateReason, setVacateReason] = useState(notice?.vacate_reason || '');
  const [searchedTenants, setSearchedTenants] = useState([]);
  const [selectedSearchedTenant, setSelectedSearchedTenant] = useState(notice?.tenant || null); // Initialize with notice's tenant data
  const router=useRouter()


  const fetchTenant = async (tenantId) => {
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

  const handleTenantSearch = (searchTerm) => {
    const filteredTenants = tenants.filter(
      (tenant) =>
        tenant.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchedTenants(filteredTenants);
  };

  const handleSearchedTenantSelect = (tenant) => {
    setSelectedSearchedTenant(tenant);
    setSelectedTenant(tenant.id);
    fetchLeasesByTenantId(tenant.id);
    setSearchedTenants([]); // Clear the searched tenants after selecting one
  };

  const handleClearTenantSelection = () => {
    setSelectedSearchedTenant(null);
    setSelectedTenant(null);
    setSearchedTenants([]); // Clear the searched tenants when the selection is cleared
  };

  const handleSaveChanges = async () => {
    try {
      // Perform the update API call here with the updated data
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;
      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

       const updatedNotice = {
      ...notice,
      tenant_id: selectedTenant,
      lease_id: selectedLease,
      vacating_date_display: vacatingDate,
      vacate_reason: vacateReason,
    };

    // Update the local state with the new notice data before sending the request
    setSelectedTenant(updatedNotice.tenant_id);
    setSelectedLease(updatedNotice.lease_id);
    setVacatingDate(updatedNotice.vacating_date_display);
    setVacateReason(updatedNotice.vacate_reason);
      await axios.put(
        `https://cloudagent.co.ke/backend/api/v1/vacation_notices/${notice.id}`,
        updatedNotice,
        {
          headers: headers,
        }
      );
 // Call the parent component's function to update the notice in the list
      onCloseModal();
      onSaveChanges(updatedNotice);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Notice updated successfully!',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('API Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred. Please try again later.',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleCloseModal = () => {
    onCloseModal();
  };
  // handle delete
  const deleteVacationNotice = async (id) => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      await axios.delete(
        `https://cloudagent.co.ke/backend/api/v1/vacation_notices/${notice.id}`,
        {
          headers: headers,
        }
      );
      onCloseModal();
       
      // Display a success alert upon successful deletion
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Vacation notice deleted successfully!',
        confirmButtonText: 'OK',
      });
      fetchVacationNotices();
      // The vacation notice has been successfully deleted
      // You may want to update the UI or take other actions accordingly
    } catch (error) {
      console.error('API Error:', error);

      // Display an error alert if deletion fails
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the vacation notice. Please try again later.',
        confirmButtonText: 'OK',
      });
    }
  };
  // update the vacate notice
  
    // Fetch the updated list of vacation notices
    const fetchVacationNotices = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;
  
        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };
  
        const response = await axios.get(
          'https://cloudagent.co.ke/backend/api/v1/vacation_notices',
          {
            headers: headers,
          }
        );
  
        // Update the UI with the updated list of vacation notices
        // You may want to call the onSaveChanges function or update your state accordingly
        onSaveChanges(response.data);
  
      } catch (error) {
        console.error('API Error:', error);
      }
    };
  return (
    <Modal show={true} onHide={handleCloseModal}>
      <Modal.Header closeButton className="bg-success">
        <Modal.Title className="text-light">Edit Vacate Notice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTenant">
            <Form.Label>Select Tenant</Form.Label>
            <Form.Control
              type="text"
              value={selectedSearchedTenant ? selectedSearchedTenant.first_name : ''}
              placeholder="Search Tenant..."
              onChange={(e) => handleTenantSearch(e.target.value)}
            />
            {searchedTenants.length > 0 && (
              <ul className="searched-tenants-list">
                {searchedTenants.map((tenant) => (
                  <li
                    key={tenant.id}
                    onClick={() => handleSearchedTenantSelect(tenant)}
                  >
                    {tenant.first_name} {tenant.last_name}
                  </li>
                ))}
              </ul>
            )}
            {searchedTenants.length === 0 && !selectedSearchedTenant && (
              <div className="no-tenant-found">Tenant not found</div>
            )}
            {selectedSearchedTenant && (
              <Button variant="link" onClick={handleClearTenantSelection}>
                Clear Selection
              </Button>
            )}
          </Form.Group>

          <Form.Group controlId="formLease">
            <Form.Label>Select Lease</Form.Label>
            <Form.Control
              as="select"
              value={selectedLease || ''}
              onChange={(e) => setSelectedLease(e.target.value)}
            >
              <option value="">Select Lease</option>
              {leases.map((lease) => (
                <option key={lease.id} value={lease.id}>
                  {lease.lease_number}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formVacatingDate">
            <Form.Label>Vacating Date</Form.Label>
            <Form.Control
              type="date"
              value={vacatingDate}
              onChange={(e) => setVacatingDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formVacateReason">
            <Form.Label>Vacate Reason</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={vacateReason}
              onChange={(e) => setVacateReason(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        {typeof window !== 'undefined' && localStorage.getItem('useScope') === 'am-admin' && (
        <Button variant="danger" onClick={deleteVacationNotice}>
          Delete
        </Button>
        )}
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditNoticeModal;
