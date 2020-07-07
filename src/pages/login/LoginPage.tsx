import React from "react";
import { Formik, Form } from "formik";
import Button from "react-bootstrap/Button";
import { useHistory, Link } from "react-router-dom";

import { yup } from "yupInstance";
import { api } from "api";
import { AppPage } from "ui/AppPage";
import { TextField } from "ui/form/TextField";
import { store, AppState } from "store";
import { useAlerts } from "utils/useAlerts";
import { AlertList } from "ui/AlertsList";
import { useStoreon } from "storeon/react";

const LoginSchema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
});

export const LoginPage: React.FC = () => {
  const history = useHistory();
  const { alerts, setAlerts } = useAlerts();
  const { userTemp } = useStoreon<AppState>("userTemp");

  return (
    <AppPage>
      <h2>Login</h2>
      <AlertList alerts={alerts} />
      <Formik
        validationSchema={LoginSchema}
        initialValues={{
          email: userTemp?.email || "",
          password: "",
        }}
        onSubmit={async ({ email, password }) => {
          try {
            const user = await api.login(email, password);
            store.dispatch("userSave", user);
            store.dispatch("userInitOthers");

            history.push("/dashboard");
          } catch (error) {
            setAlerts([
              {
                message: error.message,
                style: "danger",
              },
            ]);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form noValidate={true}>
            <TextField type="email" name="email" label="Email" />
            <TextField type="password" name="password" label="Password" />
            <Button type="submit" block={true} disabled={isSubmitting}>
              Login
            </Button>
            <p className="my-2">No account yet?</p>
            <Link to="/register">
              <Button variant={"outline-primary"} block={true}>
                Register
              </Button>
            </Link>
          </Form>
        )}
      </Formik>
    </AppPage>
  );
};
