import React from "react";
import { Formik, Form } from "formik";
import Button from "react-bootstrap/Button";

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

  const {
    settings: { pomodoroTime, longBreakTime, shortBreakTime },
  } = user!;

  return (
    <AppPage>
      <h2>Settings</h2>
      <AlertList alerts={alerts} />
      <Formik
        validationSchema={SettingsSchema}
        initialValues={{
          pomodoroTime,
          shortBreakTime,
          longBreakTime,
        }}
        onSubmit={async ({ pomodoroTime, shortBreakTime, longBreakTime }) => {
          debugger;
          try {
            const user = await api.setUserSettings({
              pomodoroTime,
              shortBreakTime,
              longBreakTime,
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
            <TextField
              type="number"
              name="pomodoroTime"
              label="Pomodoro time"
            />
            <TextField
              type="number"
              name="shortBreakTime"
              label="Short break time"
            />
            <TextField
              type="number"
              name="longBreakTime"
              label="Long break time"
            />
            <Button type="submit" block={true} disabled={isSubmitting}>
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </AppPage>
  );
};
