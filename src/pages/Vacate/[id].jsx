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

const MyComponent = () => {
  const [activeTab, setActiveTab] = useState('Info');
  const router = useRouter();
  const { id } = router.query;
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
            <section className="our-dashbord dashbord bgc-f7 pb-5">
              <div className="bg-success rounded-top text-light p-2 d-flex align-items-center justify-content-between">
                <div>
                  <h1 className="text-light">Vacate Notice Details</h1>
                </div>
                <ul className="view_edit_delete_list mb-0">
                  <li
                    className="list-inline-item"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Edit"
                    onClick={() => handleEditProperty(property)}
                  >
                    <span className="flaticon-edit text-dark"></span>
                  </li>
                </ul>
              </div>

              <div className="container-fluid ovh">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <nav className="row">
                        <div className="col">
                          <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                              <Box
                                sx={{ borderBottom: 1, borderColor: 'divider' }}
                              >
                                <TabList
                                  onChange={handleChange}
                                  aria-label="lab API tabs example"
                                >
                                  <Tab label="Info" value="1" />
                                </TabList>{' '}
                              </Box>

                              <TabPanel value="1">
                                <Info id={id}/>
                              </TabPanel>
                            </TabContext>
                          </Box>
                        </div>
                      </nav>
                    </div>
                  </div>
                  <hr />
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
