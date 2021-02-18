import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    cursor: "pointer"
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

export default function BreadcrumbsComponent({ objLink, current }) {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = (event, path) => {
    event.preventDefault();
    history.push(path);
  };
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {objLink.map((val, idx) => (
        <Link
          color="inherit"
          key={`link${idx}`}
          onClick={(e) => handleClick(e, val.path)}
          className={classes.link}
        >
          {val.icon}
          {val.label}
        </Link>
      ))}

      <Typography color="textPrimary" className={classes.link}>
        {current.icon}
        {current.label}
      </Typography>
    </Breadcrumbs>
  );
}

BreadcrumbsComponent.defaultProps = {
  objLink: [],
};
