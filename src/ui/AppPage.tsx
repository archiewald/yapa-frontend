import React from "react";
import { NavigationBar } from "./NavigationBar";

import "./AppPage.scss";

export const AppPage: React.FC = ({ children }) => {
  return (
    <div className="AppPage__container">
      <NavigationBar />
      <div className="container mt-5">
        <div className="row justify-content-md-center">
          <div className="col col-md-8">
            <div className="card ">
              <div className="card-body">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
