import React from "react";

import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import { useStore } from "store/useStore";
import { HomeLayoutPage } from "ui/HomeLayoutPage";
import homeScreen from "assets/hero-screen.png";

import "./HomePage.scss";

export const HomePage = () => {
  const { user } = useStore("user");

  return (
    <HomeLayoutPage>
      <section id="hero">
        <div className="row mx-lg-2">
          <div className="col-12 col-lg-7">
            <h2 className="HomePageHeroTitle mb-4 my-lg-5">
              Keep your workflow <br /> focused 💡 <br /> and healthy 💪
            </h2>

            <div className="HomePageHeroDescription">
              <p>Working a lot with a laptop 💻?</p>

              <ul>
                <li>Boost your productivity with the Pomodoro Technique 🍅</li>
                <li>Stay active during breaks!</li>
              </ul>
            </div>

            <Link
              to={user ? "/dashboard" : "/register"}
              className="d-none d-lg-block"
            >
              <Button size="lg" className="HomePageCtaButton my-4">
                Start now
              </Button>
            </Link>
          </div>

          <div className="col-12 col-lg-5">
            <Link to={user ? "/dashboard" : "/register"}>
              <Button size="lg" className="HomePageCtaButton my-4 d-lg-none">
                Start now
              </Button>
            </Link>

            <img src={homeScreen} className="HomePageHeroScreen my-4" />
          </div>
        </div>
      </section>

      <section id="benefits">
        <h3 className="HomePageSectionTitle my-4 mb-3">Perks 😎</h3>

        <div className="row justify-content-lg-center">
          <div className="col col-lg-8">
            <ul className="HomePagePerksList list-group list-group-flush">
              <li className="list-group-item">
                Overcome distractions when it's time for work with a{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Pomodoro Technique
                </a>
              </li>

              <li className="list-group-item">
                Repetitive Strain Injury is a thing 😨! Staring at a screen
                strains your eyes 👀. Use regular breaks to keep your body
                healthy 💪
              </li>

              <li className="list-group-item">
                Use the app on multiple devices on any browser. Keep your
                pomodoros in the cloud ☁ and track your progress 📈.
              </li>

              <li className="list-group-item">
                Yapa is a Progressive Web App 🤓! Add Yapa as a standalone app
                on Windows/MacOS/Linux to keep it at hand.
              </li>

              <li className="list-group-item">
                And it's open source! Check the{" "}
                <a
                  href="https://github.com/archiewald/yapa-frontend"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  web client
                </a>{" "}
                and{" "}
                <a
                  href="https://github.com/archiewald/yapa-backend"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  server code
                </a>{" "}
                on Github
              </li>
            </ul>
          </div>
        </div>

        <Link to={user ? "/dashboard" : "/register"}>
          <Button size="lg" className="HomePageCtaButton my-4">
            Start now
          </Button>
        </Link>
      </section>
    </HomeLayoutPage>
  );
};
