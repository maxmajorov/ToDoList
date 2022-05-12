import React from "react";
import classes from "./AppBar.module.css";
import {
  Button,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

export const TodoAppBar = () => {
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.time}>
            {new Date().toLocaleString()}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
