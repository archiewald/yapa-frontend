import { TimerMode } from "store/timer";

export interface User {
  id: string;
  email: string;
  verified: boolean;
  settings: UserSettings;
}

export interface UserSettings {
  timer: { [Mode in TimerMode]: number };
}
