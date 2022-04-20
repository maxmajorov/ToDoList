import React from "react";
import { store } from "./redux/redux-store";

export const StoreContext = React.createContext(store);

export const Provider = (props: any) => {
  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};
