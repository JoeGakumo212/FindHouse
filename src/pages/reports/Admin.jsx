import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';


const AdminSummaryComponent = () => {
  const [adminSummary, setAdminSummary] = useState({});
  const [periodicalBilling, setPeriodicalBilling] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;
        console.log("token period", tokenFromCookie);

        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.get(
          'https://cloudagent.co.ke/backend/api/v1/admin_summaries?filter=&page=1&limit=1&sortField=&sortDirection=&whereField=&whereValue=',
          { headers }
        );

        console.log("API Response:", response.data); // Log the API response

        setAdminSummary(response.data);
        setPeriodicalBilling(response.data.periodical_billing);
        console.log("setAdminsummary", setAdminSummary);
        console.log("setPeriodicalBilling", setPeriodicalBilling);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Check if adminSummary is empty
  if (Object.keys(adminSummary).length === 0) {
    return <div>Loading...</div>;
  }
  

  return (
    <div>
      <h1>Admin Summary</h1>
      <p>Pending Amount: {adminSummary.pending_amount}</p>
      <p>Total Leases: {adminSummary.total_leases}</p>
      <p>Total Properties: {adminSummary.total_properties}</p>
      <p>Total Tenants: {adminSummary.total_tenants}</p>
      <p>Total Units: {adminSummary.total_units}</p>

      <h1>Periodical Billing</h1>
      <ul>
        {periodicalBilling.map((billingItem, index) => (
          <li key={index}>
            <p>Billing ID: {billingItem.period_name}</p>
            {/* Add other properties from the billing item as needed */}
          </li>
        ))}
      </ul>
   
    </div>
  );
};

export default AdminSummaryComponent;
