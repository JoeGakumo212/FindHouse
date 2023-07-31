import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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

const MyComponent = ({ tenantData }) => {
  const router = useRouter();
  const { id } = router.query;
  // Destructure the tenant data

  const [activeTab, setActiveTab] = useState('info'); // Default active tab is 'info'

  // Handle tab change
  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
    router.push(`/tenants/${id}?${newTab}`); // Update the URL with the selected tab
  };

  // Update active tab when clicking on a tab
  useEffect(() => {
    const currentTab = router.query.tab;
    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, [router.query.tab]);

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
                    <p>First Name:</p>
                    <p>Middle Name:</p>
                    <p>Last Name</p>
                    <p>Phone Number</p>
                    <p>Email</p>
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
