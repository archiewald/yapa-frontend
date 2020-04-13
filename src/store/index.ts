import { createStoreon } from "storeon";
import { storeonDevtools } from "storeon/devtools";

import { TimerEvents, TimerState, TimerModule } from "./timer";
import { LoaderEvents, LoaderState, LoaderModule } from "./loader";
import { UserEvents, UserState } from "./user";

export type AppEvents = TimerEvents & LoaderEvents & UserEvents;
export interface AppState extends TimerState, LoaderState, UserState {}

export const store = createStoreon<AppState, AppEvents>([
  TimerModule,
  LoaderModule,
  process.env.NODE_ENV !== "production" && storeonDevtools
]);
