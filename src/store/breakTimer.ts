import { StoreonModule } from "storeon";

export interface BreakTask {
  name: string;
  time?: number;
}

const BREAK_TASKS_COUNTER_STORAGE_KEY = "breakTasksCounter";

const BREAK_TASKS: string[] = [
  "Have some water",
  "Tightly close your eyes for 15s",
  "Lean back at your seat and relax",
  "Walk for a while",
  "Roll your eyes a few times to each side for 15s",
  "Rotate your eyes in counterclockwise direction for 15s",
  "Have some water",
  "Rotate your eyes in clockwise direction for 15s",
  "Blink your eyes for 10s",
  "Focus on a point in the far distance for 15s",
  "Have some water",
];

export interface BreakTimerState {
  breakTimer: {
    isPresent: boolean;
    counter: number;
    taskName: string;
  };
}

export interface BreakTimerEvents {
  breakTimerShow: undefined;
  breakTimerDismiss: undefined;
}

export const BreakTimerModule: StoreonModule<
  BreakTimerState,
  BreakTimerEvents
> = (store) => {
  store.on("@init", () => {
    const breakTasksCounter = parseInt(
      window.localStorage.getItem(BREAK_TASKS_COUNTER_STORAGE_KEY) || "0"
    );

    return {
      breakTimer: {
        isPresent: false,
        counter: breakTasksCounter,
        taskName: BREAK_TASKS[breakTasksCounter % BREAK_TASKS.length],
      },
    };
  });

  store.on("breakTimerShow", ({ breakTimer }) => {
    return {
      breakTimer: {
        ...breakTimer,
        isPresent: true,
        taskName: BREAK_TASKS[breakTimer.counter % BREAK_TASKS.length],
      },
    };
  });

  store.on("breakTimerDismiss", ({ breakTimer }) => {
    const counter = breakTimer.counter + 1;

    window.localStorage.setItem(BREAK_TASKS_COUNTER_STORAGE_KEY, `${counter}`);

    return {
      breakTimer: {
        ...breakTimer,
        counter,
        isPresent: false,
        taskName: BREAK_TASKS[breakTimer.counter % BREAK_TASKS.length],
      },
    };
  });
};
