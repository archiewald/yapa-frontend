import React from "react";
import Button from "react-bootstrap/Button";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

import { Tag } from "models/Tag";

import "./TagsSelector.scss";

interface Props {
  onSelect: (selectedTagId: string, wasSelected: boolean) => void;
  tags: Tag[];
  selectedTagsIds: string[];
  className?: string;
}

export const TagsSelector: React.FC<Props> = ({
  onSelect,
  tags,
  selectedTagsIds,
  className,
}) => (
  <ul className="TagsSelector">
    {tags.map(({ id, name }) => {
      const isSelected = selectedTagsIds.includes(id);

      return (
        <li key={id}>
          <Button
            size="sm"
            className={classNames("mb-2 mr-2", className)}
            onClick={() => onSelect(id, isSelected)}
            variant={isSelected ? "primary" : "outline-primary"}
          >
            <FontAwesomeIcon className="mr-1" icon={faTag} />
            {name}
          </Button>
        </li>
      );
    })}
  </ul>
);
