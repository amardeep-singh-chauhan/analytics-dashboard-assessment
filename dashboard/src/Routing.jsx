import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './Components/SideBar';
import DashboardComp from './Components/DashboardComp';
import Analytics from './Components/Analytics';
import Papa from "papaparse";

function Routing() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse("/Electric_Vehicle_Population_Data.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setData(result.data);
      },
    });
  }, []);

  return (
    <Router>
      <SideBar />
      <div className='routing-comp'>
        <Routes>
          <Route path="/" element={<DashboardComp data={data} />} />
          <Route path="/analytics" element={<Analytics data={data} />} />
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default Routing;
