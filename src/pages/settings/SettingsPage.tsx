import React from "react";
import { Formik, Form } from "formik";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

import { yup } from "yupInstance";
import { AppPage } from "ui/AppPage";
import { TextField } from "ui/form/TextField";
import { AlertList } from "ui/AlertsList";
import { useStore } from "store/useStore";
import { useAlerts } from "utils/useAlerts";
import { api } from "api";

const SettingsSchema = yup.object({
  pomodoro: yup
    .number()
    .integer()
    .min(0)
    .required(),
  shortBreak: yup
    .number()
    .integer()
    .min(0)
    .required(),
  longBreak: yup
    .number()
    .integer()
    .min(0)
    .required(),
});

const TagSchema = yup.object({
  name: yup.string().required(),
});

export const SettingsPage: React.FC = () => {
  const { alerts, setAlerts } = useAlerts();
  const { user, dispatch, tags } = useStore("user", "tags");
  const history = useHistory();

  const {
    settings: {
      timer: { pomodoro, shortBreak, longBreak },
    },
    email,
  } = user!;

  return (
    <AppPage>
      <AlertList alerts={alerts} />
      <h2 className="mb-3">Settings</h2>

      <p>
        Account email: {email}
        <Button
          className="ml-4"
          onClick={async () => {
            await api.logout();
            dispatch("userClear");
            history.push("/");
          }}
        >
          Logout
        </Button>
      </p>

      <Formik
        validationSchema={SettingsSchema}
        initialValues={{
          pomodoro,
          shortBreak,
          longBreak,
        }}
        onSubmit={async ({ pomodoro, shortBreak, longBreak }) => {
          try {
            const user = await api.setUserSettings({
              timer: {
                pomodoro,
                shortBreak,
                longBreak,
              },
            });

            dispatch("userSave", user);

            setAlerts([
              {
                message: "Settings saved",
                style: "success",
              },
            ]);
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
          <Form noValidate={true} className="mb-4">
            <div className="row mb-4">
              <div className="col">
                <TextField type="number" name="pomodoro" label="Pomodoro" />
              </div>
              <div className="col">
                <TextField
                  type="number"
                  name="shortBreak"
                  label="Short break"
                />
              </div>
              <div className="col">
                <TextField type="number" name="longBreak" label="Long break" />
              </div>
            </div>
            <Button type="submit" block={true} disabled={isSubmitting}>
              Save
            </Button>
          </Form>
        )}
      </Formik>

      <hr />

      <h2 className="mb-3">Tags</h2>
      <ul>
        {tags?.map(({ name, id }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>

      <Formik
        validationSchema={TagSchema}
        initialValues={{
          name: "",
        }}
        onSubmit={async ({ name }, { resetForm }) => {
          dispatch("tagsCreate", { name });
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form noValidate={true}>
            <div className="row">
              <div className="col">
                <label htmlFor="name">New tag name</label>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <TextField name="name" />
              </div>
              <div className="col">
                <Button type="submit" block={true} disabled={isSubmitting}>
                  Save tag
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </AppPage>
  );
};
