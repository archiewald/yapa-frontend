import * as React from "react";
import { ErrorMessage, Field, FieldConfig } from "formik";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLElement>,
  keyof FieldConfig | "className"
>;

export interface FieldWrapperProps extends InputProps, FieldConfig {
  label?: string;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  ...props
}) => {
  return (
    <div>
      {label && <label htmlFor={props.name}>{label}</label>}
      <div>
        <Field {...props} />
      </div>
      <ErrorMessage name={props.name} />
    </div>
  );
};
