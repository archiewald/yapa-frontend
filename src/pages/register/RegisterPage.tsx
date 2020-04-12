import React, { useState } from "react";
import { Formik, Form } from "formik";
import { setLocale } from "yup";

import Yup from "yupConfig";
import { api } from "api";
import { AppPage } from "ui/AppPage";
import { TextField } from "ui/form/TextField";

setLocale({
  mixed: {
    required: "This is a required field"
  }
});

const RegisterSchema = Yup.object({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required(),
  passwordRepeat: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Password fields doesn't match")
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
