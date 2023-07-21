import React from 'react';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';

const Info = () => {
  const [property, setProperty] = useState(null);
  const router = useRouter();
  const { id, link } = router.query;

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;
        console.log('Token:', tokenFromCookie);
        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        console.log('ID:', id);

        const response = await fetch(
          `https://cloudagent.co.ke/backend/api/v1/properties/${id}`,
          {
            headers: headers,
          }
        );

        if (response.ok) {
          const propertyData = await response.json();
          console.log('Property Data:', propertyData);
          setProperty(propertyData);
        } else {
          throw new Error(
            `Error fetching property details: ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.log('Error fetching property details:', error);
        setProperty(null);
      }
    };

    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);

  if (!id || !property) {
    return;
  }
  const { vacant_units } = property;
  const handleLinkClick = (link) => {
    router.push(`/PropertyDetails/${id}/${link}`);
  };

  const handleLinkClicked = (link) => {
    router.push(`/my-properties/${id}/${link}`);
  };
  const occupied_units = property.total_units - vacant_units.length;

  return (
  
    
        

    <div className="container">           
      <div className="row">
        <div className="col-9">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Property ID:</label>
                <input
                  type="text"
                  className="form-control"
                  value={property.id}
                  readOnly
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Property Code:</label>
                <input
                  type="text"
                  className="form-control"
                  value={property.property_code}
                  readOnly
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Property Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={property.property_name}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Location:</label>
                <input
                  type="text"
                  className="form-control"
                  value={property.location}
                  readOnly
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  className="form-control"
                  value={property.address}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <table className="table">
            <thead>
              <tr className="bg-success text-light">
                <th>Total Units</th>
                <th>Occupied Units</th>
                <th>Vacant Units</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{property.total_units}</td>
                <td>{occupied_units}</td>
                <td>{vacant_units.length}</td>
              </tr>
            </tbody>
          </table>

          <p>Property Name: {property.property_name}</p>
          <p>Location: {property.location}</p>
          <p>Property Code: {property.property_code}</p>
        </div>
      </div>
    </div>
  



);
};

export default Info;
