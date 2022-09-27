import { TurnedInNot } from "@mui/icons-material"
import { Drawer, Box, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid } from "@mui/material"
import { useSelector } from "react-redux";
import { SideBarItem } from "./SideBarItem";

export const Sidebar = ({ drawerWidth }) => {

  const { displayName } = useSelector(state => state.auth);
  const { notes } = useSelector(state => state.journal);


  // console.log(notes);

  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent" // temporary
        open={true}
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component='div'>
            {displayName}
          </Typography>
        </Toolbar>

        <Divider />

        <List>
          {
            notes.map(note => (
              <SideBarItem key={note.id} {...note} />
            ))
          }
        </List>

      </Drawer>

    </Box >
  )
}
