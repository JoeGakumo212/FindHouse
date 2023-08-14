import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import axios from 'axios';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';
import Box from '@mui/system/Box';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import TenantInfo from './[id]/TenantInfo';
import TenantLease from './[id]/TenantLease';
import TenantPayments from './[id]/TenantPayments';
import TenantsTableData from './TenantsTableData';

const MyComponent = ({ tenantData }) => {
  const router = useRouter();
  const { id } = router.query;
  // Destructure the tenant data

  const [activeTab, setActiveTab] = useState('info'); // Default active tab is 'info'
  // State variables to store tenant data and loading status
  const [tenant, setTenant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch tenant data
  const fetchTenantData = async (tenantId) => {
    try {
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(
        `https://cloudagent.co.ke/backend/api/v1/tenants/${tenantId}`,
        { headers }
      );

      setTenant(response.data); // Set the tenant data
      console.log("Tenant",response.data);
      setIsLoading(false); // Set loading to false
    } catch (error) {
      console.error('API Error:', error);
      setIsLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    // Fetch tenant data when component mounts
    fetchTenantData(id);
  }, [id]);

  // ... (rest of the component)

  // Check if tenant data is still loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if tenant data is available
  if (!tenant) {
    return <div>Tenant not found</div>;
  }

  // Handle tab change
  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
    router.push(`/tenants/${id}?${newTab}`); // Update the URL with the selected tab
  };

  // Update active tab when clicking on a tab
  // useEffect(() => {
  //   const currentTab = router.query.tab;
  //   if (currentTab) {
  //     setActiveTab(currentTab);
  //   }
  // }, [router.query.tab]);

  const handleEditTenant = (tenantId) => {
    console.log('Clicked here for tenant ID:', tenantId);
    router.push(`/tenants/${tenantId}/EditTenant`);
  };
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
      <section className="our-dashbord dashbord bgc-f7 pb-5">
        <div className="container-fluid ovh">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-9">
                <div className="my_dashboard_review mb40">
                  <div className="favorite_item_list">
                    <div className="container">
                      <div className="bg-success rounded-top text-light p-2 d-flex align-items-center justify-content-between">
                        <h1 className="text-light">Tenant Details </h1>
                        <ul className="view_edit_delete_list mb-0">
                          <li
                            className="list-inline-item"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit Tenant"
                            onClick={() => handleEditTenant(id)}
                          >
                            <span className="flaticon-edit text-dark"></span>
                          </li>
                        </ul>
                      </div>

                      {/* Tab Navigation */}
                      <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={activeTab}>
                          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList
                              onChange={handleTabChange}
                              aria-label="Tenant details tabs"
                            >
                              <Tab label="Info" value="info" />
                              <Tab label="Lease" value="lease" />
                              <Tab label="Payments" value="payments" />
                            </TabList>
                          </Box>

                          {/* Tab Panels */}
                          <TabPanel value="info">
                            <TenantInfo tenantId={id} />
                          </TabPanel>
                          <TabPanel value="lease">
                            <TenantLease tenantId={id} />
                          </TabPanel>
                          <TabPanel value="payments">
                            <TenantPayments tenantId={id} />
                          </TabPanel>
                        </TabContext>
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="my_dashboard_review mb40">
                  <div className="favorite_item_list">
                    <div className="bg-success rounded-top text-light p-2 d-flex align-items-center justify-content-between">
                      <h1 className="text-light">Summary </h1>
                    </div>
                    <p>First Name: {tenant.first_name}</p>
                    <p>Middle Name: {tenant.middle_name}</p>
                    <p>Last Name: {tenant.last_name}</p>
                    <p>Phone Number: {tenant.phone}</p>
                    <p>Email :{tenant.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="row mt50">
        <div className="col-lg-12">
          <div className="copyright-widget text-center">
            <p>© 2020 Find House. Made with love.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyComponent;
