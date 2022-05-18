import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ListItems } from "./ListItems";
import { todoListID_1 } from "../../reducers/todoList-reducer";
import { v1 } from "uuid";

export default {
  title: "TodoList/ListItems",
  component: ListItems,
} as ComponentMeta<typeof ListItems>;

const onChangeTextTaskCallback = action("Change task text");
const onChangeTaskStatusCallback = action("Change task status");
const removeTaskItemCallback = action("Remove task");

const Template: ComponentStory<typeof ListItems> = (args) => (
  <ListItems {...args} />
);

const baseArg = {
  changeTaskText: onChangeTextTaskCallback,
  changeTaskStatus: onChangeTaskStatusCallback,
  removeTask: removeTaskItemCallback,
};

export const TaskIsDoneStory = Template.bind({});

TaskIsDoneStory.args = {
  ...baseArg,
  tasks: [{ id: v1(), text: "TypeScript", isDone: true }],
  id: todoListID_1,
};

export const TaskIsNotDoneStory = Template.bind({});

TaskIsNotDoneStory.args = {
  ...baseArg,
  tasks: [{ id: v1(), text: "TypeScript", isDone: false }],
  id: todoListID_1,
};

export const RemoveTaskStory = Template.bind({});
RemoveTaskStory.args = {
  removeTaskItem: action("Remove task item"),
  tasks: [{ id: v1(), text: "TypeScript", isDone: false }],
  id: todoListID_1,
};

export const ChangeTaskTextStory = Template.bind({});
ChangeTaskTextStory.args = {
  onChangeTextTask: action("Change task text"),
  tasks: [{ id: v1(), text: "TypeScript", isDone: false }],
  id: todoListID_1,
};
