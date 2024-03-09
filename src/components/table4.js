import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import Papa from 'papaparse'; // Import PapaParse for parsing CSV

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the CSV file from the public folder
    fetch('Dataset (1).csv')
      .then(response => response.text())
      .then(csv => {
        // Parse CSV into array of objects
        const parsedData = Papa.parse(csv, { header: true }).data;
        setData(parsedData);
      })
      .catch(error => {
        console.error('Error fetching CSV:', error);
      });
  }, []);

  const columns = [
    {
      title: 'Number of Courses',
      dataIndex: 'number_courses',
      sorter: {
        compare: (a, b) => a.number_courses - b.number_courses,
        multiple: 1,
      },
    },
    {
      title: 'Time Study',
      dataIndex: 'time_study',
      sorter: {
        compare: (a, b) => a.time_study - b.time_study,
        multiple: 2,
      },
    },
    {
      title: 'Marks',
      dataIndex: 'Marks',
      sorter: {
        compare: (a, b) => a.Marks - b.Marks,
        multiple: 3,
      },
    },
    {
      title: 'Name',
      dataIndex: 'Name',
    
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
    
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return <Table columns={columns} dataSource={data} onChange={onChange} scroll={{ x: true }} />;
};

export default App;
