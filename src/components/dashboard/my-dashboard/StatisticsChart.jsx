import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { parseCookies } from 'nookies';

import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const StatisticsChart = () => {
  const [periodicalBilling, setPeriodicalBilling] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedMonthBilling, setSelectedMonthBilling] = useState(null);

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
          'https://cloudagent.co.ke/backend/api/v1/admin_summaries',
          { headers }
        );

        setPeriodicalBilling(response.data.periodical_billing);
        setSelectedMonth(response.data.periodical_billing[0]?.period_name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const selectedBilling = periodicalBilling.find(
      (billingItem) => billingItem.period_name === selectedMonth
    );
    setSelectedMonthBilling(selectedBilling);
  }, [selectedMonth, periodicalBilling]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const yourPeriodicalBillingData = {
    labels: ['Amount Billed', 'Amount Paid', 'Amount Due'],
    datasets: [
      {
        data: [
          selectedMonthBilling?.amount_billed || 0,
          selectedMonthBilling?.amount_paid || 0,
          selectedMonthBilling?.amount_due || 0,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
        ],
        borderWidth: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      // ... (other plugin configurations)
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'auto',
      }}
    >
      <div style={{ height: '200%' }}>
        <Doughnut
          options={chartOptions}
          data={yourPeriodicalBillingData}
          height={200}
        />
      </div>
      <div className="row m-2">
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="form-control"
          style={{ width: '100%', padding: '8px' }}
        >
          {periodicalBilling.map((billingItem) => (
            <option key={billingItem.period_id} value={billingItem.period_name}>
              {billingItem.period_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        {selectedMonthBilling && (
          <div className="row">
            <div className="col-lg-4">
              <input
                type="text"
                className="form-control"
                readOnly
                value={`Amount Billed: ${selectedMonthBilling.amount_billed_as_currency}`}
              />
            </div>
            <div className="col-lg-4">
              <input
                type="text"
                className="form-control"
                readOnly
                value={`Amount Paid: ${selectedMonthBilling.amount_paid_as_currency}`}
              />
            </div>
            <div className="col-lg-4">
              <input
                type="text"
                className="form-control"
                readOnly
                value={`Amount Due: ${selectedMonthBilling.amount_due_as_currency}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsChart;
