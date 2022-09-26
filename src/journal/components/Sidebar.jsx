import { TurnedInNot } from "@mui/icons-material"
import { Drawer, Box, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid } from "@mui/material"
import { useSelector } from "react-redux";

export const Sidebar = ({ drawerWidth }) => {

  const { displayName } = useSelector(state => state.auth);


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
            ['Enero', 'Febrero', 'Marzo'].map(text => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <Grid container>
                    <ListItemText primary={text} />
                    <ListItemText secondary={'Lorem ipsum Lorem ipsum Lorem ipsum'} />
                  </Grid>
                </ListItemButton>

              </ListItem>
            ))
          }
        </List>

      </Drawer>

    </Box >
  )
}
