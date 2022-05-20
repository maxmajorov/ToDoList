import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AddItemForm } from "./AddItemForm";

export default {
  title: "TodoList/AddItemForm",
  component: AddItemForm,
  argTypes: {
    onClick: {
      description: "Button inside block clicked",
    },
  },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => (
  <AddItemForm {...args} />
);

export const AddItemFormStory = Template.bind({});

AddItemFormStory.args = {
  addItem: action("Button inside form clicked"),
};

export const AddItemFormTest = () => {
  return <AddItemForm addItem={(title: string) => alert(title)} />;
};
