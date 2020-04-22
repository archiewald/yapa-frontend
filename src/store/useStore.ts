import { useStoreon } from "storeon/react";
import { AppState, AppEvents } from "store";

export function useStore(...keys: (keyof AppState)[]) {
  return useStoreon<AppState, AppEvents>(...keys);
}
