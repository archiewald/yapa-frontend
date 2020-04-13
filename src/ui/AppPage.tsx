import React from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import { NavigationBar } from "./NavigationBar";

import "./AppPage.scss";

export interface Alert {
  id: string;
  message: string;
  style: "success" | "danger";
}

export interface AppPageProps {
  children:
    | ((setAlerts: (alerts: Omit<Alert, "id">[]) => void) => React.ReactNode)
    | React.ReactNode;
}

export const AppPage: React.FC<AppPageProps> = ({ children }) => {
  const [alerts, setAlertsState] = useState<Alert[]>([]);
  const setAlerts = (alerts: Omit<Alert, "id">[]) => {
    setAlertsState([...alerts.map(alert => ({ id: uuid(), ...alert }))]);
  };

  return (
    <div className="AppPage__container">
      <NavigationBar />
      <div className="container mt-5">
        <div className="row justify-content-md-center">
          <div className="col col-md-8">
            <div className="card ">
              <div className="card-body">
                {alerts.map(({ message, style, id }) => (
                  <div className={`alert alert-${style}`} key={id} role="alert">
                    {message}
                  </div>
                ))}
                {typeof children === "function"
                  ? (children as (
                      setAlerts: (alerts: Omit<Alert, "id">[]) => void
                    ) => React.ReactNode)(setAlerts)
                  : children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
