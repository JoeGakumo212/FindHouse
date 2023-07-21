import Header from "../../components/common/header/dashboard/Header";
import SidebarMenu from "../../components/common/header/dashboard/SidebarMenu";
import MobileMenu from "../../components/common/header/MobileMenu";
import Link from "next/link";
const PageB = () => {
 
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
        <h1>Helloe PageB</h1>
        <Link href={'/custom-page/PageA'}>PageA</Link>
        </div>
      </section>
    </>
  );
};

export default PageB;
