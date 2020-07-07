import React from "react";

import Button from "react-bootstrap/Button";

export const NotificationsBanner: React.FC<{ onAcceptClick: () => void }> = ({
  onAcceptClick,
}) => (
  <div className="container">
    <div className="row justify-content-md-center">
      <div className="col col-md-8 text-center p-2">
        We need your permission to notify you when pomodoro ends
        <Button onClick={onAcceptClick} className="ml-3">
          Enable notifications
        </Button>
      </div>
    </div>
  </div>
);
