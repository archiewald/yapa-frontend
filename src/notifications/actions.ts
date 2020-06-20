import { store } from "store";

export type NotificationActionCode = "startShortBreak" | "startPomodoro";

export const NOTIFICATIONS_ACTIONS: {
  [code in NotificationActionCode]: {
    title: string;
    handler: () => void;
  };
} = {
  startShortBreak: {
    title: "Start short break 😴",
    handler: () => {
      store.dispatch("timerSetMode", "shortBreak");
      store.dispatch("timerStart");
    },
  },
  startPomodoro: {
    title: "Start pomodoro 🍅",
    handler: () => {
      store.dispatch("timerSetMode", "pomodoro");
      store.dispatch("timerStart");
    },
  },
};

export function getNotificationAction(code: NotificationActionCode) {
  return {
    action: code,
    title: NOTIFICATIONS_ACTIONS[code].title,
  };
}

export function runNotificationHandler(code: NotificationActionCode) {
  NOTIFICATIONS_ACTIONS[code].handler();
}
