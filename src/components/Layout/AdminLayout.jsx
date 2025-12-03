import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AdminLayout = ({ children }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Box className="min-h-screen bg-gray-100 flex flex-col">
      <AppBar position="static">
        <Toolbar className="flex justify-between">
          <Typography variant="h6" component="div">
            CMS Admin
          </Typography>
          <Box className="flex items-center gap-4">
            <Button component={Link} to="/dashboard" color="inherit">
              Dashboard
            </Button>
            <Button component={Link} to="/posts" color="inherit">
              Posts
            </Button>
            <Button component={Link} to="/pages" color="inherit">
              Pages
            </Button>
            {user && (
              <Typography variant="body2">
                {user.name || user.email}
              </Typography>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container className="flex-1 py-6">
        {children}
      </Container>
    </Box>
  );
};

export default AdminLayout;
