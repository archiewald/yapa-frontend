import * as React from "react";
import { ErrorMessage, Field, FieldConfig } from "formik";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLElement>,
  keyof FieldConfig | "className"
>;

export interface FieldWrapperProps extends InputProps, FieldConfig {
  label?: React.ReactNode;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  ...props
}) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={props.name}>{label}</label>}
      <Field className="form-control" {...props} />
      <ErrorMessage name={props.name}>
        {(message) => (
          <small className="form-text text-danger">{message}</small>
        )}
      </ErrorMessage>
    </div>
  );
};
