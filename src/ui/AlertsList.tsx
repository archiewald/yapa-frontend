import React from "react";

import { Alert } from "utils/useAlerts";

import "./AlertsList.scss";

export const AlertList: React.FC<{ alerts: Alert[] }> = ({ alerts }) => (
  <ul className="AlertsList">
    {alerts.map(({ id, style, message }) => (
      <li className={`alert alert-${style}`} key={id} role="alert">
        {message}
      </li>
    ))}
  </ul>
);
