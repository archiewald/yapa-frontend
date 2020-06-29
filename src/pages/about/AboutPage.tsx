import React from "react";
import { AppPage } from "ui/AppPage";
import { Link } from "react-router-dom";

export const AboutPage = () => (
  <AppPage>
    <p>
      If you want to talk about the app or anything really, mail me{" "}
      <a href="mailto:artur@kozubek.dev">artur@kozubek.dev</a>
    </p>
    Check our <Link to="/privacy-policy">Privacy Policy</Link> and{" "}
    <Link to="/terms-of-service">Terms of Service</Link>
  </AppPage>
);
