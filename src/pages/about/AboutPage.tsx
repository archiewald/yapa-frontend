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
    <ul>
      <li className={"mt-3"}>
        pomodoro icon made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          {" "}
          www.flaticon.com
        </a>
      </li>
      <li>
        pomodoros photo by{" "}
        <a href="https://unsplash.com/@galex?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
          Alex Ghizila
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/s/photos/tomato?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
          Unsplash
        </a>
      </li>
    </ul>
  </AppPage>
);
