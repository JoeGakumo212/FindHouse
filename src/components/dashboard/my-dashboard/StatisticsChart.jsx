import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminSummaryComponent = () => {
  const [allStatistics, setAllStatistics] = useState([
    // ... (your statistic objects)
  ]);

  const [adminSummary, setAdminSummary] = useState({});
  const [periodicalBilling, setPeriodicalBilling] = useState([]);
  const [selectedMonthBilling, setSelectedMonthBilling] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
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

  const getTimerValue = (timerKey) => {
    return adminSummary[timerKey];
  };

  const handleMonthClick = (event, activeElements) => {
    if (activeElements && activeElements.length > 0) {
      const selectedIndex = activeElements[0].index;
      const selectedBilling = periodicalBilling[selectedIndex];
      setSelectedMonthBilling(selectedBilling);
    } else {
      setSelectedMonthBilling(null);
    }
  };

  const yourPeriodicalBillingData = {
    labels: periodicalBilling.map((billingItem) => billingItem.period_name),
    datasets: [
      {
        label: 'Periodical Billing',
        data: periodicalBilling.map(() =>
          faker.datatype.number({ min: 100, max: 400 })
        ),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    onHover: handleMonthClick, // Add hover event handler
    plugins: {
      // ... (other plugin configurations)
    },
  };

  return (
    <>
      <div className="row">
        {allStatistics.map((item) => (
          <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3" key={item.id}>
            {/* ... (your statistic items) */}
          </div>
        ))}
      </div>
      <div>
        <h1>Periodical Billing</h1>
        <Line options={chartOptions} data={yourPeriodicalBillingData} />
      </div>
      <div>
        {selectedMonthBilling && (
          <div>
            <h2>Selected Month: {selectedMonthBilling.period_name}</h2>
            <p>Amount Billed: {selectedMonthBilling.amount_billed_as_currency}</p>
            <p>Amount Paid: {selectedMonthBilling.amount_paid_as_currency}</p>
            <p>Amount Due: {selectedMonthBilling.amount_due_as_currency}</p>
            {/* Add other billing details */}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminSummaryComponent;
