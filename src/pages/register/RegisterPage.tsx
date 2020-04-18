import React from "react";
import { Formik, Form } from "formik";
import { setLocale } from "yup";
import Button from "react-bootstrap/Button";

import { yup } from "yupInstance";
import { api } from "api";
import { AppPage } from "ui/AppPage";
import { TextField } from "ui/form/TextField";
import { AlertList } from "ui/AlertsList";
import { useAlerts } from "utils/useAlerts";

setLocale({
  mixed: {
    required: "This is a required field"
  }
});

const RegisterSchema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required()
    .min(6),
  passwordRepeat: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Password fields doesn't match")
});

export const RegisterPage: React.FC = () => {
  const { alerts, setAlerts } = useAlerts();

  return (
    <AppPage>
      <h2>Register</h2>
      <AlertList alerts={alerts} />
      <Formik
        validationSchema={RegisterSchema}
        initialValues={{
          email: "",
          password: "",
          passwordRepeat: ""
        }}
        onSubmit={async ({ email, password }) => {
          try {
            await api.register(email, password);
            setAlerts([
              {
                message: "Check your email to confirm registration process",
                style: "success"
              }
            ]);
          } catch (error) {
            setAlerts([
              {
                message: error.message,
                style: "danger"
              }
            ]);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form noValidate={true}>
            <TextField type="email" name="email" label="Email" />
            <TextField type="password" name="password" label="Password" />
            <TextField
              type="password"
              name="passwordRepeat"
              label="Repeat password"
            />
            <Button type="submit" block={true} disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </AppPage>
  );
};
