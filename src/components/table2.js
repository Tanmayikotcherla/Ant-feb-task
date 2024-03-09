import React, { useState, useEffect } from 'react';
import { Button, Table } from 'antd';
import Papa from 'papaparse'; // Import PapaParse for parsing CSV

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

const App = () => {
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch data from dataset
    setLoading(true);
    fetch('Dataset (1).csv') // Adjust the path to match your dataset
      .then(response => response.text())
      .then(csv => {
        const parsedData = Papa.parse(csv, { header: true }).data;
        setData(parsedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching dataset:', error);
        setLoading(false);
      });
  }, []);

  const start = () => {
    // Reload functionality
    setLoading(true);
    // Simulating reload with delay
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = newSelectedRowKeys => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ x: true }} />
    </div>
  );
};

export default App;
