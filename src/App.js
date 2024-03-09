import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/home';
import Table1 from './components/table1';
import Table2 from './components/table2';
import Table3 from './components/table3';
import Table4 from './components/table4';
import Table5 from './components/table5';
import BarGraph from './components/data1';
import LineChart from './components/data2';
import ScatterPlot from './components/data3'; 
import Histogram from './components/data4';
import HeatmapChart from './components/data5';



const App = () => (
  <Router> 
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/table1" element={<Table1 />} />
      <Route path="/table2" element={<Table2 />} />
      <Route path="/table3" element={<Table3 />} />
      <Route path="/table4" element={<Table4 />} />
      <Route path="/table5" element={<Table5 />} />
      <Route path="/visualization1" element={<BarGraph />} />
      <Route path="/visualization2" element={<LineChart />}/> 
      <Route path="/visualization3" element={<ScatterPlot />} />
      <Route path="/visualization4" element={<Histogram />} />
      <Route path="/visualization5" element={<HeatmapChart />} /> 

    </Routes>
  </Router>
);

export default App;
