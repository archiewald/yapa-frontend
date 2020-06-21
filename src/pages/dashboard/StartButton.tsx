import React from "react";
import { TimerMode } from "store/timer";
import { useStore } from "store/useStore";
import Button from "react-bootstrap/Button";
import { PlayIcon } from "./Icons";

interface Props {
  mode: TimerMode;
}

export const StartButton: React.FC<Props> = ({
  mode: buttonMode,
  children,
}) => {
  const {
    timer: { mode, interval, isPaused },
    dispatch,
  } = useStore("timer");

  return (
    <Button
      variant={
        (interval || isPaused) && mode === buttonMode
          ? "primary"
          : "outline-primary"
      }
      block={true}
      onClick={() => {
        if (mode !== buttonMode) {
          dispatch("timerSetMode", buttonMode);
        }
        dispatch("timerStart");
      }}
    >
      <PlayIcon />
      {children}
    </Button>
  );
};
