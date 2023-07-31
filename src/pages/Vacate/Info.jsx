import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';

const Info = ({ id }) => {
  const [vacateNotice, setVacateNotice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;
        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.get(
          `https://cloudagent.co.ke/backend/api/v1/vacation_notices/${id}`,
          {
            headers: headers,
          }
        );

        if (response.status === 200) {
          setVacateNotice(response.data.data);
        } else {
          throw new Error(
            `Error fetching vacate notice details: ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!vacateNotice) {
    return <div>Loading...</div>; // You can show a loading state while waiting for the data to be fetched
  }

  return (
    <div>
      <h2>Vacate Notice Details</h2>
      <p>Lease Number: {vacateNotice.lease?.lease_number ?? 'N/A'}</p>
    </div>
  );
};

export default Info;
