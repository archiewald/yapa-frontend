import React from "react";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { AppPage } from "ui/AppPage";
import { api } from "api";
import { useAlerts } from "utils/useAlerts";
import { AlertList } from "ui/AlertsList";
import { useStore } from "store/useStore";

export const ConfirmEmailPage: React.FC = () => {
  const { token } = useParams();
  const history = useHistory();
  const { alerts, setAlerts } = useAlerts();
  const { dispatch } = useStore();

  useEffect(() => {
    async function confirmEmail() {
      try {
        const user = await api.confirmEmail(token!);
        dispatch("userSaveTemp", user);
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
    // TODO: include dependencies?
  }, []);

  return (
    <AppPage>
      <AlertList alerts={alerts} />
      <h2>Email confirmation</h2>
    </AppPage>
  );
};
