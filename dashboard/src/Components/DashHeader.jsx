import { Avatar, Card, CardContent, InputAdornment, TextField, Toolbar, Typography } from '@mui/material'
import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';

function DashHeader() {
  return (
    <section>
        <Toolbar sx={{ display: 'flex' }}>
          <Typography className='dash-title' variant="h6" style={{ flex: 3 }}>
            Hello, Admin
          </Typography>
          <Card sx={{ padding: '7px', flex: 1, borderRadius: '20px' }} elevation={0}>
            <CardContent sx={{ padding: '0!important', display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                placeholder="Search"
                variant="outlined"
                size="small"
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
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <NotificationsIcon sx={{ cursor: 'pointer' }} />
                <InfoIcon sx={{ cursor: 'pointer' }} />
                <Avatar alt="Remy Sharp" src='' sx={{ width: 25, height: 25, cursor: 'pointer' }} />
              </div>
            </CardContent>
          </Card>
        </Toolbar>
      </section>
  )
}

export default DashHeader