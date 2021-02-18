import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Switch, Route } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles /*useTheme*/ } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
// import { useSelector } from "react-redux";
import { route } from "../route";
import { deepPurple } from "@material-ui/core/colors";
import LoadingBar from "react-top-loading-bar";
import { StateContext } from "./StateProvider";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
// import NotificationsIcon from "@material-ui/icons/Notifications";
import FastForwardIcon from "@material-ui/icons/FastForward";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import { Container } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { AuthContext } from "./AuthProvider";
import { IoIosFingerPrint } from "react-icons/io";

const drawerWidth = 230;

const useStyles = (props) =>
  makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("md")]: props.side_status
        ? {
            width: drawerWidth,
            flexShrink: 0,
          }
        : {},
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: props.side_status
        ? {
            display: "none",
          }
        : {},
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      minWidth: 200,
      maxWidth: 1900,
      padding: theme.spacing(3),
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[300]),
      backgroundColor: deepPurple[300],
    },
    listItem: {
      paddingTop: 5,
      paddingBottom: 5,
    },
    listItemText: {
      fontSize: 20,
      fontWeight: "bold !important",
      textAlign: "center",
    },
    listItemTextFirst: {
      backgroundColor: "red",
    },
    popper: {
      marginTop: 5,
      marginLeft: 25,
      marginRight: 15,
    },
  }));

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [sidemenu] = useState(route);

  const history = useHistory();
  const anchorRef = useRef(null);
  const anchorRefAccount = useRef(null);

  const matches_sm = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const { progress, styleMode, toggleStyle } = useContext(StateContext);
  const { cookies, logout, user, setCookie } = useContext(
    AuthContext
  );

  const [side_status, setside_status] = useState(true);
  const classes = useStyles({ side_status: side_status })();

  useEffect(() => {
    setside_status(cookies.side_status === "true" ? true : false);
  }, [cookies, user]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleToggle = () => {
    setOpenMessage((prevOpen) => !prevOpen);
  };

  const handleCloseMessage = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenMessage(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenMessage(false);
      setOpenMessage(false);
    }
  }

  const handleMenu = () => {
    setOpenAccount((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (
      anchorRefAccount.current &&
      anchorRefAccount.current.contains(event.target)
    ) {
      return;
    }

    setOpenAccount(false);
  };

  const getRoutes = (routes) => {
    // eslint-disable-next-line
    return routes.map((prop, key) => {
      if (prop.role === null || user?.userType?.indexOf(prop.role) >= 0) {
        return (
          <Route
            exact
            path={"/manage" + prop.router}
            component={prop.component}
            key={key}
          />
        );
      }
    });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <Divider />
      <List>
        {sidemenu.map(
          (val, index) =>
            (val.role === null || user?.userType?.indexOf(val.role) >= 0) &&
            (user?.username
              ? val.router !== "/login"
              : val.router !== "/logout") && (
              <ListItem
                button
                className={classes.listItem}
                key={val.title}
                onClick={() => {
                  history.push("/manage" + val.router);
                  setMobileOpen(false);
                }}
              >
                <ListItemIcon>{val.icon}</ListItemIcon>
                <ListItemText primary={val.title} />
              </ListItem>
            )
        )}
      </List>
      <Divider />
    </div>
  );

  const drawerListItem = (
    <>
      {matches_sm && <Toolbar variant="dense" />}
      <ListItem button>
        <ListItemAvatar style={{ margin: -8 }}>
          <Avatar className={classes.purple}>
            {user?.fname?.charAt(0)?.toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        {user && (
          <ListItemText
            primary={user?.fname + "  " + user?.lname}
            secondary={user?.username}
          />
        )}
        {!user && (
          <ListItemText
            primary={"Guest"}
            secondary={"กรุณาเข้าสู่ระบบเพื่อใช้งาน"}
          />
        )}
      </ListItem>
      {list("left")}

      {!user && (
        <>
          <List>
            <ListItem
              button
              className={classes.listItem}
              onClick={() => {
                history.push("/sigin");
                setMobileOpen(false);
              }}
            >
              <ListItemIcon>
                <IoIosFingerPrint size={30} />
              </ListItemIcon>
              <ListItemText primary={"เข้าสู่ระบบ"} />
            </ListItem>
          </List>
          <Divider />
        </>
      )}
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar
          variant="dense"
          style={
            styleMode === "dark"
              ? {
                  backgroundColor: "#424242",
                  borderBottom: "85888C 1px",
                  color: "#FFFFFF",
                }
              : {}
          }
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Hidden smDown implementation="css">
            <IconButton
              onClick={() => {
                setside_status((p) => !p);
                setCookie("side_status", !side_status, { path: "/" });
              }}
              color="inherit"
            >
              <Badge color="secondary">
                {side_status ? <FastRewindIcon /> : <FastForwardIcon />}
              </Badge>
            </IconButton>
          </Hidden>
          <Typography variant="h6" noWrap>
            Res
          </Typography>

          <div className={classes.grow} />
          <div>
            <IconButton
              ref={anchorRef}
              aria-controls={openMessage ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              color="inherit"
            >
              <Badge badgeContent={4} color="secondary">
                <MailIcon /> {/*NotificationsIcon Message*/}
              </Badge>
            </IconButton>
            <Popper
              open={openMessage}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
              className={classes.popper}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseMessage}>
                      <List id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <ListItem alignItems="flex-start">
                          <ListItemText
                            className="text-center"
                            primary={
                              <Typography variant="body1">Message</Typography>
                            }
                          />
                        </ListItem>
                        <Divider />
                        <ListItem alignItems="flex-start" button>
                          <ListItemText
                            primary="Oui Oui"
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                                >
                                  Sandra Adams
                                </Typography>
                                {
                                  " — Do you have Paris recommendations? Have you ever…"
                                }
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                        <Divider />
                        <ListItem alignItems="flex-start" button>
                          <ListItemText
                            primary="Oui Oui"
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                                >
                                  Sandra Adams
                                </Typography>
                                {
                                  " — Do you have Paris recommendations? Have you ever…"
                                }
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      </List>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>

            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon /> 
              </Badge>
            </IconButton> */}

            <IconButton
              aria-label="mode "
              color="inherit"
              onClick={toggleStyle}
            >
              {styleMode === "light" ? (
                <Brightness4Icon />
              ) : (
                <BrightnessHighIcon />
              )}
            </IconButton>

            {user?.username && (
              <>
                <IconButton
                  ref={anchorRefAccount}
                  aria-controls={openAccount ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle /> {/*User Account Menu*/}
                </IconButton>

                <Popper
                  open={openAccount}
                  anchorEl={anchorRefAccount.current}
                  role={undefined}
                  transition
                  disablePortal
                  className={classes.popper}
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <List
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown}
                          >
                            <ListItem
                              alignItems="flex-start"
                              button
                              onClick={() => history.push("/profile")}
                            >
                              <ListItemText primary="Profile" />
                            </ListItem>
                            <Divider />
                            <ListItem
                              alignItems="flex-start"
                              button
                              onClick={() => {
                                logout();
                                setOpenAccount(false);
                              }}
                            >
                              <ListItemText primary="ออกจากระบบ" />
                            </ListItem>
                          </List>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={"left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawerListItem}
          </Drawer>
        </Hidden>

        {side_status && (
          <Hidden smDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawerListItem}
            </Drawer>
          </Hidden>
        )}
      </nav>
      <Container className={classes.content}>
        <Toolbar variant="dense" />
        <LoadingBar progress={progress} />
        <Switch>{getRoutes(route)}</Switch>
      </Container>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
