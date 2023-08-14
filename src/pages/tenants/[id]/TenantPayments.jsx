
import React, { useState, useEffect } from 'react';
import { parseCookies } from 'nookies';

const TenantPayments = ({ tenantId }) => {
  const [paymentsData, setPaymentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the payment data based on the tenantId
    const fetchPaymentsData = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;
        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        if (!tenantId) {
          console.log('No tenant ID found.');
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          `https://cloudagent.co.ke/backend/api/v1/tenants/${tenantId}/payments`,
          { headers }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch payment data');
        }

        const data = await response.json();
        setPaymentsData(data.data);
        setIsLoading(false);
        console.log('Payments Data:', data.data);
      } catch (error) {
        console.error('Error fetching payment data:', error);
        setPaymentsData([]);
        setIsLoading(false);
      }
    };

    fetchPaymentsData();
  }, [tenantId]);

  if (isLoading) {
    return <p>Loading payment information...</p>;
  }

  if (paymentsData.length === 0) {
    return <p>No payment information available for this tenant.</p>;
  }

  return (
    <div>
      <h3>Tenant Payments Information</h3>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>Lease</th>
            <th>Property</th>
            <th>Receipt No</th>
            <th>Status</th>
            {/* Add more payment data columns as needed */}
          </tr>
        </thead>
        <tbody>
          {paymentsData.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.amount}</td>
              <td>{payment.payment_date}</td>
              <td>{payment.lease_number}</td>
              <td>{payment.property?.property_name || 'N/A'}</td>
              {/* <td>{payment.property.property_name}</td> */}
              <td>{payment.receipt_number}</td>
              <td>{payment.status.status_text}</td>
              {/* Add more payment data cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenantPayments;
