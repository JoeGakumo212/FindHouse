import LeaseDetails from '../../../pages/[leasesId]';
import Header from '../../common/header/dashboard/Header';
import SidebarMenu from '../../common/header/dashboard/SidebarMenu';
import MobileMenu from '../../common/header/MobileMenu';
import LeaseDetails from './LeaseDetails';
import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter(); // Initialize useRouter
  const handleBack = () => {
    router.push('LeasesData');
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
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}

                <div className="col-lg-4 col-xl-4 mb10">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">Leases Details</h2>
                    <p>We are glad to see you again!</p>
                  </div>
                </div>
                <div className="col-lg-4 mb10">
                  <div className="breadcrumb_content style2">
                    <div className="my_profile_setting_input">
                      <button
                        className="btn float-end btn-danger"
                        onClick={handleBack}
                      >
                        Back to Leases Management
                      </button>
                    </div>
                  </div>
                </div>

                {/* End .col */}

                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    <div className="favorite_item_list">
                      <LeaseDetails/>
                    </div>
                  </div>
                </div>

                {/* End .col */}
              </div>
              {/* End .row */}

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>© 2023 Find House. Made with love.</p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
