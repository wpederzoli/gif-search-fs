import React from "react";
import InputField from "./InputField";

export default {
  title: "Components/InputField",
  component: InputField,
};

const Template = (args) => <InputField {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  placeholder: "Placeholder text",
  value: "",
};
