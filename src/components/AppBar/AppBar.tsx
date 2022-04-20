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
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
