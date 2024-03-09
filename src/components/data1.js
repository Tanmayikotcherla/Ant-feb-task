import React, { useState, useEffect } from 'react';
import { Chart, Interval, Tooltip, Axis } from 'bizcharts'; 
import { Card } from 'antd';

const BarGraph = () => {
  const [data, setData] = useState([]);
  const [chartHeight, setChartHeight] = useState(400); // Initial height for desktop view
  const [fontSize, setFontSize] = useState(12); // Initial font size for labels

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('data2.csv'); 
        const text = await response.text();
        const rows = text.split('\n').slice(1); 
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
        setFontSize(10); // Decrease font size for mobile view
      } else {
        setChartHeight(400); // Set height for desktop view
        setFontSize(12); // Reset font size for desktop view
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial adjustment

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Card title="Bar Graph">
      <div style={{ height: chartHeight }}>
        <Chart height={chartHeight} data={data} autoFit>
          <Interval position="Name*number_courses" />
          <Axis name="Name" title={{ style: { fontSize: `${fontSize}px` } }} />
          <Axis name="number_courses" title={{ style: { fontSize: `${fontSize}px` } }} />
          <Tooltip shared />
        </Chart>
      </div>
    </Card>
  );
};

export default BarGraph;
