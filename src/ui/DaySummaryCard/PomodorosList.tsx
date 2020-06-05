import React from "react";
import { Pomodoro } from "models/Pomodoro";
import { msToFullMinutes } from "utils/timeUtils";
import { useStore } from "store/useStore";

interface PomodorosListProps {
  pomodoros: Pomodoro[];
}

export const PomodorosList: React.FC<PomodorosListProps> = ({ pomodoros }) => {
  const { tags: userTags } = useStore("tags", "pomodoros");

  return (
    <ul>
      {pomodoros.map(({ id, duration, startDate, tags }) => (
        <li key={id}>
          {msToFullMinutes(duration)} min, started {startDate}, tags:{" "}
          {tags
            .map((tagId) => userTags.find(({ id }) => id === tagId)!.name)
            .join(", ")}
        </li>
      ))}
    </ul>
  );
};
