import React from "react";
import { useStoreon } from "storeon/react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const CookiesBanner: React.FC<{ onAcceptClick: () => void }> = ({
  onAcceptClick,
}) => (
  <div className="container">
    <div className="row justify-content-md-center">
      <div className="col col-md-8 text-center p-2">
        This app uses cookies to operate. Learn more on{" "}
        <Link to="privacy-policy">Privacy Policy</Link>
        <Button onClick={onAcceptClick} className="ml-3">
          Good
        </Button>
      </div>
    </div>
  </div>
);
