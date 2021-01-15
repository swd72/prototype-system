import React, { useState, useContext, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Switch, Route, Redirect } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
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
import { useSelector } from "react-redux";
import { route } from "../route";
import { deepPurple } from "@material-ui/core/colors";
import LoadingBar from "react-top-loading-bar";
import { StateContext } from "./StateProvider";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Container } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";

const drawerWidth = 230;

const useStyles = (props) =>
  makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("md")]:
        props.layout_type === "side"
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
      [theme.breakpoints.up("md")]:
        props.layout_type === "side"
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
      width: "100%",
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
      marginTop:5,
      marginLeft: 25,
      marginRight: 15
    }
  }));

function ResponsiveDrawer(props) {
  const { window, layout_type } = props;

  const classes = useStyles(props)();
  const history = useHistory();
  // const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const anchorRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const barMenuOpen = Boolean(anchorEl);
  const [sidemenu] = useState(route);
  const token = useSelector((state) => state.token);
  const matches_sm = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const { progress } = useContext(StateContext);

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
    }
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getRoutes = (routes) => {
    // eslint-disable-next-line
    return routes.map((prop, key) => {
      if (
        prop.role === null ||
        token?.user?.userType?.indexOf(prop.role) >= 0
      ) {
        return (
          <Route
            exact
            path={"/" + layout_type + prop.router}
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
            (val.role === null ||
              token?.user?.userType?.indexOf(val.role) >= 0) &&
            (localStorage.getItem("token")
              ? val.router !== "/login"
              : val.router !== "/logout") && (
              <ListItem
                button
                className={classes.listItem}
                key={val.title}
                onClick={() => {
                  history.push("/" + layout_type + val.router);
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
            {token?.user?.fname?.charAt(0)?.toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        {token?.user && (
          <ListItemText
            primary={token?.user?.fname + "  " + token?.user?.lname}
            secondary={token?.user?.username}
          />
        )}
        {!token?.user && (
          <ListItemText
            primary={"Guest"}
            secondary={"กรุณาเข้าสู่ระบบเพื่อใช้งาน"}
          />
        )}
      </ListItem>
      {list("left")}
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
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
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
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
                              <Typography variant="body1">
                                Message
                              </Typography>
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

            {token?.user && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={barMenuOpen}
                onClose={handleClose}
              >
                <MenuItem onClick={() => history.push("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => history.push("/logout")}>
                  ออกจากระบบ
                </MenuItem>
              </Menu>
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

        {layout_type === "side" && (
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
        <Switch>
          {getRoutes(route)}
          <Redirect from="*" to={"/" + layout_type + "/index"} />
        </Switch>
      </Container>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
