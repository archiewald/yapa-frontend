import React, { useEffect } from "react";
import { isSameDay } from "date-fns";

import { renderTimeString } from "utils/timeUtils";
import { askPermission, showNotification } from "notifications/utils";
import { AppPage } from "ui/AppPage";
import { useStore } from "store/useStore";
import { TagsSelector } from "./TagsSelector";
import { DaySummaryCard } from "ui/DaySummaryCard/DaySummaryCard";

export const DashboardPage: React.FC = () => {
  const {
    timer: { counter, selectedTagsIds },
    tags = [],
    pomodoros,
    dispatch,
  } = useStore("timer", "tags", "pomodoros");

  useEffect(() => {
    dispatch("timerInit");
  }, []);

  const today = new Date();
  const todayPomodoros = pomodoros.filter(({ startDate }) =>
    isSameDay(new Date(startDate), today)
  );

  return (
    <AppPage>
      <button
        onClick={() => {
          dispatch("timerSetMode", "pomodoro");
        }}
      >
        Pomodoro
      </button>
      <button
        onClick={() => {
          dispatch("timerSetMode", "shortBreak");
        }}
      >
        Short break
      </button>
      <button
        onClick={() => {
          dispatch("timerSetMode", "longBreak");
        }}
      >
        Long break
      </button>

      <TagsSelector
        tags={tags}
        selectedTagsIds={selectedTagsIds}
        onSelect={(selectedTagId, wasSelected) => {
          dispatch(
            wasSelected ? "timerRemoveTagId" : "timerAddTagId",
            selectedTagId
          );
        }}
      />

      <h1>{counter ? renderTimeString(counter) : "Wait for it..."}</h1>
      <button
        onClick={() => {
          dispatch("timerStart");
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          dispatch("timerPause");
        }}
      >
        Pause
      </button>
      <button
        onClick={() => {
          dispatch("timerReset");
        }}
      >
        Reset
      </button>
      <p>
        {/* // eslint-disable-next-line */}
        🍅 icon made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          {" "}
          www.flaticon.com
        </a>
      </p>
      <button
        onClick={() => {
          askPermission();
        }}
      >
        request Push notifications permission
      </button>

      <button
        onClick={() => {
          showNotification("TEST");
        }}
      >
        test notification
      </button>

      <DaySummaryCard title="Pomodoros today" pomodoros={todayPomodoros} />
    </AppPage>
  );
};
