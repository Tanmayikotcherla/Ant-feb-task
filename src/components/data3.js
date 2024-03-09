import React, { useState, useEffect } from 'react';
import { Chart, Point, Tooltip, Axis } from 'bizcharts';
import { Card } from 'antd';

const ScatterPlot = () => {
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
    <Card title="Scatter Plot">
      <Chart height={400} data={data} autoFit>
        <Point position="Name*number_courses" />
        <Axis name="Name" />
        <Axis name="number_courses" />
        <Tooltip showTitle={false} crosshairs={{ type: 'rect' }} />
      </Chart>
    </Card>
  );
};

export default ScatterPlot;
