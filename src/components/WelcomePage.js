import React from "react";
import Logo from "../UI/Logo";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./WelcomePage.module.css";

const WelcomePage = (props) => {
  // ---> STATE & EVENT HANDLERS:
  // Creating handler for setIsQuizShownHandler state updating function that is passed from App component
  const takeTheQuizHandler = () => {
    props.setIsQuizSHownHandler();
  };

  // -----> JSX <-----
  return (
    <div className={styles["welcome-page"]}>
      <Logo />
      <div className={styles["welcome-page-wrapper"]}>
        <Card>
          <div className={styles["welcome-page-container"]}>
            <span className={styles["welcome-page-heading"]}>
              What Hand of the Throne would you be?
            </span>
            <span className={styles["welcome-page-description"]}>
              The Hand of the Throne is an incredibly important role and
              extremely challenging one. It requires a lot of knowledge,
              shrewdness, strenght and wide set of abilities and skills. These
              can vary from econimic to military knowledge, however there are
              also those that are difficult to learn. One of such skills is
              knowing what's spoken across the Seven Kingdoms. It's important to
              know what whispers the subjects of the crown share before those
              whispers grow into plots!
              <br /> <br /> Check how good are you at knowing people's whispers!
            </span>
          </div>
          <Button>
            <button
              type="button"
              onClick={takeTheQuizHandler}
              className={styles["welcome-button"]}
            >
              Take the quiz
            </button>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default WelcomePage;
