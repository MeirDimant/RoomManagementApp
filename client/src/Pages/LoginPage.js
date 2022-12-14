import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../API/LoginAndRegister.js";
import { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useAuthContext } from "../Contexts/AuthContext";

export default function Login({ onLoginSuccessful }) {
  const [alert, setAlert] = useState(undefined);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setIsAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert(undefined);
    }, 5000);
  };

  const onUserNameChange = (event) => setUserName(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (userName && password) {
      setIsAuthenticated(null);
      const { user, jwt, message } = await login(userName, password);
      if (user && jwt) {
        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem("token", jwt);
        navigate("/", { replace: true });
      } else {
        showAlert({ message });
        setIsAuthenticated(false);
      }
    } else {
      return;
    }
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          width: 300,
          m: "auto",
          mt: "10%",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography
          sx={{ mb: 2, textDecoration: "underline" }}
          variant="h5"
          component="div"
        >
          Login
        </Typography>
        <TextField
          id="outlined-username-input"
          label="User Name"
          type="text"
          inputProps={{
            form: {
              autocomplete: "off",
            },
          }}
          onChange={onUserNameChange}
          value={userName}
          required={true}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={onPasswordChange}
          value={password}
          required={true}
        />
        <Typography component="div">
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className="form__custom-button"
            onClick={onSubmit}
          >
            Log in
          </Button>
        </Typography>
        {alert && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {alert.message}
          </Alert>
        )}
      </Box>
    </div>
  );
}
