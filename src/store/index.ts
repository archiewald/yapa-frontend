import { createStoreon } from "storeon";
import { storeonDevtools } from "storeon/devtools";

import { TimerEvents, TimerState, TimerModule } from "./timer";
import { LoaderEvents, LoaderState, LoaderModule } from "./loader";
import { UserEvents, UserState, UserModule } from "./user";
import { TagsModule, TagsEvents, TagsState } from "./tags";
import { PomodorosState, PomodorosEvents, PomodorosModule } from "./pomodoros";

export type AppEvents = TimerEvents &
  LoaderEvents &
  UserEvents &
  TagsEvents &
  PomodorosEvents;
export interface AppState
  extends TimerState,
    LoaderState,
    UserState,
    TagsState,
    PomodorosState {}

export const store = createStoreon<AppState, AppEvents>([
  UserModule,
  TimerModule,
  LoaderModule,
  TagsModule,
  PomodorosModule,
  process.env.NODE_ENV !== "production" && storeonDevtools,
]);
