import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarChart = ({ data }) => {
  const options = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Periodical Billing',
    },
    xAxis: {
      categories: data.map((item) => item.period_name),
      title: {
        text: 'Months',
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Amount',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
      },
    },
    tooltip: {
      valueSuffix: ' $',
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Amount Billed',
        data: data.map((item) => item.amount_billed),
      },
      {
        name: 'Amount Paid',
        data: data.map((item) => item.amount_paid),
      },
      {
        name: 'Amount Due',
        data: data.map((item) => item.amount_due),
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BarChart;
