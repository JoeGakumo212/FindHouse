import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';

const TenantInfo = ({ tenantId }) => {
  const [tenantInfo, setTenantInfo] = useState(null);

  useEffect(() => {
    const fetchTenantInfo = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;

        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        if (!tenantId) {
          return;
        }

        // Fetch the tenant details using the 'id' parameter
        const response = await axios.get(
          `https://cloudagent.co.ke/backend/api/v1/tenants/${tenantId}`,
          { headers }
        );

        setTenantInfo(response.data);
        console.log('Data', tenantInfo);
       
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    fetchTenantInfo();
  }, [tenantId]);

  if (!tenantInfo) {
    // Render a loading message or return null while fetching the data
    return <p>Loading tenant information...</p>;
  }

  // Select the properties you want to display
  const propertiesToDisplay = [
    { key: 'first_name', label: 'First Name' },
    { key: 'middle_name', label: 'Middle Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'gender', label: 'Gender' },
    { key: 'phone', label: 'Phone' },
    { key: 'physical_address', label: 'Address' },
    { key: 'date_of_birth', label: 'Date Of Birth' },
    { key: 'id_passport_number', label: 'National ID/Passport Number' },
    { key: 'marital_status', label: 'Marital Status' },
    { key: 'nationality', label: 'Nationality' },
    { key: 'email', label: 'Email' },
    { key: 'country', label: 'County' },
    { key: 'city', label: 'City' },
    { key: 'postal_code', label: 'Postal Code' },
    { key: 'postal_address', label: 'Postal Address' },
  ];

  // If tenantInfo is available, render the selected tenant information in input fields
  return (
    <div>
      <h2>Tenant Information</h2>
      <div className="row">
        {propertiesToDisplay.map((property) => (
          <div className="col-lg-4 col-md-6" key={property.key}>
            <div className="mb-3">
              <label htmlFor={property.key} className="form-label fw-bold">
                {property.label}
              </label>
              <input
                type="text"
                id={property.key}
                name={property.key}
                value={tenantInfo[property.key] || ''}
                className="form-control border-dark"
                readOnly
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantInfo;
