import { StoreonModule } from "storeon";
import { Pomodoro } from "models/Pomodoro";
import { api } from "api";

export interface PomodorosState {
  // TODO: would be better to make it a list
  pomodoros: Pomodoro[];
}

export interface PomodorosEvents {
  pomodorosCreate: Omit<Pomodoro, "id">;
  pomodorosGet: undefined;
  pomodorosSave: Pomodoro[];
  pomodorosAdd: Pomodoro;
}

export const PomodorosModule: StoreonModule<PomodorosState, PomodorosEvents> = (
  store
) => {
  store.on("@init", () => {
    return { pomodoros: [] };
  });

  store.on("pomodorosGet", async () => {
    const pomodoros = await api.getPomodoros();

    store.dispatch("pomodorosSave", pomodoros);
  });

  store.on("pomodorosSave", (_state, pomodoros) => ({
    pomodoros,
  }));

  store.on("pomodorosCreate", async (_state, pomodoroData) => {
    const pomodoro = await api.createPomodoro(pomodoroData);

    store.dispatch("pomodorosAdd", pomodoro);
  });

  store.on("pomodorosAdd", ({ pomodoros }, pomodoro) => ({
    pomodoros: [...pomodoros!, pomodoro],
  }));
};
