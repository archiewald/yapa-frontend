import { StoreonModule } from "storeon";
import { addMilliseconds, differenceInMilliseconds } from "date-fns";

import { minutesToMs, msToFullMinutes } from "utils/timeUtils";
import { showNotification } from "notifications";
import { setBadge } from "badge";
import { UserState } from "./user";
import { User } from "models/User";

export type TimerMode = "pomodoro" | "shortBreak" | "longBreak";

export interface TimerState {
  timer: {
    interval?: NodeJS.Timeout;
    endTime?: Date;
    done: boolean;
    counter?: number;
    mode: TimerMode;
  };
}

export interface TimerEvents {
  timerInit: undefined;
  timerStart: undefined;
  timerPause: undefined;
  timerReset: undefined;
  timerUpdate: undefined;
  timerSetMode: TimerMode;
}

export const TimerModule: StoreonModule<TimerState & UserState, TimerEvents> = (
  store
) => {
  store.on("@init", () => ({
    timer: {
      mode: "pomodoro",
      done: false,
    },
  }));

  store.on("timerInit", ({ user, timer }) => {
    return {
      timer: {
        ...timer,
        counter: getCounterValue(user!, "pomodoro"),
      },
    };
  });

  store.on("timerUpdate", ({ timer }) => {
    const { endTime, mode } = timer;
    const counter = differenceInMilliseconds(endTime!, new Date());
    const done = counter <= 0;

    setBadge(msToFullMinutes(counter));

    if (done) {
      notifyTimerFinished(mode);
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

    const endTime = addMilliseconds(
      new Date(),
      timer.counter || getCounterValue(user!, timer.mode)
    );

    const interval = setInterval(() => {
      store.dispatch("timerUpdate");
    }, 1000);

    return {
      timer: {
        ...timer,
        interval,
        endTime,
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
        counter: getCounterValue(user!, timer.mode),
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
        counter: getCounterValue(user!, mode),
        interval: undefined,
      },
    };
  });
};

async function notifyTimerFinished(mode: TimerMode) {
  switch (mode) {
    case "pomodoro":
      await showNotification("Pomodoro finished!");
      return;
    case "shortBreak":
      await showNotification("Short break finished!");
      return;
    case "longBreak":
      await showNotification("Long break finished!");
      return;
  }
}

function getCounterValue(user: User, mode: TimerMode): number {
  const {
    settings: { timer: timerSettings },
  } = user;

  return minutesToMs(timerSettings[mode]);
}
