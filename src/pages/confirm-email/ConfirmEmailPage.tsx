import React from "react";
import { useEffect } from "react";
import { AppPage } from "ui/AppPage";
import { useParams, useHistory } from "react-router-dom";
import { api } from "api";
import { store } from "store";
import { useAlerts } from "utils/useAlerts";
import { AlertList } from "ui/AlertsList";

export const ConfirmEmailPage: React.FC = () => {
  const { token } = useParams();
  const history = useHistory();
  const { alerts, setAlerts } = useAlerts();

  useEffect(() => {
    async function confirmEmail() {
      try {
        const user = await api.confirmEmail(token!);
        store.dispatch("userSaveTemp", user);
        history.push("/login");
      } catch (error) {
        setAlerts([
          {
            style: "danger",
            message: error.message
          }
        ]);
      }
    }

    confirmEmail();
  }, []);

  return (
    <AppPage>
      <AlertList alerts={alerts} />
      <h2>Email confirmation</h2>
    </AppPage>
  );
};
