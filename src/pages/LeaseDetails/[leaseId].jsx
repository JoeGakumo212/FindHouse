import React from 'react';
import { useRouter } from 'next/router';
import LeaseDetails from '../../components/dashboard/Payments';

const LeaseDetailsPage = () => {
  const router = useRouter();
  const { leaseId } = router.query;

  return (
    <div>
      <h1>Lease Details Page</h1>
      <LeaseDetails leaseId={leaseId} />
    </div>
  );
};

export default LeaseDetailsPage;
