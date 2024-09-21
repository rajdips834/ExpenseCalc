import React from "react";
import { Paper, TextField, Button, Typography } from "@mui/material";
import { Grid2 } from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EMAILSIGNIN } from "../../firebase/index";
import { useDispatch, useSelector } from "react-redux";
import { use } from "framer-motion/client";
import { login } from "../../redux/slices/authSlice";
import { fetchExpenses } from "../../utils/fetchSessionData";
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const EmailAuth = () => {
    console.log(email, password);
    if (email.length > 0 && password.length > 0) {
      toast
        .promise(EMAILSIGNIN(email, password), {
          pending: "Signing in...",
          success: "Signin successful: WELCOME!",
          error: "Error signing account, Please try again🤗",
        })
        .then((userData) => {
          dispatch(login(email));
          localStorage.setItem("user", JSON.stringify(email));
          localStorage.setItem("isLoggedIn", true);
          navigate("/dashboard");
          fetchExpenses(dispatch);
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage, { autoClose: 15000 });
        });
    } else {
      toast.warn("Please fill all the fields", { autoClose: 15000 });
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
      <Grid2 xs={12}>
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

          <TextField
            label="Email"
            placeholder="Enter email"
            fullWidth
            required
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="password"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={{ marginTop: 20 }}
            onClick={EmailAuth}
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
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default LoginPage;
