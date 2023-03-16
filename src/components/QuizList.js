import React, { useState } from "react";
import Quote from "./Quote";
import Logo from "../UI/Logo";
import Button from "../UI/Button";
import Overlay from "../UI/Overlay";
import Card from "../UI/Card";
import styles from "./QuizList.module.css";

const QuizList = (props) => {
  // ---> STATES:
  // We're setting state for storing the result of the answers
  const [result, setResult] = useState("");

  // We're setting state in which we will be able to store final result of all of the answers
  const [finalResult, setFinalResult] = useState("");

  // We're setting status of showing/not showing the results of the quiz
  const [resultsPage, setResultsPage] = useState(false);

  // We're setting state to be able to track whether all answers were selected
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

  // ---> OTHER DATA OBJECTS:
  // In the below object we're storing data about each character which will be shown on result page
  const charactersIQ = {
    0: {
      name: "jon-snow",
      description: `"You know nothing, Jon Snow" was the only whisper you've heard`,
    },
    1: {
      name: "edmure-tully",
      description: `You're dutiful and loyal man, which are a good traits for a Hand of a kind Monarch. However, "whisper" is a new word in your vocabulary`,
    },
    2: {
      name: "theon-greyjoy",
      description: `Hearing whispers worth nothing for a Hand of the Throne unless you can make wise decisions based on them. May be you've heard a couple, but "wise decisions" part is completely not about you`,
    },
    3: {
      name: "sansa-stark",
      description:
        "You're young and have huge potential, yet you still have a lot to learn to know what's spoken around the court and how to use it to become a good Hand of the Throne",
    },
    4: {
      name: "petyr-bealish",
      description:
        "Your cunnings and sherwdness serve a great deal to you and can be incredibly useful for a Hand of the Throne, yet your thirst for power can make people hide things from you at all cost",
    },
    5: {
      name: "cersei-lannister",
      description:
        "You're strong, quick-witted and feared that lets you find out some of the whispers, yet some are not shared out of fear of your anger!",
    },
    6: {
      name: "davos-seaworth",
      description:
        "You're wise and kind which lets you find out the things that can be gotten without cruelty and force, yet there are whispers that need another approach",
    },
    7: {
      name: "varys",
      description:
        "Your little birds bring you a lot of whispers, but it seems they're not flying everywhere!",
    },
    8: {
      name: "tyrion-lannister",
      description:
        "Your wits and cleverness always let you find a way to know the majority of the thoughts are flying around the Iron Throne and use it for the Throne's favour",
    },
    9: {
      name: "melisandre",
      description:
        "Lord of Light and your enormous knowledge help you to know the whispers that are shared around the Seven Kingdoms",
    },
    10: {
      name: "bran-stark",
      description: "You're three-eyed raven. No whisper can fly past you!",
    },
  };

  // ---> STATE & EVENT HANDLERS:
  // With the below handler we're setting actual results of the quiz
  const setResultHandler = (newResult) => {
    setResult(newResult);
  };

  // With the below handler we're implementing functionality to show note in case user didn't select all the answers
  const showAnswerAllHandler = () => {
    setFinalResult((prevState) => "");
  };

  // Below handler checks whether all answers were selected and if yes calculates the final result
  const calculateResultsHandler = () => {
    const resultsArray = Object.values(result);

    // If all of the questions were answered we're setting allQuestionsAnswered state to "true", calculate and store the final result and showing the results page with the final result
    if (resultsArray.length === 10) {
      setAllQuestionsAnswered(true);
      setFinalResult(resultsArray.reduce((acc, curResult) => acc + curResult));
      setResultsPage(true);
    } else {
      setFinalResult(resultsArray.reduce((acc, curResult) => acc + curResult));
      setAllQuestionsAnswered(false);
    }
  };

  // -----> JSX <-----
  return (
    <React.Fragment>
      {!resultsPage && (
        <React.Fragment>
          <Logo />
          <span className={styles["quiz-instruction"]}>
            Choose below the author of every quote!
          </span>
          <ul className={styles["quiz-list"]}>
            {props.quotes.map((quote, index) => (
              <Quote
                key={quote.key}
                id={quote.key}
                sentence={quote.sentence}
                character={quote.character}
                allCharacters={props.allCharacters}
                index={index}
                result={result}
                setResultHandler={setResultHandler}
              />
            ))}
            <Button>
              <button
                type="submit"
                className={styles["quiz-list-button"]}
                onClick={calculateResultsHandler}
              >
                Check results!
              </button>
            </Button>
          </ul>
        </React.Fragment>
      )}

      {finalResult !== "" && !resultsPage && !allQuestionsAnswered && (
        <Overlay>
          <div className={styles["answer-all-questions"]}>
            <Card>
              <span>Please answer all questions!</span>
              <Button>
                <button type="button" onClick={showAnswerAllHandler}>
                  Answer questions
                </button>
              </Button>
            </Card>
          </div>
        </Overlay>
      )}

      {resultsPage && (
        <React.Fragment>
          <Overlay>
            <div className={styles["character-description-container"]}>
              <img
                src={require(`./../imgs/characters/${charactersIQ[finalResult].name}.jpg`)}
                className={styles["result-picture"]}
                alt={
                  charactersIQ[finalResult].name.replaceAll("-", " ") + ` image`
                }
              />
              <div className={styles["character-description"]}>
                <span className={styles["character-result-message"]}>
                  {finalResult} whisper(s) out of 10
                </span>
                <span className={styles["character-name-message"]}>
                  You're {charactersIQ[finalResult].name.replaceAll("-", " ")}
                </span>
                <span className={styles["character-description-message"]}>
                  {charactersIQ[finalResult].description}
                </span>
              </div>
            </div>
            <Button>
              <button
                type="button"
                className={styles["try-again-button"]}
                onClick={props.setIsQuizSHownHandler}
              >
                Try Again!
              </button>
            </Button>
          </Overlay>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default React.memo(QuizList);
