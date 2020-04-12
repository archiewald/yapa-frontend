import * as React from "react";

import { FieldWrapper, FieldWrapperProps } from "./FieldWrapper";

export interface TextFieldProps extends Omit<FieldWrapperProps, "type"> {
  type?: "tel" | "email" | "text" | "password" | "date" | "number";
}

export const TextField: React.FC<TextFieldProps> = ({
  type = "text",
  ...fieldProps
}) => {
  return <FieldWrapper type={type} {...fieldProps} />;
};
