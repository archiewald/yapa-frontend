import { StoreonModule } from "storeon";
import { addMilliseconds, differenceInMilliseconds } from "date-fns";

import { minutesToMs, msToFullMinutes } from "utils/timeUtils";
import { showNotification } from "notifications";
import { setBadge, clearBadge } from "badge";
import { UserState } from "./user";
import { User } from "models/User";
import { AppEvents } from "store";

export type TimerMode = "pomodoro" | "shortBreak" | "longBreak";

export interface TimerState {
  timer: {
    interval?: NodeJS.Timeout;
    endTime?: Date;
    startTime?: Date;
    done: boolean;
    counter?: number;
    mode: TimerMode;
    selectedTagsIds: string[];
  };
}

export interface TimerEvents {
  timerInit: undefined;
  timerStart: undefined;
  timerPause: undefined;
  timerReset: undefined;
  timerUpdate: undefined;
  timerSetMode: TimerMode;
  timerSavePomodoro: undefined;
  timerAddTagId: string;
  timerRemoveTagId: string;
}

export const TimerModule: StoreonModule<TimerState & UserState, AppEvents> = (
  store
) => {
  store.on("@init", () => ({
    timer: {
      mode: "pomodoro",
      done: false,
      selectedTagsIds: [],
    },
  }));

  store.on("timerInit", ({ user, timer }) => {
    return {
      timer: {
        ...timer,
        counter: timer.counter || getModeDuration(user!, "pomodoro"),
      },
    };
  });

  store.on("timerUpdate", ({ timer, user }) => {
    const { endTime, mode, startTime, selectedTagsIds } = timer;
    const counter = differenceInMilliseconds(endTime!, new Date());
    const done = counter <= 0;

    if (done) {
      clearBadge();
    } else setBadge(msToFullMinutes(counter));

    if (done) {
      notifyTimerFinished(mode);

      if (timer.mode === "pomodoro") {
        store.dispatch("pomodorosCreate", {
          startDate: startTime!.toISOString(),
          duration: getModeDuration(user!, "pomodoro"),
          tags: selectedTagsIds,
        });
      }

      return store.dispatch("timerReset");
    }

    return {
      timer: {
        ...timer,
        done,
        counter,
      },
    };
  });

  store.on("timerStart", ({ timer, user }) => {
    if (timer.interval) return { timer };

    const now = new Date();

    const endTime = addMilliseconds(
      now,
      timer.counter || getModeDuration(user!, timer.mode)
    );

    const interval = setInterval(() => {
      store.dispatch("timerUpdate");
    }, 1000);

    return {
      timer: {
        ...timer,
        interval,
        endTime,
        startTime: now,
      },
    };
  });

  store.on("timerPause", ({ timer }) => {
    const { interval } = timer;
    if (!interval) return { timer };

    clearInterval(interval);

    return {
      timer: {
        ...timer,
        interval: undefined,
      },
    };
  });

  store.on("timerReset", ({ timer, user }) => {
    const { interval } = timer;

    if (interval) {
      clearInterval(interval);
    }

    return {
      timer: {
        ...timer,
        counter: getModeDuration(user!, timer.mode),
        interval: undefined,
      },
    };
  });

  store.on("timerSetMode", ({ timer, user }, mode) => {
    const { interval } = timer;

    if (interval) {
      clearInterval(interval);
    }

    return {
      timer: {
        ...timer,
        mode,
        counter: getModeDuration(user!, mode),
        interval: undefined,
      },
    };
  });

  store.on("timerAddTagId", ({ timer }, tagId) => {
    return {
      timer: {
        ...timer,
        selectedTagsIds: [...timer.selectedTagsIds, tagId],
      },
    };
  });

  store.on("timerRemoveTagId", ({ timer }, tagId) => {
    return {
      timer: {
        ...timer,
        selectedTagsIds: [
          ...timer.selectedTagsIds.filter((id) => id !== tagId),
        ],
      },
    };
  });
};

async function notifyTimerFinished(mode: TimerMode) {
  switch (mode) {
    case "pomodoro":
      await showNotification("Pomodoro finished!", {
        actions: [{ action: "startShortBreak", title: "Start short break 😴" }],
      });
      return;
    case "shortBreak":
      await showNotification("Short break finished!");
      return;
    case "longBreak":
      await showNotification("Long break finished!");
      return;
  }
}

function getModeDuration(user: User, mode: TimerMode): number {
  const {
    settings: { timer: timerSettings },
  } = user;

  return minutesToMs(timerSettings[mode]);
}
