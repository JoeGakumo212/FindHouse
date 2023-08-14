import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';
import Box from '@mui/system/Box';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Info from './Info';
import Invoice from './Invoice';
import { Modal, Button } from 'react-bootstrap';
const LeasesDataPage = () => {
  const router = useRouter();
  const { leaseId } = router.query;
  const [leaseData, setLeaseData] = useState(null);
  const [selectedTab, setSelectedTab] = useState('info');
  const [showModal, setShowModal] = useState(false);
  const [terminationReason, setTerminationReason] = useState('');
  const [dateTerminated, setDateTerminated] = useState('');
  useEffect(() => {
    const fetchLeaseData = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;

        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        if (!leaseId) {
          console.log('No lease ID found.');
          return;
        }

        // Fetch the lease data using the 'leaseId' parameter
        const response = await axios.get(
          `https://cloudagent.co.ke/backend/api/v1/leases/${leaseId}`,
          { headers }
        );

        setLeaseData(response.data);
        console.log('Property', response.data);
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    if (leaseId) {
      fetchLeaseData();
    }
  }, [leaseId]);

  // Add this function to handle tab changes and update the URL accordingly
  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue === 'invoices' && leaseId) {
      router.push(`/LeasesData/${leaseId}/Invoice`);
    } else {
      router.push(`/LeasesData/${leaseId}`);
    }
  };

  // if (!leaseData) {
  //   // Render a loading message while fetching the lease data
  //   return <p>Loading lease information...</p>;
  // }
  const handleTerminateLease = async () => {
    // First, show the modal to collect the termination reason
    setShowModal(true);
  };
  // Function to handle terminating the lease
  const handleSubmitTermination = async () => {
    try {
      // Close the modal
      setShowModal(false);

      // ... Your existing code to get the access token and other headers ...

      // Assuming you have the terminationReason state set appropriately
      const terminationData = { reason: terminationReason };
      const dateTerminated = { date: dateTerminated };
      const cookies = parseCookies();
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      if (!leaseId) {
        console.log('No lease ID found.');
        return;
      }

      // Send a POST request to the terminate endpoint
      const response = await axios.post(
        `https://cloudagent.co.ke/backend/api/v1/leases/${leaseId}/terminate`,
        terminationData,
        dateTerminated,
        { headers }
      );

      // Assuming the response will return some data, you can handle it here
      console.log('Lease termination response:', response.data);
      // Perform any other actions or updates based on the response if needed
    } catch (error) {
      console.error('Error terminating lease:', error);
    }
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
          <div className="row">
            <div className="col-lg-9">
              <div className="my_dashboard_review mb40">
                <div className="favorite_item_list">
                  <div className="row">
                    <div className="col-lg-12 maxw100flex-992">
                      <div className="row">
                        {/* Start Dashboard Navigation */}
                        <div className="col-lg-12">
                          <div className="dashboard_navigationbar dn db-1024">
                            <div className="dropdown">
                              <button
                                className="dropbtn"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#DashboardOffcanvasMenu"
                                aria-controls="DashboardOffcanvasMenu"
                              >
                                <i className="fa fa-bars pr10"></i> Dashboard
                                Navigation
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* End Dashboard Navigation */}

                        <div className="bg-success rounded-top text-light p-2 d-flex align-items-center justify-content-between">
                          <div className="breadcrumb_content style2 ">
                            <h2 className="breadcrumb_title text-light">
                              Leases Details
                            </h2>
                            <p className="text-light">
                              We are glad to see you again!
                            </p>
                            <h3 className="text-light">
                              {' '}
                              {leaseData.lease_number}
                            </h3>
                          </div>
                        </div>
                        <div className="container mt-5">
                          <TabContext value={selectedTab}>
                            <Box
                              sx={{ borderBottom: 1, borderColor: 'divider' }}
                            >
                              <TabList
                                onChange={(event, newValue) =>
                                  setSelectedTab(newValue)
                                }
                                aria-label="Tabs for Lease Details"
                              >
                                <Tab label="Info" value="info" />
                                <Tab label="Invoices" value="invoices" />
                              </TabList>
                            </Box>
                            <TabPanel value="info">
                              <Info leaseId={leaseId} />
                            </TabPanel>
                            <TabPanel value="invoices">
                              {/* Render the Invoice component and pass the leaseId */}
                              <Invoice leaseId={leaseId} />
                            </TabPanel>
                          </TabContext>
                        </div>
                        <div>
                          {/* ... */}
                          {/*  */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="my_dashboard_review mb40">
                <div className="favorite_item_list">
                  <div className="row">
                    <div className="col-lg-12 maxw100flex-992">
                      <div className="bg-success rounded-top text-light p-2 d-flex align-items-center justify-content-between">
                        <div className="breadcrumb_content style2 ">
                          <h2 className="breadcrumb_title text-light">
                            Summary
                          </h2>
                        </div>
                      </div>
                      <div className="col m-2">
                        <h5>Lease: {leaseData.lease_number}</h5>
                        <p>Property Code: {leaseData.property.property_name}</p>
                        <p>Unit Names: {leaseData.unit_names}</p>
                        <p>Tenant: {leaseData.tenant_names}</p>
                        <p>Start Date: {leaseData.start_date}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-danger d-flex align-items-center justify-content-between m-2"
                    onClick={handleTerminateLease}
                  >
                    Terminate Lease ({leaseData.lease_number})
                  </button>
                  {/* Modal to collect termination reason */}
                  <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        {' '}
                        Terminate Lease ({leaseData.lease_number})
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <input
                        type="date"
                        value={dateTerminated}
                        onChange={(e) => setDateTerminated(e.target.value)}
                        placeholder="Enter the reason for termination"
                        className="form-control"
                      />
                      <textarea
                        type="text"
                        value={terminationReason}
                        onChange={(e) => setTerminationReason(e.target.value)}
                        placeholder="Enter the reason for termination"
                        className="form-control"
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="danger"
                        onClick={handleSubmitTermination}
                      >
                        Terminate Lease ({leaseData.lease_number})
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LeasesDataPage;
