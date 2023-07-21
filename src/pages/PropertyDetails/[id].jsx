import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { parseCookies } from 'nookies';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';
const MyComponent = () => {
  const [property, setProperty] = useState(null);
  const router = useRouter();
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

        const response = await axios.get(
          `https://cloudagent.co.ke/backend/api/v1/properties/${id}`,
          { headers }
        );
        const propertyData = response.data;
        setProperty(propertyData);
      } catch (error) {
        console.log('Error fetching property details:', error);
        setProperty(null);
      }
    };

    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  const handleLinkClick = (link) => {
    router.push(`/PropertyDetails/${id}/${link}`);
  };
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
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="container">
            <div className="row">
              <div className="col">
                <nav className="row">
                  <div className="col">
                    <ul className="nav">
                      <li className="nav-item col-2">
                        <Link href={`/my-properties/${id}/Info`}>
                          <a
                            className="nav-link"
                            onClick={() => handleLinkClick('Info')}
                          >
                            Info  
                          </a>
                        </Link>
                      </li>
                      <li className="nav-item col-2">
                        <Link href={`/property/${id}/unit`}>
                          <a className="nav-link">Unit</a>
                        </Link>
                      </li>
                      <li className="nav-item col-2">
                        <Link href={`/property/${id}/lease`}>
                          <a className="nav-link">Lease</a>
                        </Link>
                      </li>
                      <li className="nav-item col-2">
                        <Link href={`/property/${id}/invoices`}>
                          <a className="nav-link">Invoices</a>
                        </Link>
                      </li>
                      <li className="nav-item col-2">
                        <Link href={`/property/${id}/vacate-notice`}>
                          <a className="nav-link">Vacate Notice</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>

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
                  <label>Address:</label> Fuck that Ass
                  <input
                    type="text"
                    className="form-control"
                    value={property.address}
                    readOnly
                  />
                </div>
              </div>
              {/* Add more property details input fields as needed */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default dynamic(() => Promise.resolve(MyComponent), { ssr: false });
