import React, { useEffect } from "react";
import { isSameDay } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faStop } from "@fortawesome/free-solid-svg-icons";

import { renderTimeString } from "utils/timeUtils";
import { DaySummaryCard } from "ui/DaySummaryCard/DaySummaryCard";
import { useStore } from "store/useStore";
import { TagsSelector } from "./TagsSelector";
import Button from "react-bootstrap/Button";
import { AppPage } from "ui/AppPage";

import "./DashboardPage.scss";

const PlayIcon = () => (
  <FontAwesomeIcon icon={faPlay} className={"mr-2"} size="sm" />
);

const PauseIcon = () => (
  <FontAwesomeIcon icon={faPause} className={"mr-2"} size="sm" />
);

const StopIcon = () => (
  <FontAwesomeIcon icon={faStop} className={"mr-2"} size="sm" />
);

export const DashboardPage: React.FC = () => {
  const {
    timer: { counter, selectedTagsIds, mode, interval },
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
      <div className="row mb-4">
        <div className="col">
          <Button
            variant={
              interval && mode === "pomodoro" ? "primary" : "outline-primary"
            }
            block={true}
            onClick={() => {
              dispatch("timerSetMode", "pomodoro");
              dispatch("timerStart");
            }}
          >
            <PlayIcon />
            Pomodoro
          </Button>
        </div>
        <div className="col">
          <Button
            variant={
              interval && mode === "shortBreak" ? "primary" : "outline-primary"
            }
            block={true}
            onClick={() => {
              dispatch("timerSetMode", "shortBreak");
              dispatch("timerStart");
            }}
          >
            <PlayIcon />
            Short break
          </Button>
        </div>
        <div className="col">
          <Button
            variant={
              interval && mode === "longBreak" ? "primary" : "outline-primary"
            }
            block={true}
            onClick={() => {
              dispatch("timerSetMode", "longBreak");
              dispatch("timerStart");
            }}
          >
            <PlayIcon />
            Long break
          </Button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-8 DashboardPageCounter">
          <h2 className="DashboardPageCounter__title">
            {counter ? renderTimeString(counter) : "Wait for it..."}
          </h2>
        </div>
        <div className="col-4">
          <Button
            variant="outline-danger"
            block={true}
            onClick={() => {
              dispatch("timerPause");
            }}
          >
            <PauseIcon />
            Pause
          </Button>
          <Button
            variant="outline-danger"
            block={true}
            onClick={() => {
              dispatch("timerReset");
            }}
          >
            <StopIcon />
            Reset
          </Button>
        </div>
      </div>

      <TagsSelector
        className="mb-4"
        tags={tags}
        selectedTagsIds={selectedTagsIds}
        onSelect={(selectedTagId, wasSelected) => {
          dispatch(
            wasSelected ? "timerRemoveTagId" : "timerAddTagId",
            selectedTagId
          );
        }}
      />

      <DaySummaryCard title="Today" pomodoros={todayPomodoros} />
    </AppPage>
  );
};
