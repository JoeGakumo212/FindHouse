import { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies'; // Import parseCookies from nookies
import Header from '../../../components/common/header/dashboard/Header';
import SidebarMenu from '../../../components/common/header/dashboard/SidebarMenu';
import MobileMenu from '../../../components/common/header/MobileMenu';
import { useRouter } from 'next/router';
const UnitInfo = () => {
  const [utilityData, setUtilityData] = useState({});
  const router = useRouter();
  const { UtilityId } = router.query;

  const fetchUtilityData = async () => {
    try {
      const cookies = parseCookies(); // Correctly parse cookies using nookies
      const tokenFromCookie = cookies.access_token;

      const headers = {
        Authorization: `Bearer ${tokenFromCookie}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(
        `https://cloudagent.co.ke/backend/api/v1/readings/${UtilityId}`,
        {
          headers: headers,
        }
      );

      setUtilityData(response.data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    fetchUtilityData();
  }, [UtilityId]);

  // Render your utility data in the component JSX

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
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="col-lg-12">
            <div className="my_dashboard_review mb40">
              <div className="favorite_item_list">
                <div className="container">
                <div className="bg-success rounded-top text-light p-2  align-items-center justify-content-between">
                <h2 className='text-light'>Utility Management</h2>
                <div>
                {utilityData.utility?.utility_display_name ?? 'N/A'} on {utilityData.reading_date}
                </div>
                 
                      </div>
                 
                  <div className="border-dark rounded-top">
                    <div className="row">
                      <div className="col-lg-12 m-3">
                        <h1>Info</h1>
                        <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr className='bg-dark text-light'>
                              <th>Property Name(Utility)</th>
                              <th>Property Code (Reading Date)</th>
                              <th>Location (Current Reading)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td> {utilityData.utility?.utility_display_name ?? 'N/A'}</td>
                              <td>{utilityData.reading_date}</td>
                              <td>{utilityData.current_reading}</td>
                            </tr>
                          </tbody>
                        </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UnitInfo;
