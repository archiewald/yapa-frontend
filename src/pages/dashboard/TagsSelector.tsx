import React from "react";
import Button from "react-bootstrap/Button";

import { Tag } from "models/Tag";

import "./TagsSelector.scss";

interface Props {
  onSelect: (selectedTagId: string, wasSelected: boolean) => void;
  tags: Tag[];
  selectedTagsIds: string[];
}

export const TagsSelector: React.FC<Props> = ({
  onSelect,
  tags,
  selectedTagsIds,
}) => (
  <ul className="TagsSelector">
    {tags.map(({ id, name }) => {
      const isSelected = selectedTagsIds.includes(id);

      return (
        <li key={id}>
          <Button
            size="sm"
            className="mb-2 mr-2"
            onClick={() => onSelect(id, isSelected)}
            variant={isSelected ? "primary" : "outline-primary"}
          >
            {name}
          </Button>
        </li>
      );
    })}
  </ul>
);
