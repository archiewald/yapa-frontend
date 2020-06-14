import React from "react";

import { NavigationBar } from "./NavigationBar";

export const AppPage: React.FC = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <div className="container my-5">
        <div className="row justify-content-md-center">
          <div className="col col-md-8">
            <div className="card ">
              <div className="card-body">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
