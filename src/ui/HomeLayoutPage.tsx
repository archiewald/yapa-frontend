import React from "react";

import { NavigationBar } from "./NavigationBar";

export const HomeLayoutPage: React.FC = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <div className="container my-3">
        <div className="row justify-content-md-center">
          <div className="col">
            <div className="card ">
              <div className="card-body">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
