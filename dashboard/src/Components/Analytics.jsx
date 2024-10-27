import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box, Card, CardContent, InputAdornment, TextField, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const columns = [
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'vin', headerName: 'VIN', width: 130 },
  { field: 'county', headerName: 'County', width: 110 },
  { field: 'city', headerName: 'City', width: 110 },
  { field: 'state', headerName: 'State', width: 70 },
  { field: 'modelYear', headerName: 'Model Year', width: 90 },
  { field: 'make', headerName: 'Make', width: 120 },
  { field: 'model', headerName: 'Model', width: 100 },
  { field: 'electricRange', headerName: 'Electric Range', type: 'number', width: 120 },
  { field: 'electricUtility', headerName: 'Electric Utility', width: 250 },
  {
    field: 'cafvEligibility',
    headerName: 'CAFV Eligibility',
    width: 200,
  },
];

const paginationModel = { page: 0, pageSize: 10 };

function Analytics({ data }) {
  const [rows, setRows] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    const transformedData = data.map((item, index) => ({
      id: index + 1,
      vin: item['VIN (1-10)'],
      county: item.County,
      city: item.City,
      state: item.State,
      modelYear: item['Model Year'],
      make: item.Make,
      model: item.Model,
      electricRange: item['Electric Range'],
      electricUtility: item['Electric Utility'],
    }));
    setRows(transformedData);
  }, [data]);

  // Filter rows based on search query
  const filteredRows = rows.filter(row => {
    return (
      (row.vin && row.vin.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (row.county && row.county.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (row.city && row.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (row.state && row.state.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (row.modelYear && row.modelYear.toString().includes(searchQuery)) ||
      (row.make && row.make.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (row.model && row.model.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div style={{ padding: '1rem', marginLeft: 240 }}>
      <Box>
        <Toolbar sx={{ display: 'flex' }}>
          <Typography className='dash-title' variant="h6" style={{ flex: 5 }}>
            Data Analytics
          </Typography>
          <Card sx={{ padding: '7px', flex: 1, borderRadius: '20px' }} elevation={0}>
            <CardContent sx={{ padding: '0!important', display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                placeholder="Search"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  sx: {
                    border: 'none',
                    backgroundColor: '#EFF4FB',
                    borderRadius: '10px',
                    height: '30px',
                    width: '12rem',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Toolbar>
        <Paper sx={{ height: '90vh', width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20, 50]}
            checkboxSelection
            disableSelectionOnClick
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
    </div>
  );
}

export default Analytics;