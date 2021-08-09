import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// import Box from '@material-ui/core/Box';
// import Container from '@material-ui/core/Container';

import logo from "../../assets/logo.svg";

import React from "react";
import { Button } from "@material-ui/core";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
  },
  menu: {
    backgroundColor: theme.palette.common.arcBlue,
    color: "white",
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

export default function Header(props) {
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const i0S = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuUtemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };

  const menuOptions = [
    { name: "Services", link: "/services" },
    { name: "Custom Software Development", link: "/customsoftware" },
    { name: "Mobile apps", link: "/mobileapps" },
    { name: "Website Development", link: "/websites" },
  ];
  useEffect(() => {
    // make sure values are set correctly
    // vis a vis url path. The value control
    // the highlights on nav menu
    switch (window.location.pathname) {
      case "/": {
        if (value !== 0) {
          setValue(0);
        }
        break;
      }
      case "/services": {
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(0);
        }
        break;
      }
      case "/customsoftware": {
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(1);
        }
        break;
      }
      case "/mobileapps": {
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(2);
        }
        break;
      }
      case "/websites": {
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(3);
        }
        break;
      }
      case "/revolution": {
        if (value !== 2) {
          setValue(2);
        }
        break;
      }
      case "/about": {
        if (value !== 3) {
          setValue(3);
        }
        break;
      }
      case "/contact": {
        if (value !== 4) {
          setValue(4);
        }
        break;
      }
      case "/estimate": {
        if (value !== 5) {
          setValue(5);
        }
        break;
      }
      default:
        break;
    }
  }, [value]);

  // drawer jsx element. A swipeable drawer with button that appears 
  // at certain screen widths
  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!i0S}
        disableDiscovery={i0S}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        example drawer
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );
  // tabs jsx element - appears at larger screen widths
  const tabs = (
    <React.Fragment>
      <Tabs
        value={value}
        className={classes.tabContainer}
        onChange={handleChange}
        indicatorColor="primary"
      >
        <Tab className={classes.tab} label="Home" component={Link} to="/" />
        <Tab
          onClick={(event) => handleClick(event)}
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup={anchorEl ? "true" : undefined}
          className={classes.tab}
          label="Services"
          component={Link}
          to="/services"
        />
        <Tab
          className={classes.tab}
          label="The Revolution"
          component={Link}
          to="/revolution"
        />
        <Tab
          className={classes.tab}
          label="About Us"
          component={Link}
          to="/about"
        />
        <Tab
          className={classes.tab}
          label="Contact us"
          component={Link}
          to="/contact"
        />
      </Tabs>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        component={Link}
        to="/estimate"
      >
        Free estimate
      </Button>
      <Menu
        elevation={0}
        classes={{ paper: classes.menu }}
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        handleClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
      >
        {/* using an anon function so we can call two onClick functions */}
        {/* map through menuOptions */}
        {menuOptions.map((option, i) => (
          <MenuItem
            key={option}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            onClick={(event) => {
              handleMenuUtemClick(event, i);
              setValue(1);
              handleClose();
            }}
            selected={i == selectedIndex && value == 1}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar position="fixed" color="primary">
          <Toolbar disableGutters>
            {/* setvalue to 0 to ensure that active tab is returned to Home and disableRipple*/}
            <Button
              component={Link}
              to="/"
              className={classes.logoContainer}
              disableRipple
              onClick={() => setValue(0)}
            >
              <img src={logo} alt="logo" className={classes.logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
