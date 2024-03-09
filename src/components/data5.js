import React, { useState, useEffect } from 'react';
import { Chart, Heatmap, Tooltip } from 'bizcharts';
import { Card } from 'antd';

const HeatmapChart = () => {
  const [data, setData] = useState([]);
  const [chartHeight, setChartHeight] = useState(400); // Initial height for desktop view

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

  useEffect(() => {
    function handleResize() {
      // Adjust chart height based on screen size
      if (window.innerWidth <= 768) {
        setChartHeight(300); // Set height for mobile view
      } else {
        setChartHeight(400); // Set height for desktop view
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial adjustment

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ marginTop: '10px' }}> 
      <h2>Heatmap Chart</h2>
      <Card>
        <Chart height={chartHeight} data={data} autoFit>
          <Heatmap
            position="Name*number_courses"
            color={['number_courses', '#BAE7FF-#1890FF-#0050B3']}
            shape="rect"
            style={{ stroke: '#fff', lineWidth: 1 }}
          />
          <Tooltip showTitle={false} />
        </Chart>
      </Card>
    </div>
  );
};

export default HeatmapChart;
