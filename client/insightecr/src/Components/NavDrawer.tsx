import * as React from 'react';
import {Box, Drawer, IconButton, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, useTheme, CssBaseline, Toolbar, Typography, Grid, Paper, Container} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AssessmentIcon from '@mui/icons-material/Assessment';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import PublicIcon from '@mui/icons-material/Public';
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';
import DescriptionIcon from '@mui/icons-material/Description';
import EmailIcon from '@mui/icons-material/Email';
import BasicPie from './PieChart';
import Header from './Header';
import BasicStacking from './BarChart';




// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: '#E8E8FD',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     // margin:0,
//   }));

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface NavItem {
    text: string;
    icon: React.ReactNode;
  }
const toolsItems: NavItem[] = [
    { text: 'Alert', icon: <EditNotificationsIcon /> },
    { text: 'Documentation', icon: <DescriptionIcon /> },
    { text: 'Contact Us', icon: <EmailIcon /> },
  ];



export default function NavDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" textAlign={'center'} >
            InSightECR
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <List>
          <h4>Dashboard</h4>
          {['Stats', 'Trends'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ?  <QueryStatsIcon /> : <AssessmentIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <h4>AWS</h4>
          {['Repository1', 'Repository2'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {<PublicIcon /> }
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <h4>Tools</h4>
          {toolsItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Main open={open}>
      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }} >
            <Grid container spacing={3} >
              <Grid item xs={12} md={5} lg={6} >
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 360,
                    textAlign: 'center'
                  }}
                >
                  <Header title={'Vulnerability Summary'}/>
                  <BasicPie/>
                </Paper>
              </Grid>
              <Grid item xs={12} md={7} lg={6}>
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 360,
                    textAlign: 'center'
                  }}
                >
                  <Header title={'Severity Breakdown'}/>
                  <BasicStacking/>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 0, display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                <Header title={'Vulnerability Details'}/>
                </Paper>
              </Grid>
            </Grid>
          </Container>
      </Main>
    </Box>
  );
}
