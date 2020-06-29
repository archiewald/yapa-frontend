import React from "react";
import { groupBy } from "lodash";
import { startOfDay, format, compareDesc } from "date-fns";

import { AppPage } from "ui/AppPage";
import { useStore } from "store/useStore";
import { DaySummaryCard } from "ui/DaySummaryCard/DaySummaryCard";

export const PomodorosPage: React.FC = () => {
  const { pomodoros } = useStore("pomodoros");

  const daysWithPomodoros = groupBy(pomodoros, ({ startDate }) =>
    startOfDay(new Date(startDate))
  );

  return (
    <AppPage>
      <h2 className="mb-4">Pomodoros by day</h2>
      {Object.entries(daysWithPomodoros)
        .map(([day, pomodoros]) => ({ day: new Date(day), pomodoros }))
        .sort((a, b) => compareDesc(a.day, b.day))
        .map(({ day, pomodoros }) => (
          <DaySummaryCard
            className="mb-3"
            key={day.toISOString()}
            title={format(new Date(day), "eeee d LLLL")}
            pomodoros={pomodoros}
          />
        ))}
    </AppPage>
  );
};
