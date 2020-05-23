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

export const SettingsPage: React.FC = () => {
  const { alerts, setAlerts } = useAlerts();
  const { user, dispatch } = useStore("user");
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

      <p>Account email: {email}</p>
      <Button
        className="mb-4"
        onClick={async () => {
          await api.logout();
          dispatch("userClear");
          history.push("/");
        }}
      >
        Logout
      </Button>

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
          <Form noValidate={true}>
            <TextField type="number" name="pomodoro" label="Pomodoro time" />
            <TextField
              type="number"
              name="shortBreak"
              label="Short break time"
            />
            <TextField type="number" name="longBreak" label="Long break time" />
            <Button type="submit" block={true} disabled={isSubmitting}>
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </AppPage>
  );
};
