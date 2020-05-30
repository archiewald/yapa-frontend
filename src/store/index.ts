import { createStoreon } from "storeon";
import { storeonDevtools } from "storeon/devtools";

import { TimerEvents, TimerState, TimerModule } from "./timer";
import { LoaderEvents, LoaderState, LoaderModule } from "./loader";
import { UserEvents, UserState, UserModule } from "./user";
import { TagsModule, TagsEvents, TagsState } from "./tags";

export type AppEvents = TimerEvents & LoaderEvents & UserEvents & TagsEvents;
export interface AppState
  extends TimerState,
    LoaderState,
    UserState,
    TagsState {}

export const store = createStoreon<AppState, AppEvents>([
  UserModule,
  TimerModule,
  LoaderModule,
  TagsModule,
  process.env.NODE_ENV !== "production" && storeonDevtools,
]);
