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
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  appInitializeSelector,
  appStatusSelector,
} from "../../store/reducers/app-reducer";
import { logoutTC } from "../../store/reducers/auth-reducer";

export const TodoAppBar = () => {
  const status = useAppSelector(appStatusSelector);
  const isAuth = useAppSelector(appInitializeSelector);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logoutTC());
  };

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
          {!isAuth ? (
            <Button color="inherit">Login</Button>
          ) : (
            <Button
              color="inherit"
              onClick={logoutHandler}
              // style={{ textTransform: "lowercase" }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
    </div>
  );
};
