import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';

const AdminSummaryComponent = () => {
  const [allStatistics, setAllStatistics] = useState([
    {
      id: 1,
      blockStyle: "",
      icon: "flaticon-home",
      timerKey: "pending_amount",      
      name: "Pending Amount",
    },
    {
      id: 2,
      blockStyle: "style2",
      icon: "flaticon-home",
      timerKey: "total_properties",
      name: "Properties/Units",
    },
    {
      id: 3,
      blockStyle: "style3",
      icon: "flaticon-user",
      timerKey: "total_leases",
      name: "Leases",
    },
    {
      id: 4,
      blockStyle: "style4",
      icon: "flaticon-user",
      timerKey: "total_tenants",
      name: "Tenants",
    },
  ]);

  const [adminSummary, setAdminSummary] = useState({});
  const [periodicalBilling, setPeriodicalBilling] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookies = parseCookies();
        const tokenFromCookie = cookies.access_token;

        const headers = {
          Authorization: `Bearer ${tokenFromCookie}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.get(
          'https://cloudagent.co.ke/backend/api/v1/admin_summaries?filter=&page=1&limit=1&sortField=&sortDirection=&whereField=&whereValue=',
          { headers }
        );

        setAdminSummary(response.data);
        setPeriodicalBilling(response.data.periodical_billing);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (Object.keys(adminSummary).length === 0) {
    return <div>Loading...</div>;
  }

  const getTimerValue = (timerKey) => {
    return adminSummary[timerKey];
  };

  

  return (
    <>
      <div className="row">
        {allStatistics.map((item) => (
          <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3" key={item.id}>
            <div className={`ff_one ${item.blockStyle}`}>
              <div className="detais">
                <div className="timer text-danger">
                  {getTimerValue(item.timerKey)}
                </div>
                <p>{item.name}</p>
              </div>
              <div className="icon">
                <span className={item.icon}></span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </>
  );
};

export default AdminSummaryComponent;
