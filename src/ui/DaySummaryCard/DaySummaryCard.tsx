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

  const tagsCounts: Array<{ tagId: string; count: number }> = [
    { tagId: "5ed20d3630c1432f40dc24c4", count: 3 },
  ];

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <h4 className="card-subtitle">{pomodoros.length} 🍅</h4>
        <ul className="DaySummaryCard__tags-list">
          {tagsCounts.map(({ tagId, count }) => {
            const { name } = userTags.find(({ id }) => id === tagId)!;

            return (
              <li className="DaySummaryCard__tags-list-element">
                <div className="btn btn-outline-primary">
                  {name}x{count}
                </div>
              </li>
            );
          })}
        </ul>
        <PomodorosList pomodoros={pomodoros} />
      </div>
    </div>
  );
};
