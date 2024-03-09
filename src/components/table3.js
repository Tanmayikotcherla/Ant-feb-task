import React, { useState, useEffect } from 'react';
import { Divider, Radio, Table } from 'antd';
import Papa from 'papaparse'; // Import PapaParse for parsing CSV

const Table3 = () => {
  const [data, setData] = useState([]);
  const [selectionType, setSelectionType] = useState('checkbox');

  useEffect(() => {
    // Fetch the CSV file from the public folder
    fetch('Dataset (1).csv')
      .then(response => response.text())
      .then(csv => {
        // Parse CSV into array of objects
        const parsedData = Papa.parse(csv, { header: true }).data;
        // Add a unique key for each row
        const dataWithKeys = parsedData.map((row, index) => ({ ...row, key: index.toString() }));
        setData(dataWithKeys);
      })
      .catch(error => {
        console.error('Error fetching CSV:', error);
      });
  }, []);

  const columns = [
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
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  return (
    <div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">Radio</Radio>
      </Radio.Group>

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        scroll={{ x: true }} // Make the table horizontally scrollable
      />
    </div>
  );
};

export default Table3;
