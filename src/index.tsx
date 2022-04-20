import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./store/redux-store";

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};

store.subscribe(render);

render();
serviceWorker.unregister();
