import { useState, useEffect } from "react";
import React from 'react';
import DashHeader from "./DashHeader";
import DashCards from "./DashCards";
import ChartCollection from "./ChartCollection";

function DashboardComp({ data }) {
  const [summary, setSummary] = useState([
    { label: 'Total Vehicles', value: 0 },
    { label: 'Most Common Make', value: '' },
    { label: 'Avg. Electric Range', value: 0 },
    { label: 'CAFV Eligibility Count', value: 0 },
    { label: 'Common Model Year', value: '' },
    { label: 'Electric Utility Count', value: 0 }
  ]);

  useEffect(() => {
    if (data?.length > 0) {
      const totalVehicles = data?.length;

      const makeCount = {};
      data?.forEach(vehicle => {
        const make = vehicle.Make;
        makeCount[make] = (makeCount[make] || 0) + 1;
      });
      const mostCommonMake = Object.keys(makeCount).reduce((a, b) => makeCount[a] > makeCount[b] ? a : b);

      const electricRanges = data.map(vehicle => parseFloat(vehicle["Electric Range"])).filter(range => !isNaN(range));
      const averageElectricRange = electricRanges?.reduce((acc, range) => acc + range, 0) / totalVehicles;

      const cafvEligibilityCount = data?.filter(vehicle => vehicle["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] === "Clean Alternative Fuel Vehicle Eligible").length;

      const modelYearCount = {};
      data?.forEach(vehicle => {
        const year = vehicle["Model Year"];
        modelYearCount[year] = (modelYearCount[year] || 0) + 1;
      });
      const mostCommonModelYear = Object.keys(modelYearCount).reduce((a, b) => modelYearCount[a] > modelYearCount[b] ? a : b);

      const electricUtilities = new Set();
      data?.forEach(vehicle => {
        const utilities = vehicle["Electric Utility"]?.split('|');
        utilities?.forEach(utility => electricUtilities.add(utility.trim()));
      });
      const electricUtilityCount = electricUtilities.size;

      setSummary([
        { label: 'Total Vehicles', value: totalVehicles },
        { label: 'Most Common Make', value: mostCommonMake },
        { label: 'Avg. Electric Range', value: averageElectricRange.toFixed(2) },
        { label: 'CAFV Eligibility Count', value: cafvEligibilityCount },
        { label: 'Common Model Year', value: mostCommonModelYear },
        { label: 'Electric Utility Count', value: electricUtilityCount }
      ]);
    }
  }, [data]);

  return (
    <div style={{ padding: '1rem', marginLeft: 240 }}>
      <>
        <DashHeader />
        <DashCards summary={summary} />
        <ChartCollection data={data} />
      </>
    </div>
  );
}

export default DashboardComp;
