// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { parseCookies } from 'nookies';

// const TenantLease = ({ tenantId }) => {
//   const [tenantLeaseData, setTenantLeaseData] = useState(null);

//   useEffect(() => {
//     const fetchTenantLeaseData = async () => {
//       try {
//         const cookies = parseCookies();
//         const tokenFromCookie = cookies.access_token;
//         const headers = {
//           Authorization: `Bearer ${tokenFromCookie}`,
//           'Content-Type': 'application/json',
//         };

//         if (!tenantId) {
//           console.log('No tenant ID found.');
//           return;
//         }

//         // Fetch the tenant lease data using the 'tenantId' parameter
//         const response = await axios.get(
//           `https://cloudagent.co.ke/backend/api/v1/tenants/${tenantId}/leases`,
//           { headers }
//         );

//         setTenantLeaseData(response.data);
      
//       } catch (error) {
//         console.error('API Error:', error);
//       }
//     };

//     fetchTenantLeaseData();
//   }, [tenantId]);

//   if (!tenantLeaseData || tenantLeaseData.data.length === 0) {
//     // Render a message when there are no tenant leases available
//     return <p>No tenant lease information found.</p>;
//   }

//   // Render the tenant lease information in a Bootstrap-styled table
//   return (
//     <div>
//       <h3>Tenant Lease Information</h3>
//       <table className="table table-striped">
//         <thead className="table-dark">
//           <tr>
//             <th>Lease Number</th>
//             <th>Unit</th>
//             <th>Amount</th>
//             <th>Lease Start Date</th>
//             <th>Lease End Date</th>
//             <th>Lease Type</th>
//             <th>Due On</th>
//             <th>Frequency</th>
//             <th>Last Billing</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tenantLeaseData.data.map((lease) => (
//             <tr key={lease.id}>
//               <td>{lease.lease_number}</td>
//               <td>{lease.unit_names}</td>
//               <td>{lease.units[0].rent_amount}</td>
//               <td>{lease.start_date}</td>
//               <td>{lease.end_date}</td>
//               <td>{lease.lease_type.lease_type_display_name}</td>
//               <td>{lease.due_on}</td>
//               <td>{lease.billing_frequency}</td>
//               <td>{lease.start_date}</td>
//               <td>{lease.status.status_text}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TenantLease;
import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';

import { useRouter } from 'next/router'; 
const TenantLease = ({ tenantId }) => {
  const [tenantLeaseData, setTenantLeaseData] = useState(null);
  
  const router = useRouter();
  useEffect(() => {
    const fetchTenantLeaseData = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;
        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        if (!tenantId) {
          console.log('No tenant ID found.');
          return;
        }

        // Fetch the tenant lease data using the 'tenantId' parameter
        const response = await axios.get(
          `https://cloudagent.co.ke/backend/api/v1/tenants/${tenantId}/leases`,
          { headers }
        );

        setTenantLeaseData(response.data);
      
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    fetchTenantLeaseData();
  }, [tenantId]);

  if (!tenantLeaseData || tenantLeaseData.data.length === 0) {
    // Render a message when there are no tenant leases available
    return <p>No tenant lease information found.</p>;
  }

  const handleLeaseClick = (leaseId) => {
    // Step 3: Programmatically navigate to the specific lease page
    router.push(`/LeasesData/${leaseId}`);
  };

 

  // Render the tenant lease information in a Bootstrap-styled table
  return (
    <div>
      <h3>Tenant Lease Information</h3>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Lease Number</th>
            <th>Unit</th>
            <th>Amount</th>
            <th>Lease Start Date</th>
            <th>Lease End Date</th>
            <th>Lease Type</th>
            <th>Due On</th>
            <th>Frequency</th>
            <th>Last Billing</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tenantLeaseData.data.map((lease) => (
            <tr key={lease.id} onClick={() => handleLeaseClick(lease.id)} style={{ cursor: 'pointer' }} >
              <td className='text-info'>{lease.lease_number}</td>
              <td>{lease.unit_names}</td>
              <td>{lease.units[0].rent_amount}</td>
              <td>{lease.start_date}</td>
              <td>{lease.end_date}</td>
              <td>{lease.lease_type.lease_type_display_name}</td>
              <td>{lease.due_on}</td>
              <td>{lease.billing_frequency}</td>
              <td>{lease.start_date}</td>
              <td>{lease.status.status_text}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
};

export default TenantLease;
