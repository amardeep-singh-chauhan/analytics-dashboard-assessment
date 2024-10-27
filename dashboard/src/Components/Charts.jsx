import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';

function Charts({ data, label, type }) {
    console.log(data)
    let config = {}
    const chartConfig = useMemo(() => {
        // var config = {};

        switch (label) {
            case 'vehicleDistribution':
                const yearData = data.reduce((acc, item) => {
                    const year = item['Model Year'];
                    if (!year) {
                        return acc;
                    }
                    if (!acc[year]) acc[year] = [];
                    acc[year].push(item);
                    return acc;
                }, {});

                const boxPlotData = Object.entries(yearData).map(([year, entries]) => {
                    const values = entries
                        .map(item => parseFloat(item['Electric Range'])) // Convert Electric Range to a float
                        .filter(value => !isNaN(value));

                    if (values.length === 0) {
                        console.warn(`No numeric values found for year: ${year}`);
                        return { x: year, y: [0, 0, 0, 0, 0] }; 
                    }

                    values.sort((a, b) => a - b);

                    const min = values[0];
                    const q1 = values[Math.floor(values.length * 0.25)];
                    const median = values[Math.floor(values.length * 0.5)];
                    const q3 = values[Math.floor(values.length * 0.75)];
                    const max = values[values.length - 1];

                    return {
                        x: year,
                        y: [min, q1, median, q3, max]
                    };
                });

                config = {
                    options: {
                        chart: { id: 'vehicle-distribution', type: 'boxPlot' },
                        title: { text: 'Vehicle Distribution by Model Year' },
                        dataLabels: { enabled: false },
                        xaxis: {
                            type: 'category'
                        }
                    },
                    series: [{
                        data: boxPlotData
                    }]
                };
                break;



            case 'rangeDistribution':
                const rangeData = data.reduce((acc, item) => {
                    const range = parseInt(item['Electric Range'], 10);
                    if (!isNaN(range)) {
                        const rangeCategory = `${Math.floor(range / 50) * 50}-${Math.floor(range / 50) * 50 + 49}`;
                        if (!acc[rangeCategory]) acc[rangeCategory] = { min: range, max: range };
                        else {
                            acc[rangeCategory].min = Math.min(acc[rangeCategory].min, range);
                            acc[rangeCategory].max = Math.max(acc[rangeCategory].max, range);
                        }
                    }
                    return acc;
                }, {});
                config = {
                    options: {
                        chart: { id: 'range-distribution', type: 'rangeArea' },
                        xaxis: { categories: Object.keys(rangeData) },
                        title: { text: 'Electric Range Distribution' },
                    },
                    series: [{
                        name: 'Electric Range',
                        data: Object.entries(rangeData).map(([category, { min, max }]) => ({
                            x: category,
                            y: [min, max]
                        })),
                    }],
                };
                break;

            case 'vehicleManufacturer':
                const manufacturerCount = data.reduce((acc, item) => {
                    const make = item.Make;
                    acc[make] = (acc[make] || 0) + 1;
                    return acc;
                }, {});
                config = {
                    options: {
                        chart: { id: 'vehicle-manufacturer' },
                        xaxis: { categories: Object.keys(manufacturerCount) },
                        title: { text: 'Vehicle Count by Manufacturer' },
                        dataLabels: { enabled: false },
                    },
                    series: [{
                        name: 'Vehicles',
                        data: Object.values(manufacturerCount),
                    }],
                };
                break;

            case 'vehicleCountry':
                const countyCount = data.reduce((acc, item) => {
                    const county = item.County;
                    acc[county] = (acc[county] || 0) + 1;
                    return acc;
                }, {});
                config = {
                    options: {
                        chart: { id: 'vehicle-country', type: 'pie' },
                        labels: Object.keys(countyCount),
                        title: { text: 'Vehicle Count by County' },
                    },
                    series: Object.values(countyCount),
                };
                break;

            case 'cafvEligibility':
                const eligibilityCount = data.reduce((acc, item) => {
                    const eligibility = item['Clean Alternative Fuel Vehicle (CAFV) Eligibility'];
                    if (eligibility === 'Clean Alternative Fuel Vehicle Eligible') {
                        acc.eligible += 1;
                    } else {
                        acc.notEligible += 1;
                    }
                    return acc;
                }, { eligible: 0, notEligible: 0 });
                config = {
                    options: {
                        chart: { id: 'cafv-eligibility', type: 'pie' },
                        labels: ['Eligible', 'Not Eligible'],
                        title: { text: 'CAFV Eligibility Distribution' },
                    },
                    series: [eligibilityCount.eligible, eligibilityCount.notEligible],
                };
                break;

            case 'electricUsage':
                const utilityCount = data.reduce((acc, item) => {
                    const utilities = item['Electric Utility']?.split('|') || [];
                    utilities.forEach(utility => {
                        acc[utility.trim()] = (acc[utility.trim()] || 0) + 1;
                    });
                    return acc;
                }, {});
                config = {
                    options: {
                        chart: { id: 'electric-usage' },
                        xaxis: { categories: Object.keys(utilityCount) },
                        title: { text: 'Electric Utility Usage by Vehicle Count' },
                        dataLabels: { enabled: false },
                    },
                    series: [{
                        name: 'Vehicles',
                        data: Object.values(utilityCount),
                    }],
                };
                break;

            default:
                config = {
                    options: { title: { text: 'Invalid chart type' } },
                    series: []
                };
        }

        return config;
    }, [data, label]);

    console.log(label, type, config);

    return (
        <div>
            <Chart options={chartConfig.options} series={chartConfig.series} type={type} height="340" />
        </div>
    );
}

export default Charts;
