import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { api } from "api";
import { AppPage } from "ui/AppPage";

export const RegisterPage: React.FC = () => {
  const [registerSuccess, setRegisterSuccess] = useState(false);

  return (
    <AppPage>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async ({ email, password }) => {
          // TODO: error handling
          await api.register(email, password);
          setRegisterSuccess(true);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <Field type="password" name="password" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      {registerSuccess && (
        <p>Check your email to confirm registration process</p>
      )}
    </AppPage>
  );
};
