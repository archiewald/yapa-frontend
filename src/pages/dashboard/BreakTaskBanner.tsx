import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface Props {
  onDismiss: () => void;
  taskName: string;
}

export const BreakTaskBanner: React.FC<Props> = ({ onDismiss, taskName }) => {
  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center mb-4">
      {taskName}

      <Button onClick={() => onDismiss()}>
        <FontAwesomeIcon icon={faCheck} />
      </Button>
    </div>
  );
};
