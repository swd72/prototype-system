import React, { useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://www.sawanghospital.com/">
        sawanghospital
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const { errors, handleSubmit, register } = useForm({});
  const { login, cookies, server_url, setCookie, history } = useContext(
    AuthContext
  );

  useEffect(() => {
    axios
      .post(
        `${server_url}/auth/refresh-token`,
        {
          refreshToken: cookies["-token-"],
        },
        {
          headers: { authorization: cookies["token"] },
        }
      )
      .then((rs) => {
        if (rs.status === 200) {
          setCookie("token", rs.data.accessToken, { path: "/" });
          history.push("/");
        } else if (rs.status === 204) {
          console.log(rs.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function onSubmit(values) {
    login(values?.username, values?.password);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          เข้าสู่ระบบ
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <TextField
            inputRef={register({ required: true })}
            defaultValue=""
            variant="outlined"
            margin="normal"
            error={errors?.username ? true : false}
            helperText={
              errors?.username?.type === "required" ? "กรุณากรอกข้อมูล" : ""
            }
            fullWidth
            id="username"
            label="ชื่อผู้ใช้"
            name="username"
            autoComplete="username"
            autoFocus
          />

          <TextField
            inputRef={register({ required: true })}
            defaultValue=""
            error={errors?.password ? true : false}
            helperText={
              errors?.password?.type === "required" ? "กรุณากรอกข้อมูล" : ""
            }
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="รหัสผ่าน"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            เข้าสู่ระบบ
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
