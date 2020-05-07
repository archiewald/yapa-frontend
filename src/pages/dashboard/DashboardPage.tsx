import React, { useEffect } from "react";

import { renderTimeString } from "utils/timeUtils";
import { askPermission, showNotification } from "notifications";
import { AppPage } from "ui/AppPage";
import { useStore } from "store/useStore";

export const DashboardPage: React.FC = () => {
  const {
    timer: { counter },
    dispatch
  } = useStore("timer");

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
