
import StatisticsChart from "../../components/dashboard/my-dashboard/StatisticsChart";
import { useRouter } from "next/router";
import { useEffect } from "react";


const Dashboard = () => {
  const router=useRouter()
  const { userRole } = router.query;
  
console.log("User role my-dashboard dashboard",userRole);
  return (
    <>
    
    
{/*      
      <section className="our-dashbord dashbord bgc-f7 pb50"> */}
        
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992 our-dashbord dashbord bgc-f7 pb50">
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

              
              </div>
              {/* End .row */}

              {/* End .row Dashboard top statistics */}

              <div className="row">
                <div className="col-xl-12">
                  <div className="application_statics">
                    <h4 className="mb-4">Tenants Dashboard</h4>
                    <StatisticsChart />
                  </div>
                </div>
                {/* End statistics chart */}

               
              </div>
              {/* End .row  */}

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>© 2023 Find House. Made with love. dev JoeGakumo</p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      {/* </section> */}
    </>
  );
};

export default Dashboard;
