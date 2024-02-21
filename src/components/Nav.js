import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../App";
import { Popover, Modal } from "antd";
import { useState } from "react";

const content = (
  <div>
    <p>from the developers desk</p>
  </div>
);

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { authToken } = React.useContext(Authcontext);
  let navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
    window.location.reload();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <AppBar
        position="fixed"
        style={{
          height: "55px",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters style={{ marginBottom: "5px" }}>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

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
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={() => (navigate("/"), handleCloseNavMenu())}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => (navigate("/about"), handleCloseNavMenu())}
                >
                  <Typography textAlign="center">About</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => (
                    window.open("https://memoadminpanel.web.app/", "_blank"),
                    handleCloseNavMenu()
                  )}
                >
                  <Typography textAlign="center">AdminPanel</Typography>
                </MenuItem>
                {authToken ? (
                  <MenuItem onClick={() => (handleCloseNavMenu(), showModal())}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                ) : null}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
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
              Memosphere
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={() => navigate("/")}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
                }}
              >
                Home
              </Button>
              <Popover
                content={content}
                title="about memosphere"
                style={{ backgroundColor: "red" }}
              >
                <Button
                  onClick={() => navigate("/about")}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
                  }}
                >
                  About
                </Button>
              </Popover>
              <Popover
                content="manage users here"
                title="Already an admin?"
                style={{ backgroundColor: "red" }}
              >
                <Button
                  onClick={() =>
                    window.open("https://memoadminpanel.web.app/", "_blank")
                  }
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
                  }}
                >
                  AdminPanel
                </Button>
              </Popover>
              {authToken ? (
                <Button
                  onClick={() => navigate("/user")}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
                  }}
                >
                  Notes
                </Button>
              ) : null}
              {authToken ? (
                <Button
                  onClick={() => showModal()}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
                  }}
                >
                  Logout
                </Button>
              ) : null}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Modal
        title=""
        style={{ borderTopLeftRadius: "20px" }}
        open={isModalOpen}
        onOk={() => handleLogout()}
        onCancel={handleCancel}
      >
        <Typography fontSize={20}>Logout now?</Typography>
      </Modal>
    </>
  );
}
export default ResponsiveAppBar;
