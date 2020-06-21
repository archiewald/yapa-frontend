import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { format } from "date-fns";
import { faTags, faHourglassEnd } from "@fortawesome/free-solid-svg-icons";

import { Pomodoro } from "models/Pomodoro";
import { msToFullMinutes } from "utils/timeUtils";
import { useStore } from "store/useStore";

interface PomodorosListProps {
  pomodoros: Pomodoro[];
}

export const PomodorosList: React.FC<PomodorosListProps> = ({ pomodoros }) => {
  const { tags: userTags } = useStore("tags", "pomodoros");

  return (
    <ul>
      {pomodoros.map(({ id, duration, startDate, tags }) => (
        <li key={id}>
          <FontAwesomeIcon icon={faClock} className="mr-1" />
          {format(new Date(startDate), "H:mm")}
          <FontAwesomeIcon icon={faHourglassEnd} className="ml-3 mr-1" />
          {msToFullMinutes(duration)}
          min
          {tags.length > 0 && (
            <>
              <FontAwesomeIcon icon={faTags} className="ml-3 mr-1" />
              {tags
                .map((tagId) => userTags.find(({ id }) => id === tagId)?.name)
                .join(", ")}
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
