import React, { useState, useEffect } from "react";
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
import { Tag } from "models/Tag";

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
  const { user, dispatch } = useStore("user");
  const history = useHistory();

  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    async function getTags() {
      setTags(await api.getTags());
    }

    getTags();
    // TODO: include dependencies?
  }, []);

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
          <Form noValidate={true}>
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
      <ul>
        {tags.map(({ name, id }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>

      <Formik
        validationSchema={TagSchema}
        initialValues={{
          name: "",
        }}
        onSubmit={async ({ name }) => {
          try {
            const tag = await api.createTag({ name });

            setTags((tags) => [...tags, tag]);
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
            <TextField name="name" label="Tag name" />
            <Button type="submit" block={true} disabled={isSubmitting}>
              Save tag
            </Button>
          </Form>
        )}
      </Formik>
    </AppPage>
  );
};
