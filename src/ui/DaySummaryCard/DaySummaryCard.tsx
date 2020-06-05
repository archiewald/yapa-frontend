import React from "react";
import { Pomodoro } from "models/Pomodoro";
import { useStore } from "store/useStore";
import { PomodorosList } from "./PomodorosList";

export interface DaySummaryCardProps {
  title: string;
  pomodoros: Pomodoro[];
}

export const DaySummaryCard: React.FC<DaySummaryCardProps> = ({
  title,
  pomodoros,
}) => {
  const { tags: userTags } = useStore("tags");

  const tagsCounts: { [key: string]: number } = pomodoros.reduce(
    (tagsCountsAcc, pomodoro) => {
      const { tags } = pomodoro;

      tags.forEach((tagId) => {
        tagsCountsAcc[tagId] = tagsCountsAcc[tagId]
          ? tagsCountsAcc[tagId] + 1
          : 1;
      });

      return tagsCountsAcc;
    },
    {} as { [key: string]: number }
  );

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <h4 className="card-subtitle">{pomodoros.length} 🍅</h4>
        {userTags.length > 0 && (
          <ul className="DaySummaryCard__tags-list">
            {Object.entries(tagsCounts).map(([tagId, count]) => {
              const { name } = userTags.find(({ id }) => id === tagId)!;

              return (
                <li key={tagId} className="DaySummaryCard__tags-list-element">
                  <div className="btn btn-outline-primary">
                    {name} x {count}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <PomodorosList pomodoros={pomodoros} />
      </div>
    </div>
  );
};
