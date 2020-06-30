import * as React from "react";
import { Field, ErrorMessage } from "formik";

import { FieldWrapperProps } from "./FieldWrapper";

export interface CheckboxFieldProps extends Omit<FieldWrapperProps, "type"> {}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  ...props
}) => {
  return (
    <div className="form-check mb-3">
      <Field
        className="form-check-input"
        type="checkbox"
        id={props.name}
        {...props}
      />
      {label && (
        <label htmlFor={props.name} className="form-check-label">
          {label}
        </label>
      )}
      <ErrorMessage name={props.name}>
        {(message) => (
          <small className="form-text text-danger">{message}</small>
        )}
      </ErrorMessage>
    </div>
  );
};
