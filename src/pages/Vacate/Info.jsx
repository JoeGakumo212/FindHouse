// Info.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const Info = ({ vacateNotices, id }) => {
  const [vacateNotice, setVacateNotice] = useState(null);

  useEffect(() => {
    // Find the notice with matching id from vacateNotices array
    const selectedNotice = vacateNotices.find((notice) => notice.id === id);
    setVacateNotice(selectedNotice);
  }, [vacateNotices, id]);

  if (!vacateNotice) {
    return <div>Loading...</div>; // You can show a loading state while waiting for the data to be filtered
  }

  return (
    <div className='row'>
      <div className="col-lg-4">
      <p>Vacating Date: <strong>{vacateNotice.vacating_date_display ?? 'N/A'}</strong></p>
      <p>Lease Number: <strong>{vacateNotice.lease?.lease_number ?? 'N/A'}</strong></p>
      <p>Vacating Reason: <strong>{vacateNotice.vacating_reason ?? 'N/A'}</strong></p>
      </div>
     <div className="col-lg-4">
     <p>Property: <strong>{vacateNotice.property?.property_name ?? 'N/A'}</strong></p>
     </div>
     <div className="col-lg-4">

     <p>Unit: <strong >{vacateNotice.lease?.units?.length > 0
                                    ? vacateNotice.lease.units[0].unit_name
                                    : 'N/A'}</strong></p>
     </div>
    
     
    </div>
  );
};

export default Info;
