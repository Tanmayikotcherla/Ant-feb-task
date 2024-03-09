import React, { useState, useEffect } from 'react';
import { Divider, Table, Checkbox } from 'antd';
import Papa from 'papaparse'; // Import PapaParse for parsing CSV

const Table5 = () => {
  const [data, setData] = useState([]);
  const [checkedList, setCheckedList] = useState(['number_courses', 'time_study', 'Marks', 'Name', 'Gender']);
  
  const options = [
    { label: 'Number of Courses', value: 'number_courses' },
    { label: 'Time Study', value: 'time_study' },
    { label: 'Marks', value: 'Marks' },
    { label: 'Name', value: 'Name' },
    { label: 'Gender', value: 'Gender' },
  ];

  useEffect(() => {
    // Fetch the CSV file from the public folder
    fetch('Dataset (1).csv')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.text();
      })
      .then(csv => {
        // Parse CSV into array of objects
        const parsedData = Papa.parse(csv, { header: true }).data;
        console.log('Parsed Data:', parsedData); // Log parsed data for debugging
        setData(parsedData);
      })
      .catch(error => {
        console.error('Error fetching CSV:', error);
      });
  }, []);

  const onChangeCheckbox = checkedValues => {
    setCheckedList(checkedValues);
  };

  const filteredColumns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Time Study',
      dataIndex: 'time_study',
      key: 'time_study',
    },
    {
      title: 'Marks',
      dataIndex: 'Marks',
      key: 'Marks',
    },
    {
      title: 'Number of Courses',
      dataIndex: 'number_courses',
      key: 'number_courses',
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
      key: 'Gender',
    },
  ].filter(column => checkedList.includes(column.dataIndex));

  return (
    <>
      <Divider>Columns displayed</Divider>
      <Checkbox.Group options={options} value={checkedList} onChange={onChangeCheckbox} />

      <Table columns={filteredColumns} dataSource={data} style={{ marginTop: 24 }} scroll={{ x: true }} />
    </>
  );
};

export default Table5;
