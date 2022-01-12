import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/NavBar.css";
// MUI STUFF
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
// END OF MUI STUFF

const NavBar = () => {
  const [drawer, setDrawer] = useState(false);

  const handleClick = () => {
    setDrawer(true);
  };

  const handleClose = () => {
    setDrawer(false);
  };

  return (
    <div className="NavBar">
      <div className="vCenter">
        <h1>nc-games</h1>
      </div>
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
            <Divider />
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default NavBar;
