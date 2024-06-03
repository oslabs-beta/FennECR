import * as React from "react";
import { styled, Typography, Toolbar, IconButton } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open: boolean;
  toggleDrawer: () => void;
  darkMode: boolean;
  handleThemeChange: () => void;
}

const AppBarStyle = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: "#D1D0FB",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBar: React.FC<AppBarProps> = ({
  open,
  toggleDrawer,
  darkMode,
  handleThemeChange,
}) => {
  return (
    <AppBarStyle position="absolute" open={open} elevation={1}>
      <Toolbar sx={{ pr: "24px" ,    background: darkMode ? '#292929' : '#E8DEF8',
}}>
        <IconButton
          edge="start"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{ marginRight: "36px", ...(open && { display: "none" }),color:darkMode ? '#EADDFF' :'#21005D' }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color={darkMode ? "#EADDFF" : "#21005D"}
          noWrap
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          InSightECR
        </Typography>
        <IconButton
          edge="end"
          sx={{ color: darkMode ? "#EADDFF" : "#21005D" }}
          aria-label="toggle dark mode"
          onClick={handleThemeChange}
        >
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBarStyle>
  );
};

export default AppBar;
