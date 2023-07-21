import { useRouter } from 'next/router';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useState,useEffect } from 'react';
const LeaseDetails = () => {
  const router = useRouter();
  const { leaseId } = router.query;
 
  const [leaseDetails, setLeaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLeaseDetails = async () => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(
        `https://cloudagent.co.ke/backend/api/v1/leases/${leaseId}`,
        { headers }
      );

      setLeaseDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching lease details:', error);
    }
  };

  useEffect(() => {
    fetchLeaseDetails();
  }, []);

  if (loading) {
    return <p>Loading lease details...</p>;
  }

  // Render the lease details

  return (
    <div>
      <h2>Lease Details</h2>
      <p>Lease ID: {leaseId}</p>
      {leaseDetails && (
        <div>
          <p>Unit Names: {leaseDetails.unit_names}</p>
          <p>Rent Amount: {leaseDetails.rent_amount}</p>
          <p>Start Date: {leaseDetails.start_date}</p>
          <p>Billed On: {leaseDetails.billed_on}</p>
          {/* Display other lease details */}
        </div>
      )}
    </div>
  );
  
};

export default LeaseDetails;
