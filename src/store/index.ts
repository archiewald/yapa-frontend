import { createStoreon } from "storeon";
import { storeonDevtools } from "storeon/devtools";

import { TimerEvents, TimerState, TimerModule } from "./timer";
import { LoaderEvents, LoaderState, LoaderModule } from "./loader";
import { UserEvents, UserState, UserModule } from "./user";
import { TagsModule, TagsEvents, TagsState } from "./tags";
import { PomodorosState, PomodorosEvents, PomodorosModule } from "./pomodoros";
import {
  CookiesBannerEvents,
  CookiesBannerState,
  CookiesBannerModule,
} from "./cookiesBanner";
import {
  BreakTimerState,
  BreakTimerEvents,
  BreakTimerModule,
} from "./breakTimer";

export type AppEvents = TimerEvents &
  LoaderEvents &
  UserEvents &
  TagsEvents &
  PomodorosEvents &
  CookiesBannerEvents &
  BreakTimerEvents;

export interface AppState
  extends TimerState,
    LoaderState,
    UserState,
    TagsState,
    PomodorosState,
    CookiesBannerState,
    BreakTimerState {}

export const store = createStoreon<AppState, AppEvents>([
  UserModule,
  TimerModule,
  LoaderModule,
  TagsModule,
  PomodorosModule,
  CookiesBannerModule,
  BreakTimerModule,
  process.env.NODE_ENV !== "production" && storeonDevtools,
]);
