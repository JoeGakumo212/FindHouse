import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { parseCookies } from 'nookies';

// Dynamically import ReactApexChart with ssr option set to false
const DynamicReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const BarChart = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'bar-chart',
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: 'Series 1',
        data: [],
      },
    ],
  });

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

        // Process the response data to extract the required information
        const periodicalBilling = response.data.periodical_billing;
        const categories = periodicalBilling.map((item) => item.period_name);
        const amountBilledData = periodicalBilling.map((item) =>
          (item.amount_billed || 0).toFixed(2)
        );
        const amountPaidData = periodicalBilling.map((item) =>
          (item.amount_paid || 0).toFixed(2)
        );
        const amountDueData = periodicalBilling.map((item) =>
          (item.amount_due || 0).toFixed(2)
        );

        // Set the chart data
        setChartData({
          options: {
            chart: {
              id: 'bar-chart',
            },
            xaxis: {
              categories: categories,
            },
          },
          series: [
            {
              name: 'Amount Billed',
              data: amountBilledData,
            },
            {
              name: 'Amount Paid',
              data: amountPaidData,
            },
            {
              name: 'Amount Due',
              data: amountDueData,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return typeof window !== 'undefined' ? ( // Check if window is defined
    <div className="bar-chart">
      <DynamicReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={400}
      />
    </div>
  ) : null;
};

export default BarChart;
