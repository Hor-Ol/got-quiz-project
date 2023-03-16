import React, { useState } from "react";
import WelcomePage from "./components/WelcomePage";
import QuizPage from "./components/QuizPage";
import styles from "./App.module.css";

function App() {
  // ---> STATES:
  // Setting up state for the status of the quiz page shown/not shown
  const [isQuizShown, setIsQuizShown] = useState(false);

  // ---> STATE & EVENT HANDLERS:
  // Changes the state of isQuizShown state to the opposite
  const setIsQuizSHownHandler = () => {
    setIsQuizShown((prevState) => !prevState);
  };

  // -----> JSX <-----
  return (
    <div className={styles.app}>
      {!isQuizShown && (
        <WelcomePage setIsQuizSHownHandler={setIsQuizSHownHandler} />
      )}
      {isQuizShown && (
        <QuizPage setIsQuizSHownHandler={setIsQuizSHownHandler} />
      )}
    </div>
  );
}

export default App;
