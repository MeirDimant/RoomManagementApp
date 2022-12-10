import React from "react";
import { login } from "../API/LoginAndRegister.js";
import { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";

export default function Login({ onLoginSuccessful }) {
  const [alert, setAlert] = useState(undefined);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
      const loginResult = await login(userName, password);
      if (loginResult.data) {
        const { user, jwt } = loginResult.data;
        // Save user IDs on local storage
        localStorage.setItem("name", user.username);
        localStorage.setItem("token", jwt);
        onLoginSuccessful();
      } else {
        showAlert({ message: loginResult });
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
