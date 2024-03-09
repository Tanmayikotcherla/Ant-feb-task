import React from 'react';
import { Layout, Menu } from 'antd';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const HomePage = () => {
  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2" onClick={() => scrollToElement('tables')}>Visualise</Menu.Item>
          <Menu.Item key="3" onClick={() => scrollToElement('visualise')}>Tables</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        
        <div className="site-layout-content">
          <h1>ANT DESIGN.</h1>
          <p>This is a simple homepage created using Ant Design.<br></br> Here we took a sample dataset to show the table format and the visualisation of different features of the dataset using ant design<br></br>There are 10 cards below which are distributed as 5 of them are the cards which stored the data of the table information and other 5 cards stores the visualisation part of the datset given<br></br>The sample dataset taken here are the student data with the info of their time of study and their enrolled courses with their respective names and gender</p>
        </div>
        <div id="tables">
        <h1>Visualization-Data</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/visualization1">
          <Card title="Visualization 1" style={{ width: 300, margin: 20 }}>
          𝓑𝓪𝓻𝓰𝓻𝓪𝓹𝓱
          </Card>
        </Link>
        <Link to="/visualization2">
          <Card title="Visualization 2" style={{ width: 300, margin: 20 }}>
          𝓛𝓲𝓷𝓮𝓬𝓱𝓪𝓻𝓽

          </Card>
        </Link>
        <Link to="/visualization3">
          <Card title="Visualization 3" style={{ width: 300, margin: 20 }}>
          𝓼𝓬𝓪𝓽𝓽𝓮𝓻𝓹𝓵𝓸𝓽

          </Card>
        </Link>
        <Link to="/visualization4">
          <Card title="Visualization 4" style={{ width: 300, margin: 20 }}>
          𝓗𝓲𝓼𝓽𝓸𝓰𝓻𝓪𝓶
          </Card>
        </Link>
        <Link to="/visualization5">
          <Card title="Visualization 5" style={{ width: 300, margin: 20 }}>
          𝓗𝓮𝓪𝓽𝓶𝓪𝓹𝓬𝓱𝓪𝓻𝓽
          </Card>
        </Link>
      </div>
        </div>
        <div id="visualise">
        <h1>Tabular-Data</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/table1">
          <Card title="Table 1" style={{ width: 300, margin: 20 }}>
            Displays the  student content from the dataset in 5 sections each section contains 10 members student data. 
          </Card>
        </Link>
        <Link to="/table2">
          <Card title="Table 2" style={{ width: 300, margin: 20 }}>
          Selection and operation:
          To perform operations and clear selections after selecting some rows, use rowSelection.selectedRowKeys to control selected rows.
          </Card>
        </Link>
        <Link to="/table3">
          <Card title="Table 3" style={{ width: 300, margin: 20 }}>
          selection:
Rows can be selectable by making first column as a selectable column. You can use rowSelection.type to set selection type. Default is checkbox
          </Card>
        </Link>
        <Link to="/table4">
          <Card title="Table 4" style={{ width: 300, margin: 20 }}>
          Multiple sorter:
column.sorter support multiple to config the priority of sort columns. 
Though sorter.compare to customize compare function. You can also leave it empty to use the interactive only.
          </Card>
        </Link>
        <Link to="/table5">
          <Card title="Table 5" style={{ width: 300, margin: 20 }}>
          Hidden Columns:
Hide columns with hidden.
          </Card>
        </Link>
      </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2022 Created by Ant UED</Footer>
    </Layout>
  );
}

export default HomePage;
