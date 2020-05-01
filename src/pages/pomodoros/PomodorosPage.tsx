import React, { useState } from "react";
import { useEffect } from "react";

import { AppPage } from "ui/AppPage";
import { api } from "api";
import { Pomodoro } from "models/Pomodoro";
import { msToFullMinutes } from "utils/timeUtils";

export const PomodorosPage: React.FC = () => {
  const [pomodoros, setPomodoros] = useState<Pomodoro[]>([]);

  useEffect(() => {
    async function getPomodoros() {
      setPomodoros(await api.getPomodoros());
    }

    getPomodoros();
    // TODO: include dependencies?
  }, []);

  return (
    <AppPage>
      <h2>Pomodoros</h2>
      <ul>
        {pomodoros.map(({ id, duration, startDate }) => (
          <li key={id}>
            {msToFullMinutes(duration)} min, started {startDate}
          </li>
        ))}
      </ul>
    </AppPage>
  );
};
