import React from "react";
import { Paper, TextField, Button, Typography } from "@mui/material";
import { Grid2 } from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EMAILSIGNIN } from "../../firebase/index";
import { useStateValue } from "../../context/StateProvider";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = ({ obj }) => {
    console.log("dispatch");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = "rajdips834";

  const EmailAuth = () => {
    if (!user) {
      if (email.length > 0 && password.length > 0) {
        toast
          .promise(EMAILSIGNIN(email, password), {
            pending: "Signing in...",
            success: "Signin successful: WELCOME!",
            error: "Error signing account, Please try again🤗",
          })
          .then((userData) => {
            const user = {
              providerId: "password",
              uid: email,
              displayName: null,
              email: email,
              phoneNumber: null,
            };
            dispatch({
              type: "SET_USER",
              user: user,
            });
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/");
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage, { autoClose: 15000 });
          });
      } else {
        toast.warn("Please fill all the fields", { autoClose: 15000 });
      }
    }
  };

  return (
    <Grid2
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid2 item xs={12}>
        <Paper
          elevation={10}
          style={{
            padding: 20,
            height: "auto",
            width: 280,
            margin: "20px auto",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={EmailAuth}>
            <TextField
              label="Email"
              placeholder="Enter email"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              fullWidth
              required
              margin="normal"
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              style={{ marginTop: 20 }}
            >
              Login
            </Button>
            <Typography
              variant="body2"
              align="center"
              gutterBottom
              style={{ marginTop: 20 }}
            >
              New here?
            </Typography>
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              fullWidth
              onClick={() => navigate("/signup")}
              style={{ marginTop: 20 }}
            >
              Register
            </Button>
          </form>
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default LoginPage;
