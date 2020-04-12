import React, { useState } from "react";
import { Formik, Form } from "formik";
import { setLocale } from "yup";
import { store } from "store";

import { yup } from "yupInstance";
import { api } from "api";
import { AppPage } from "ui/AppPage";
import { TextField } from "ui/form/TextField";

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
  password: yup.string().required(),
  passwordRepeat: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Password fields doesn't match")
});

export const RegisterPage: React.FC = () => {
  const [registerSuccess, setRegisterSuccess] = useState(false);

  return (
    <AppPage>
      <h2>Register</h2>
      <Formik
        validationSchema={RegisterSchema}
        initialValues={{
          email: "",
          password: "",
          passwordRepeat: ""
        }}
        onSubmit={async ({ email, password }) => {
          // TODO: error handling
          store.dispatch("setIsLoading", true);
          await api.register(email, password);
          setRegisterSuccess(true);
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
