import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
const Info = () => {
  const router = useRouter();
  const { leaseId } = router.query;
  const [leaseData, setLeaseData] = useState(null);

  useEffect(() => {
    const fetchLeaseData = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;

        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        if (!leaseId) {
          console.log('No lease ID found.');
          return;
        }

        // Fetch the lease data using the 'leaseId' parameter
        const response = await axios.get(
          `https://cloudagent.co.ke/backend/api/v1/leases/${leaseId}`,
          { headers }
        );

        setLeaseData(response.data);
        console.log('Property', response.data);
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    if (leaseId) {
      fetchLeaseData();
    }
  }, [leaseId]);

  const handleLeaseClick = (leaseId) => {
    // Step 3: Programmatically navigate to the specific lease page
    router.push(`/leases/${leaseId}`);
  };

  if (!leaseData) {
    // Render a loading message while fetching the lease data
    return <p>Loading lease information...</p>;
  }

  // Render the lease details

  return (
    <>
      <div>
        {/* ... */}
        <div className="row">
          <div className="col-lg-6 border-dark mb-3">
            <label>Lease Number:</label>
            <input
              type="text"
              value={leaseData.lease_number}
              readOnly
              className="form-control"
            />
          </div>
          <div className="col-lg-6 border-dark mb-3">
            <label>Property Name(Code):</label>
            <input
              type="text"
              value={leaseData.property.property_name}
              readOnly
              className="form-control"
            />
          </div>
          <div className="col-lg-6 border-dark mb-3">
            <label>Unit:</label>
            <input
              type="text"
              value={leaseData.unit_names}
              readOnly
              className="form-control"
            />
          </div>
          <div className="col-lg-6 border-dark mb-3">
            <label>Lease Type:</label>
            <input
              type="text"
              value={leaseData.lease_type.lease_type_display_name}
              readOnly
              className="form-control"
            />
          </div>
          <div className="col-lg-6 border-dark mb-3">
            <label>Rent Amount:</label>
            <input
              type="text"
              value={leaseData.rent_amount}
              readOnly
              className="form-control"
            />
          </div>
          <div className="col-lg-6 border-dark mb-3">
            <label> Rent Deposit:</label>
            <input
              type="text"
              value={leaseData.rent_deposit}
              readOnly
              className="form-control"
            />
          </div>
          <div className="col-lg-6 border-dark mb-3">
            <label>Start Date:</label>
            <input
              type="text"
              value={leaseData.billed_on}
              readOnly
              className="form-control"
            />
          </div>
          <div className="col-lg-6 border-dark mb-3">
            <label>Due on:</label>
            <input
              type="text"
              value={leaseData.due_on}
              readOnly
              className="form-control"
            />
          </div>

          <div className="col-lg-6 border-dark mb-3">
            <label>Frequency:</label>
            <input
              type="text"
              value={leaseData.billing_frequency}
              readOnly
              className="form-control"
            />
          </div>
          <div className="col-lg-6 border-dark mb-3">
            <label>Last Billing:</label>
            <input
              type="text"
              value={leaseData.start_date}
              readOnly
              className="form-control"
            />
          </div>
          <div className="col-lg-6 border-dark mb-3">
            <label>Status:</label>
            <input
              type="text"
              value={leaseData.status.status_text}
              readOnly
              className="form-control"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
