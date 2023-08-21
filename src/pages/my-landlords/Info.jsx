import React from 'react';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';

const Info = ({ id }) => {
  const [landlord, setLandlord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch landlord details
    const fetchLandlordDetails = async () => {
      try {
        setIsLoading(true);
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;
        console.log('oken', tokenFromCookie);
        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        // Update the API endpoint to fetch landlord data by ID
        const response = await axios.get(
          `https://cloudagent.co.ke/backend/api/v1/landlords/${id}`,
          {
            headers,
          }
        );

        setLandlord(response.data); // Set the landlord data in the component state
        console.log('Data returned', response.data);
      } catch (error) {
        console.log('Error fetching landlord details:', error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    if (id) {
      fetchLandlordDetails(); // Fetch landlord details when the component mounts and id is available
    }
  }, [id]);

  if (!landlord) {
    return <div className="d-flex align-items-center">
    <strong className="text-info">
      Loading...
    </strong>
    <div
      className="spinner-border text-info ms-auto"
      role="status"
      aria-hidden="true"
    ></div>
  </div>;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={landlord.first_name}
                  readOnly
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Middle Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={landlord.middle_name}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={landlord.last_name}
                  readOnly
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  value={landlord.phone}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={landlord.email}
                  readOnly
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Reistration Date</label>
                <input
                  type="text"
                  className="form-control"
                  value={landlord.registration_date_display}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  className="form-control"
                  value={landlord.state}
                  readOnly
                />
              </div>
            </div>{' '}
            <div className="col">
              <div className="form-group">
                <label>National ID/Passport Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={landlord.id_number}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="row">
            {' '}
            <div className="col">
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  className="form-control"
                  value={landlord.country}
                  readOnly
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  value={landlord.city}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Postal Adress</label>
                <input
                  type="text"
                  className="form-control"
                  value={landlord.poastal_address}
                  readOnly
                />
              </div>
            </div>{' '}
            <div className="col">
              <div className="form-group">
                <label>Physical Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={landlord.physical_address}
                  readOnly
                />
              </div>
            </div>{' '}
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Residential Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={landlord.middle_name}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
