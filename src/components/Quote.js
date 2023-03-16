import React, { useCallback, useEffect, useState } from "react";
import Sentence from "./Sentence";
import Answers from "./Answers";
import Card from "../UI/Card";
import styles from "./Quote.module.css";

const Quote = (props) => {
  // ---> STATES:
  // Setting state to store the character choosen by the user for a particuar quote
  const [chosenCharacter, setChosenCharacter] = useState("");

  // ---> STATE & EVENT HANDLERS:
  // Here we're creating handler for setting choosenCharacter state and we need to use useCallback because this function will be passed to the other component and if we don't do this it will be a new function every time which will trigger re-render
  const choosingHandler = useCallback((selectedCharacter) => {
    setChosenCharacter(selectedCharacter);
  }, []);

  // ---> OTHER FUNCTIONS:
  useEffect(() => {
    // Creating check logic that would compare chosen character with the correct one and set score for this particular answer to 1 in a QuizList element in case of correct response and 0 in case of wrong one
    chosenCharacter === props.character
      ? props.setResultHandler({ ...props.result, [props.index]: 1 })
      : props.setResultHandler({ ...props.result, [props.index]: 0 });
  }, [chosenCharacter]);

  // -----> JSX <-----
  return (
    <li className={styles.quote} key={props.id}>
      <Card>
        <Sentence sentence={props.sentence} id={props.id} />
        <Answers
          character={props.character}
          id={props.id}
          allCharacters={props.allCharacters}
          index={props.index}
          choosingHandler={choosingHandler}
        />
      </Card>
    </li>
  );
};

export default React.memo(Quote);
