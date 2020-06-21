import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faStop } from "@fortawesome/free-solid-svg-icons";

export const PlayIcon = () => (
  <FontAwesomeIcon icon={faPlay} className={"mr-2"} size="sm" />
);

export const PauseIcon = () => (
  <FontAwesomeIcon icon={faPause} className={"mr-2"} size="sm" />
);

export const StopIcon = () => (
  <FontAwesomeIcon icon={faStop} className={"mr-2"} size="sm" />
);
