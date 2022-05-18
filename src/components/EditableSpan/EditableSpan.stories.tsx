import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { EditableSpan } from "./EditableSpan";

export default {
  title: "TodoList/EditableSpan",
  component: EditableSpan,
  argTypes: {
    onChange: {
      description: "Value Editable span changed",
    },
    value: {
      defaultValue: "JavaScript",
      description: "Start span value",
    },
  },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => (
  <EditableSpan {...args} />
);

export const changeTextStory = Template.bind({});

changeTextStory.args = {
  onChange: action("Value Editable span changed"),
};
