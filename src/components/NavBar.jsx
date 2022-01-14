import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./css/NavBar.css";
import { UserContext } from "../contexts/User/User";
import { getUsers } from "./utils/api";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Modal,
  Paper,
  TextField,
} from "@mui/material";

const NavBar = () => {
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState("");
  const { user, userLogin, userLogout } = useContext(UserContext);

  const handleClick = () => {
    setDrawer(true);
  };

  const handleClose = () => {
    setDrawer(false);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleLogin = () => {
    setDrawer(false);
    setModal(true);
  };

  const handleLogout = () => {
    setDrawer(false);
    userLogout();
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = () => {
    setModal(true);
    getUsers().then((data) => {
      const validUsers = data.usernames.map((values) => values.username);
      if (validUsers.includes(username)) {
        userLogin(username);
        setUsername("");
        setModal(false);
        setIsError(false);
      } else {
        setIsError(true);
        setUsername("");
      }
    });
  };

  return (
    <div className="NavBar">
      <h1>nc-games</h1>
      <p>{user !== "" ? `Welcome ${user}!` : "Please login!"}</p>
      <Button onClick={handleClick}>
        <MenuIcon style={{ color: "black" }} />
      </Button>
      <Drawer anchor="right" open={drawer} onClose={handleClose}>
        <Box sx={{ width: 200 }}>
          <List>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <ListItem button onClick={handleClose}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
              </ListItem>
            </Link>
            {user !== "" ? (
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </ListItem>
            ) : (
              <ListItem button onClick={handleLogin}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText>Login</ListItemText>
              </ListItem>
            )}
            <Divider />
          </List>
        </Box>
      </Drawer>
      <Modal open={modal} onClose={handleCloseModal} className="modal">
        <Paper className="paper-container login">
          <h2>Welcome to nc-games!</h2>
          <h3>Please login...</h3>
          <TextField
            error={isError}
            label={isError ? "Error" : "Username"}
            helperText={isError ? "Incorrect entry." : " "}
            variant="standard"
            value={username}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ margin: "10px" }}
          >
            LOGIN
          </Button>
        </Paper>
      </Modal>
    </div>
  );
};

export default NavBar;
