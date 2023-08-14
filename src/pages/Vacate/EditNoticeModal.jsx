import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { parseCookies } from 'nookies';

const EditNoticeModal = ({ notice, onCloseModal, onSaveChanges }) => {
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(notice.tenant_id || null);
  const [leases, setLeases] = useState([]);
  const [selectedLease, setSelectedLease] = useState(notice.lease_id || null);
  const [vacatingDate, setVacatingDate] = useState(
    notice.vacating_date_display || ''
  );
  const [vacateReason, setVacateReason] = useState(notice.vacate_reason || '');
  const [searchedTenants, setSearchedTenants] = useState([]);
  const [selectedSearchedTenant, setSelectedSearchedTenant] = useState(null);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;
      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/tenants/leases?filter=&page=0&limit=0&sortField=&sortDirection=&whereField=&whereValue=',
        {
          headers: headers,
        }
      );

      setTenants(response.data.data);
    } catch (error) {
      console.error('API Error:', error);
    }
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

      await axios.put(
        `https://cloudagent.co.ke/backend/api/v1/vacation_notices/${notice.id}`,
        updatedNotice,
        {
          headers: headers,
        }
      );

      onSaveChanges(updatedNotice); // Call the parent component's function to update the notice in the list
      onCloseModal();
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const handleCloseModal = () => {
    onCloseModal();
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
        {localStorage.getItem('useScope') === 'am-admin' && (
        <Button variant="danger" onClick={handleSaveChanges}>
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
