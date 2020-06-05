import React, { useState } from "react";
import { useEffect } from "react";

import { AppPage } from "ui/AppPage";
import { api } from "api";
import { Pomodoro } from "models/Pomodoro";
import { msToFullMinutes } from "utils/timeUtils";
import { useStore } from "store/useStore";

export const PomodorosPage: React.FC = () => {
  const { tags: userTags, pomodoros } = useStore("tags", "pomodoros");

  return (
    <AppPage>
      <h2>Pomodoros</h2>
      <ul>
        {pomodoros.map(({ id, duration, startDate, tags }) => (
          <li key={id}>
            {msToFullMinutes(duration)} min, started {startDate}, tags:{" "}
            {userTags
              .filter(({ id }) =>
                tags.some((_id) => {
                  return id === _id;
                })
              )
              .map(({ name }) => name)
              .join(", ")}
          </li>
        ))}
      </ul>
    </AppPage>
  );
};
