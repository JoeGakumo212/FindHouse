import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import Header from '../../../components/common/header/dashboard/Header';
import SidebarMenu from '../../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../../components/common/header/MobileMenu';
import { useRouter } from 'next/router';

const Unit = () => {
  const [property, setProperty] = useState(null);

  const router = useRouter();
  const [data, setData] = useState([]);
  const { id } = router.query;

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;

        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        console.log('ID:', id);

        const response = await fetch(
          `https://cloudagent.co.ke/backend/api/v1/properties/${id}/units?filter=&page=0&limit=0&sortField=&sortDirection=&whereField=&whereValue=`,
          {
            headers: headers,
          }
        );

        if (response.ok) {
          const propertyData = await response.json();

          setProperty(propertyData);
          setData(propertyData.data || []);
        } else {
          throw new Error(
            `Error fetching property details: ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.log('Error fetching property details:', error);
        setProperty(null);
        setData([]);
      }
    };

    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);

  if (!property) {
    return null; // Delay rendering until property data is available
  }

  const handleLinkClick = (link) => {
    router.push(`/PropertyDetails/${id}/${link}`);
  };

  const occupiedUnits = data.filter((unit) => unit.status === 'occupied');
  const vacantUnits = data.filter((unit) => unit.status === 'vacant');

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <div className="container-fluid ovh">
        <div className="row">
         

          <div className="col-9">
            <table className="table">
              <thead>
                <tr>
                  <th>Unit Name</th>
                  <th>Unit Type</th>
                  <th>Unit Mode</th>
                  <th>Bedroom</th>
                  <th>Square Foot</th>
                  <th>Lease</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((unit) => (
                    <tr key={unit.id}>
                      <td>{unit.unit_name}</td>
                      <td>{unit.unit_type?.unit_type_display_name}</td>
                      <td>{unit.unit_mode}</td>
                      <td>{unit.bed_rooms}</td>
                      <td>{unit.square_foot}</td>
                      <td>{unit.lease_numbers}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No Lease Data available</td>
                  </tr>
                )}
              </tbody>
            </table>
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
                  <td>{occupiedUnits.length}</td>
                  <td>{vacantUnits.length}</td>
                </tr>
              </tbody>
            </table>

            <p>Property Name: {property.property_name}</p>
            <p>Location: {property.location}</p>
            <p>Property Code: {property.property_code}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unit;
