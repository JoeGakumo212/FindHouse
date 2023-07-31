import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import Header from '../../components/common/header/dashboard/Header';
import SidebarMenu from '../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../components/common/header/MobileMenu';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@mui/system/Box';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Info from './Info';
import Property from './Property';


const MyComponent = () => {
  const [property, setProperty] = useState(null);
  const [activeTab, setActiveTab] = useState('Info');
  const router = useRouter();
  const { id } = router.query;
  const [value, setValue] = useState('1');
  const [editing, setEditing] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleEditLandlord = () => {
    
    router.push(`/my-landlords/${id}/EditForm`);

    
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

      {/* Our Dashbord */}
      <div className="col-lg-12">
        <div className="my_dashboard_review mb40">
          <div className="favorite_item_list">
            <section className="our-dashbord dashbord bgc-f7 pb50">
              <div className="container-fluid ovh">
                <div className="row">
                  <div className="col">
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
                                      <i className="fa fa-bars pr10"></i>{' '}
                                      Dashboard Navigation
                                    </button>
                                  </div>
                                </div>
                              </div>
                              {/* End Dashboard Navigation */}

                              <div className="bg-success rounded-top text-light p-2 d-flex align-items-center justify-content-between">
                                <div>
                                  <h1 className="text-light">
                                    Landlords Details
                                  </h1>
                                  <p className="text-light">
                                    We are glad to see you again!
                                  </p>
                                </div>
                                <ul className="view_edit_delete_list mb-0">
                                  <li
                                    className="list-inline-item"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Edit"
                                    onClick={handleEditLandlord}
                                 
                                  >
                                    <span className="flaticon-edit text-dark"></span>
                                  </li>
                                </ul>
                              </div>
                              <div className="container mt-5">
                                <nav className="row">
                                  <div className="col">
                                    <Box
                                      sx={{
                                        width: '100%',
                                        typography: 'body1',
                                      }}
                                    >
                                      <TabContext value={value}>
                                        <Box
                                          sx={{
                                            borderBottom: 1,
                                            borderColor: 'divider',
                                          }}
                                        >
                                          <TabList
                                            onChange={handleChange}
                                            aria-label="lab API tabs example"
                                          >
                                            <Tab label="Info" value="1" />
                                            <Tab label="Property" value="2" />
                                          </TabList>{' '}
                                        </Box>

                                        <TabPanel value="1">
                                          <Info id={id} />
                                        </TabPanel>
                                        <TabPanel value="2">
                                          <Property />
                                        </TabPanel>
                                      </TabContext>
                                    </Box>
                                  </div>
                                </nav>
                                
                              </div>
                              {/* Conditional rendering of the EditForm component */}
      
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
                              <h5>Property: </h5>
                              <p>Unit: </p>
                              <p>Charge Rate:</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyComponent;
