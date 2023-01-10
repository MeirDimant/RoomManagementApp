import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const pages = [
  { name: "Main Page", path: "/" },
  { name: "Orders", path: "/calendar" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setUser, user } =
    useAuthContext();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleNuvBtn = (path) => {
    setAnchorElNav(null);
    navigate(path, { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(undefined);
    setIsAuthenticated(false);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {isAuthenticated &&
                pages.map((page, index) => (
                  <MenuItem key={index} onClick={() => handleNuvBtn(page.path)}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {isAuthenticated &&
              pages.map((page, index) => (
                <Button
                  key={index}
                  onClick={() => handleNuvBtn(page.path)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {isAuthenticated ? (
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button color="inherit" onClick={() => handleNuvBtn("/")}>Register</Button>
              )}
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
