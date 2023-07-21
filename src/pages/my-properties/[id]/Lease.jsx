import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import Header from '../../../components/common/header/dashboard/Header';
import SidebarMenu from '../../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../../components/common/header/MobileMenu';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Lease = () => {
  const [property, setProperty] = useState(null);
  const [leases, setLeases] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLeases = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;
        console.log('Token lease:', tokenFromCookie);
        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        const response = await fetch(
          `https://cloudagent.co.ke/backend/api/v1/properties/${id}/leases?filter=&page=0&limit=0&sortField=&sortDirection=&whereField=&whereValue=`,
          {
            headers: headers,
          }
        );

        if (response.ok) {
          const leasesData = await response.json();
          console.log('Leases Data:', leasesData); // Log the fetched data to the console
          setLeases(leasesData);
          setProperty(leasesData.property || null);
          setData(leasesData.data || []);
        } else {
          throw new Error(
            `Error fetching leases: ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.log('Error fetching leases:', error);
        setLeases([]);
        setData([]);
        setProperty(null);
      }
    };

    if (id) {
      fetchLeases();
    }
  }, [id]);

  const handleLinkClick = (link) => {
    router.push(`/PropertyDetails/${id}/${link}`);
  };

  if (!property && (leases.length === 0 || data.length === 0)) {
    return (
      <>
        {/* Main Header Nav */}
        <Header />

        {/* Mobile Menu */}
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

        {/* Our Dashboard */}

        <div className="container-fluid ovh">
          <table className="table">
            <thead>
              <tr>
                <th>Number</th>
                <th>Unit</th>
                <th>Amount</th>
                <th>Lease Type</th>
                <th>Due On</th>
                <th>Last Billing</th>
                <th>Tenant</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="8">No Lease Data available</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Main Header Nav */}
      <Header />

      {/* Mobile Menu */}
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

      {/* Our Dashboard */}

      <div className="container-fluid ovh">
        <table className="table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Unit</th>
              <th>Amount</th>
              <th>Lease Type</th>
              <th>Due On</th>
              <th>Last Billing</th>
              <th>Tenant</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((lease) => (
                <tr key={lease.id}>
                  <td>
                    <Link href={`/LeasesData/`}>
                      <a className="nav-link text-success">
                        {lease.lease_number}
                      </a>
                    </Link>
                  </td>
                  <td>{lease.unit_name}</td>
                  <td>{lease.rent_amount}</td>
                  <td>{lease.lease_type?.lease_type_display_name}</td>
                  <td>{lease.due_on}</td>
                  <td>{lease.billed_on}</td>
                  <td>
                    {lease.tenants[0]?.first_name} {lease.tenants[0]?.last_name}
                  </td>
                  <td>{lease.status?.status_text}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No Lease Data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Lease;
