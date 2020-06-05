import React, { useState } from "react";
import { useEffect } from "react";
import { groupBy } from "lodash";
import { startOfDay, format } from "date-fns";

import { AppPage } from "ui/AppPage";
import { api } from "api";
import { Pomodoro } from "models/Pomodoro";
import { msToFullMinutes } from "utils/timeUtils";
import { useStore } from "store/useStore";
import { DaySummaryCard } from "ui/DaySummaryCard/DaySummaryCard";

export const PomodorosPage: React.FC = () => {
  const { pomodoros } = useStore("pomodoros");

  const daysWithPomodoros = groupBy(pomodoros, ({ startDate }) =>
    startOfDay(new Date(startDate))
  );

  return (
    <AppPage>
      <h2>Pomodoros by day</h2>
      {Object.entries(daysWithPomodoros).map(([day, pomodoros]) => (
        <DaySummaryCard
          key={day}
          title={format(new Date(day), "eee d LLL")}
          pomodoros={pomodoros}
        />
      ))}
    </AppPage>
  );
};
