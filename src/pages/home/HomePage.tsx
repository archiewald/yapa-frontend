import React from "react";

import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import { useStore } from "store/useStore";
import { HomeLayoutPage } from "ui/HomeLayoutPage";
import homeScreen from "assets/hero-screen.png";
import archie from "assets/archie.jpg";

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

            <img
              src={homeScreen}
              alt="Yapa pomodoro app screen"
              className="HomePageHeroScreen my-4"
            />
          </div>
        </div>
      </section>

      <section id="benefits">
        <h3 className="HomePageSectionTitle mt-4 mb-3">Perks 😎</h3>

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
                healthy 💪. Yapa will remind you to do some simple exercises.
              </li>

              <li className="list-group-item">
                Use the app on multiple devices on any browser. Keep your
                pomodoros in the cloud ☁ and track your progress 📈.
              </li>

              <li className="list-group-item">
                Yapa is a Progressive Web App (PWA) 🤓! Add Yapa as a standalone
                app on Windows/MacOS/Linux to keep it at hand.
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
          <Button size="lg" className="HomePageCtaButton mt-4 mb-5">
            Start now
          </Button>
        </Link>
      </section>

      <section className="mb-lg-4">
        <h3 className="HomePageSectionTitle mt-4 mb-4">About me 😺</h3>
        <div className="row justify-content-lg-center">
          <div className="col col-lg-10">
            <div className="row">
              <div className="col-12 col-lg-4">
                <img
                  src={archie}
                  alt="Archie face"
                  className="HomePageArchie mb-4 mb-lg-0"
                />
              </div>

              <div className="col-12 col-lg-8 mt-lg-3">
                <p>
                  My name is Artur and I hope you will find this little app
                  helpful!
                </p>
                <p>
                  I enjoy creating interactive web applications with TypeScript.
                  When I find some time I share my experiences on my tech blog{" "}
                  <a
                    href="https://www.kozubek.dev/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    kozubek.dev
                  </a>
                  .
                </p>
                <p>
                  Mail me{" "}
                  <a href="mailto:artur@kozubek.dev">artur@kozubek.dev</a> to
                  talk about the app or anything else. You can find me on{" "}
                  <a
                    href="https://www.facebook.com/artur.kozubek1"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    facebook
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.linkedin.com/in/arturkozubek/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    linkedin
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://github.com/archiewald"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    github
                  </a>{" "}
                  as well.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h1 className="HomePageTitle mt-5">
          Yapa - the best pomodoro timer app on Windows, MacOS, Linux. Work or
          study with Pomodoro Technique.
        </h1>
      </section>
    </HomeLayoutPage>
  );
};
