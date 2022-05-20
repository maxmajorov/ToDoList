import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";

export const ReactReduxProviderDecorator = (story: any) => {
  return <Provider store={store}>{story()}</Provider>;
};
