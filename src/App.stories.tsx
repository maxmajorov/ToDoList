import React from "react";
import { ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { App } from "./App";
import { ReactReduxProviderDecorator } from "./stories/ReduxStoreProviderDecorator";

export default {
  title: "TodoList/App",
  component: App,
  decorators: [ReactReduxProviderDecorator], // все компоненты будут продекорированы
} as ComponentMeta<typeof App>;

export const AppStory = () => {
  return <App />;
};

// const Template: ComponentStory<typeof App> = () => <App />;

// export const App = Template.bind({});

// AddItemFormStory.args = {
//   addItem: action("Button inside form clicked"),
// };

// export const AddItemFormTest = () => {
//   return <AddItemForm addItem={(title: string) => alert(title)} />;
// };
