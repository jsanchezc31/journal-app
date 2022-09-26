import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import React from 'react'
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';


const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      {/* Navbar */}
      <Navbar drawerWidth={drawerWidth} />

      {/* SideBar */}
      <Sidebar drawerWidth={drawerWidth} />


      <Box
        compoment='main'
        sx={{ flexGrow: 1, p: 3 }}
      >
        {/* Toolbar */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
