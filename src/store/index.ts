import { createStoreon } from "storeon";
import { storeonDevtools } from "storeon/devtools";

import { TimerEvents, TimerState, TimerModule } from "./timer";
import { LoaderEvents, LoaderState, LoaderModule } from "./loader";
import { UserEvents, UserState, UserModule } from "./user";

export type AppEvents = TimerEvents & LoaderEvents & UserEvents;
export interface AppState extends TimerState, LoaderState, UserState {}

export const store = createStoreon<AppState, AppEvents>([
  UserModule,
  TimerModule,
  LoaderModule,
  process.env.NODE_ENV !== "production" && storeonDevtools,
]);
