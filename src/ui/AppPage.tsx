import React, { useState } from "react";
import { isMobile, isSafari } from "react-device-detect";

import { useStore } from "store/useStore";
import { askPermission } from "notifications/utils";

import { NavigationBar } from "./NavigationBar";
import { NotificationsBanner } from "./NotificationsBanner";
import { DevicesBanner } from "./DevicesBanner";

export const AppPage: React.FC = ({ children }) => {
  const { user } = useStore("user");
  const [
    wasEnableNotificationsBannerClicked,
    setEnableNotificationsBannerClicked,
  ] = useState(false);

  const showNotificationBanner =
    user &&
    Notification.permission !== "granted" &&
    !wasEnableNotificationsBannerClicked;

  return (
    <>
      <NavigationBar />
      {showNotificationBanner && (
        <NotificationsBanner
          onAcceptClick={() => {
            setEnableNotificationsBannerClicked(true);
            askPermission();
          }}
        />
      )}
      {user && (isMobile || isSafari) && <DevicesBanner />}

      <div className="container my-3">
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
