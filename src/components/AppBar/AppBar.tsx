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
import { selectIsAuth } from "../../store/selectors";
import { useDispatch } from "react-redux";
import { logoutTC } from "../../store/thunks/index";

export const TodoAppBar = () => {
  const status = useAppSelector((state) => state.app.status);
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useDispatch();

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
            <Button color="inherit" onClick={logoutHandler}>
              Logout
            </Button>
          )}
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
    </div>
  );
};
