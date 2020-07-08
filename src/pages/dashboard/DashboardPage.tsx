import React from "react";
import { isSameDay } from "date-fns";
import Button from "react-bootstrap/Button";

import { renderTimeString } from "utils/timeUtils";
import { AppPage } from "ui/AppPage";
import { DaySummaryCard } from "ui/DaySummaryCard/DaySummaryCard";
import { useStore } from "store/useStore";
import { TagsSelector } from "./TagsSelector";

import "./DashboardPage.scss";
import { StartButton } from "./StartButton";
import { PauseIcon, PlayIcon, StopIcon } from "./Icons";
import { BreakTaskBanner } from "./BreakTaskBanner";
import { Link } from "react-router-dom";

export const DashboardPage: React.FC = () => {
  const {
    timer: { counter, selectedTagsIds, isPaused },
    breakTimer,
    tags = [],
    pomodoros,
    dispatch,
  } = useStore("timer", "tags", "pomodoros", "breakTimer");

  const today = new Date();
  const todayPomodoros = pomodoros.filter(({ startDate }) =>
    isSameDay(new Date(startDate), today)
  );

  return (
    <AppPage>
      {breakTimer.isPresent && (
        <BreakTaskBanner
          taskName={breakTimer.taskName}
          onDismiss={() => dispatch("breakTimerDismiss")}
        />
      )}

      <div className="row mb-4">
        <div className="col">
          <StartButton mode="pomodoro">Pomodoro</StartButton>
        </div>
        <div className="col">
          <StartButton mode="shortBreak">Short break</StartButton>
        </div>
        <div className="col">
          <StartButton mode="longBreak">Long break</StartButton>
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
              if (!isPaused) {
                dispatch("timerPause");
                return;
              }

              dispatch("timerStart");
            }}
          >
            {!isPaused ? (
              <>
                <PauseIcon />
                Pause
              </>
            ) : (
              <>
                <PlayIcon />
                Continue
              </>
            )}
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

      {tags.length === 0 && (
        <p>
          You can create tags to categorize your pomodoros in{" "}
          <Link to={"/settings"}>settings</Link>
        </p>
      )}
    </AppPage>
  );
};
