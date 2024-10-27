import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const routes = [
  { 
    path: '/',
    icon: <HomeIcon />,
    label: 'Dashboard',
  },
  {
    path: '/analytics',
    icon: <BarChartIcon />,
    label: 'Analytics',
  },
  {
    path: '/settings',
    icon: <SettingsIcon />,
    label: 'Settings',
  }
];

function SideBar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar sx={{ marginTop: '1rem' }}>
        <Typography className="dash-title" variant="h6" noWrap>
          Car Dashboard
        </Typography>
      </Toolbar>
      <List>
        {routes.map((route) => (
          <ListItem
            button
            component={NavLink}
            to={route.path}
            key={route.label}
            sx={{
              '&.active': {
                // borderRight: '5px solid #1976d2',
                backgroundColor: '#e3f2fd',
                '& .MuiListItemIcon-root': {
                  color: '#1976d2',
                },
                '& .MuiListItemText-primary': {
                  color: '#1976d2',
                },
              },
            }}
          >
            <ListItemIcon>
              {route.icon}
            </ListItemIcon>
            <ListItemText className="side-icon-text" primary={route.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;