import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';

const Vacants = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTenants, setSelectedTenants] = useState([]);
  const [selectedTenantDetails, setSelectedTenantDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);

  const [leaseQuery, setLeaseQuery] = useState('');
  const [leaseResults, setLeaseResults] = useState([]);
  const [selectedLease, setSelectedLease] = useState(null);
  const [vacatingDate, setVacatingDate] = useState('');
  const [vacatingReason, setVacatingReason] = useState('');

  const handleVacatingReasonChange = (event) => {
    const reason = event.target.value;
    setVacatingReason(reason);
  };
  const handleVacatingDateChange = (event) => {
    const date = event.target.value;
    setVacatingDate(date);
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      searchTenants(query);
    } else {
      setSearchResults([]);
    }
  };


  const handleLeaseNumberChange = (event) => {
    const number = event.target.value;
    setLeaseQuery(number);

    if (number.length > 0) {
      searchLeases(number);
    } else {
      setLeaseResults([]);
    }
  };

  const handleTenantSelect = async (tenant) => {
    const updatedSelectedTenants = [...selectedTenants, tenant];
    setSelectedTenants(updatedSelectedTenants);
    setSearchQuery(`${tenant.first_name} ${tenant.middle_name}`);
    setSearchResults([]);
    setIsLoading(true);
    const tenantDetails = await fetchTenantDetails(tenant.id); // Fetch tenant details
    setIsLoading(false);
    setSelectedTenantDetails(tenantDetails);
  };

// 
  const handleLeaseSelect = (lease) => {
    setSelectedLease(lease);
    setLeaseQuery('');
    setLeaseResults([]);
  };

  

  const handleCheckboxChange = (tenant) => {
    const isSelected = selectedTenants.includes(tenant);
    let updatedSelectedTenants;

    if (isSelected) {
      updatedSelectedTenants = selectedTenants.filter(
        (selectedTenant) => selectedTenant !== tenant
      );
    } else {
      updatedSelectedTenants = [...selectedTenants, tenant];
    }

    setSelectedTenants(updatedSelectedTenants);
  };

  const searchTenants = async (query) => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const params = {
        $or: [
          { first_name: { $regex: query, $options: 'i' } },
          { middle_name: { $regex: query, $options: 'i' } },
        ],
        page: 0,
        limit: 0,
        sortField: 'updated_at',
        sortDirection: 'desc',
        whereField: '',
        whereValue: '',
      };

      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/tenants',
        {
          params,
          headers,
        }
      );

      if (response.status === 200) {
        const apiData = response.data.data;
        setSearchResults(apiData);
      } else {
        console.error('Response data is not an array:', apiData.data);
      }
    } catch (error) {
      console.error('Error occurred while searching:', error);
    }
  };

  const fetchTenantDetails = async (tenantId) => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(
        `https://cloudagent.co.ke/backend/api/v1/tenants/${tenantId}`,
        {
          headers,
        }
      );

      if (response.status === 200) {
        const tenantDetails = response.data;
        return tenantDetails;
      } else {
        console.error('Failed to fetch tenant details:', response.data);
        return null;
      }
    } catch (error) {
      console.error('Error occurred while fetching tenant details:', error);
      return null;
    }
  };

  const searchLeases = async (query) => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const params = {
        lease_number: { $regex: query, $options: 'i' },
        page: 0,
        limit: 0,
        sortField: 'updated_at',
        sortDirection: 'desc',
        whereField: '',
        whereValue: '',
      };

      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/leases',
        {
          params,
          headers,
        }
      );

      if (response.status === 200) {
        const apiData = response.data.data;
        setLeaseResults(apiData);
      } else {
        console.error('Failed to fetch lease details:', response.data);
        setLeaseResults([]);
      }
    } catch (error) {
      console.error('Error occurred while fetching lease details:', error);
      setLeaseResults([]);
    }
  };

  const fetchLeaseDetails = async (leaseNumber) => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const params = {
        lease_number: leaseNumber,
      };

      const response = await axios.get(
        'https://cloudagent.co.ke/backend/api/v1/leases',
        {
          params,
          headers,
        }
      );

      if (response.status === 200) {
        const leaseData = response.data;
        setSelectedLease(leaseData);
        console.log('Lease details:', leaseData);
      } else {
        console.error('Failed to fetch lease details:', response.data);
        setSelectedLease(null);
      }
    } catch (error) {
      console.error('Error occurred while fetching lease details:', error);
      setSelectedLease(null);
    }
  };

  useEffect(() => {
    if (leaseQuery.length > 0) {
      fetchLeaseDetails(leaseQuery);
    }
  }, [leaseQuery]);

//   handle cancle and save
const handleCancel = () => {
    // Handle cancel logic here
  };

  const handleSave = async () => {
    // Handle save logic here
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;
  
      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };
  
      const data = {
        first_name: selectedTenantDetails ? selectedTenantDetails.first_name : '',
        lease_number: selectedLease ? selectedLease.lease_number : '',
        vacating_date: vacatingDate,
        vacating_reason: vacatingReason
      };
  
      const response = await axios.post(
        'https://cloudagent.co.ke/backend/api/v1/vacation_notices',
        data,
        {
          headers: headers
        }
      );
  
      console.log('Save data:', response.data);
      console.log("DATA",data)
    } catch (error) {
      console.error('Error occurred while saving:', error);
    }
  };
  return (
    <><div className="row">
       <div className="col-lg-12">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <input
            type="text"
            placeholder="Find Tenants Name"
            className="selectpicker form-select"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          {isLoading && <span>Loading...</span>}
        </div>
        {searchResults.length > 0 && (
          <ul className="autocomplete-options">
            {searchResults.map((tenant, index) => (
              <li key={index} onClick={() => handleTenantSelect(tenant)}>
                <input
                  type="checkbox"
                  checked={selectedTenants.includes(tenant)}
                  onChange={() => handleCheckboxChange(tenant)}
                />
                {tenant.first_name} {tenant.middle_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        {selectedTenantDetails ? (
          <div>
            <p className="text-success">
                
              Email: {selectedTenantDetails.email}, ID/Pass:{' '}
              {selectedTenantDetails.id_passport_number}
            </p>
          </div>
        ) : (
          <p>No tenant selected.</p>
        )}
      </div>
      <div className="col-lg-12">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <input
            type="text"
            placeholder="Find Lease Number"
            className="selectpicker form-select"
            value={leaseQuery}
            onChange={handleLeaseNumberChange}
          />
        </div>
        {leaseResults.length > 0 && (
          <ul className="autocomplete-options">
            {leaseResults.map((lease, index) => (
              <li key={index} onClick={() => handleLeaseSelect(lease)}>
                {lease.lease_number}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {selectedLease && (
      
          
          <p className='text-success'>Lease Number:{selectedLease.lease_number}</p>
         
        
      )}
      <div className="col-lg-6">
      <div className="my_profile_setting_input">
        <input
          type="date"
          name="vacating_date"
          value={vacatingDate}
          onChange={handleVacatingDateChange}
          placeholder="vacating_date"
          className="form-control"
        />
      </div>
    </div>
    <div className="col-lg-6">
      <div className="my_profile_setting_input">
        <textarea
          type="text"
          name="vacating_reason"
          value={vacatingReason}
          onChange={handleVacatingReasonChange}
          placeholder="vacating_reason"
          className="form-control"
        />
      </div>
    </div>
    </div>
    <div className="row m-2">
      <div className="col-lg-12">
        <div className="my_profile_setting_input">
          <button
            className="btn btn-primary btn2 btn-success"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary float-end btn2 btn-success"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  
    </>
  );
};

export default Vacants;
