import React, { useEffect } from "react";
import ReactGA, { FieldsObject } from "react-ga";
import { RouteComponentProps } from "react-router-dom";

ReactGA.initialize("UA-130671604-3");

export const WithTracker = <P extends RouteComponentProps>(
  WrappedComponent: React.ComponentType<P>,
  options: FieldsObject = {}
) => {
  const trackPage = (page: string) => {
    ReactGA.set({ page, ...options });
    ReactGA.pageview(page);
  };

  return (props: P) => {
    useEffect(() => {
      trackPage(props.location.pathname);
    }, [props.location.pathname]);

    return <WrappedComponent {...props} />;
  };
};
