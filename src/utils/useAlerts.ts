import { useState } from "react";
import { v4 as uuid } from "uuid";

export interface Alert {
  id: string;
  message: string;
  style: "success" | "danger";
}

export function useAlerts() {
  const [alerts, setAlertsState] = useState<Alert[]>([]);
  const setAlerts = (alerts: Omit<Alert, "id">[]) => {
    setAlertsState([...alerts.map(alert => ({ id: uuid(), ...alert }))]);
  };

  return { alerts, setAlerts };
}
