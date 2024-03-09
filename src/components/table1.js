import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import Papa from 'papaparse';

const App = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  useEffect(() => {
    // Fetch the CSV file from the public folder
    fetch('/Dataset (1).csv') // Adjust the path to your dataset
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={e => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => {
      const dataIndexValue = record[dataIndex];
      if (dataIndexValue !== undefined && dataIndexValue !== null) {
        return dataIndexValue.toString().toLowerCase().includes(value.toLowerCase());
      }
      return false;
    },
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      width: '20%',
      ...getColumnSearchProps('Name'),
    },
    {
      title: 'Time Study',
      dataIndex: 'time_study',
      key: 'time_study',
      width: '20%',
      ...getColumnSearchProps('time_study'),
    },
    {
      title: 'Marks',
      dataIndex: 'Marks',
      key: 'Marks',
      width: '20%',
      ...getColumnSearchProps('Marks'),
    },
    {
      title: 'Number of Courses',
      dataIndex: 'number_courses',
      key: 'number_courses',
      width: '20%',
      ...getColumnSearchProps('number_courses'),
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
      key: 'Gender',
      width: '20%',
      ...getColumnSearchProps('Gender'),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default App;
