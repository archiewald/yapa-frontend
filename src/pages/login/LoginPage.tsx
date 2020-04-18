import React from "react";
import { Formik, Form } from "formik";
import { setLocale } from "yup";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

import { yup } from "yupInstance";
import { api } from "api";
import { AppPage } from "ui/AppPage";
import { TextField } from "ui/form/TextField";
import { store } from "store";
import { useAlerts } from "utils/useAlerts";
import { AlertList } from "ui/AlertsList";

setLocale({
  mixed: {
    required: "This is a required field"
  }
});

const LoginSchema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required()
});

export const LoginPage: React.FC = () => {
  const history = useHistory();
  const { alerts, setAlerts } = useAlerts();

  return (
    <AppPage>
      <h2>Login</h2>
      <AlertList alerts={alerts} />
      <Formik
        validationSchema={LoginSchema}
        initialValues={{
          email: "",
          password: ""
        }}
        onSubmit={async ({ email, password }) => {
          try {
            const user = await api.login(email, password);
            store.dispatch("userSave", user);

            history.push("/dashboard");
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
            <Button type="submit" block={true} disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </AppPage>
  );
};
