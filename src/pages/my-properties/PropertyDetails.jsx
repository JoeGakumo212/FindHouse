import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { parseCookies } from 'nookies';

const PropertyDetails = () => {
  const router = useRouter();
  const { propertyId } = router.query; // Get the property ID from the URL query params
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;

        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.get(
          `https://cloudagent.co.ke/backend/api/v1/properties/${propertyId}`,
          {
            headers,
          }
        );

        setProperty(response.data);
      } catch (error) {
        console.log('Error fetching property details:', error);
      }
    };

    if (propertyId) {
      fetchPropertyDetails();
    }
  }, [propertyId]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Property Details</h2>
      <p>Property Code: {property.property_code}</p>
      <p>Property Name: {property.property_name}</p>
    
      {/* Display other property details */}
    </div>
  );
};

export default PropertyDetails;
