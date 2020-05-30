import React, { useEffect } from "react";

import { renderTimeString } from "utils/timeUtils";
import { askPermission, showNotification } from "notifications";
import { AppPage } from "ui/AppPage";
import { useStore } from "store/useStore";
import { TagsSelector } from "./TagsSelector";

export const DashboardPage: React.FC = () => {
  const {
    timer: { counter, selectedTagsIds },
    tags = [],
    dispatch,
  } = useStore("timer", "tags");

  useEffect(() => {
    dispatch("timerInit");
  }, []);

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
    </AppPage>
  );
};
