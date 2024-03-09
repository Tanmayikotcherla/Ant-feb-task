import React, { useState, useEffect } from 'react';
import { Chart, Interval, Tooltip, Axis } from 'bizcharts';
import { Card } from 'antd';

const Histogram = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('data2.csv'); // Assuming data.csv is in the public folder
        const text = await response.text();
        const rows = text.split('\n').slice(1); // Remove header row and split by newline
        const formattedData = rows.map(row => {
          const columns = row.split(',');
          return {
            Name: columns[0],
            number_courses: parseInt(columns[1])
          };
        });
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <Card title="Histogram">
      <Chart height={400} data={data} autoFit>
        <Interval
          adjust={[{ type: 'dodge', marginRatio: 0 }]}
          position="Name*number_courses"
          color={['Name', ['#1890ff', '#f04864']]}
        />
        <Axis name="Name" title />
        <Axis name="number_courses" title />
        <Tooltip shared />
      </Chart>
    </Card>
  );
};

export default Histogram;
