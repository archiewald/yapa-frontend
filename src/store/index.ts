import { createStoreon } from "storeon";
import { storeonDevtools } from "storeon/devtools";

import { TimerEvents, TimerState, TimerModule } from "./timer";
import { LoaderEvents, LoaderState, LoaderModule } from "./loader";

export type AppEvents = TimerEvents & LoaderEvents;
export interface AppState extends TimerState, LoaderState {}

export const store = createStoreon<AppState, AppEvents>([
  TimerModule,
  LoaderModule,
  process.env.NODE_ENV !== "production" && storeonDevtools
]);
