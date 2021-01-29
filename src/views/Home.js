import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <div className="App">
      <Grid container align="center" className={classes.root} spacing={2}>
        <Container maxWidth="sm">Home สว่างแดนดิน</Container>
      </Grid>
    </div>
  );
}

export default Home;
