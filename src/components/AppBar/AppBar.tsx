import React from "react";
import {
  AppBar,
  Button,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import classes from "./AppBar.module.css";
import { MiscellaneousServicesOutlined } from "@mui/icons-material";
import { useAppSelector } from "../../store/store";

export const TodoAppBar = () => {
  const status = useAppSelector((state) => state.app.status);
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
            <MiscellaneousServicesOutlined />
          </IconButton>
          <Typography variant="h6" className={classes.time}>
            {new Date().toLocaleString()}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
    </div>
  );
};
