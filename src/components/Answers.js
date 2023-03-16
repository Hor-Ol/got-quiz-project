import React, { useState, useMemo, useEffect } from "react";
import Button from "../UI/Button";
import styles from "./Answers.module.css";

const Answers = (props) => {
  // ---> STATE & EVENT HANDLERS:
  // Below is a logic for firtsly setting default style on all of the answer buttons for a particular quote (in case the user changes his/her mind) and then highlighting the last selected button with different color
  const onClickHandler = (event) => {
    const buttons = event.target.closest("div").children;

    for (let button of buttons) {
      button.className = styles["answer-button"];
    }

    event.target.className = styles["selected-answer-button"];
    props.choosingHandler(event.target.innerText);
  };

  // ---> OTHER FUNCTIONS:
  // Storing a name and id of the character who said the quote in a "character" variable
  const character = { characterName: props.character, id: props.id };

  // Storing array of all characters:
  const charactersArray = [...props.allCharacters];

  // Creating array of character names:
  const characterNames = charactersArray.map((char) => char.characterName);

  // Removing the character who said the quote from the array of all of the characters to avoid duplicates
  const removedCharacter = charactersArray.splice(
    characterNames.indexOf(character.characterName),
    1
  );

  // Selecting 3 random characters, who didn't say the quote
  const randomChars = charactersArray
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  // Adding character who said the quote to 3 random characters and shuffling the array
  const shuffledCharacters = [character, ...randomChars]
    .sort(() => Math.random() - Math.random())
    .slice(0, 4);

  // Preparing JSX code of answer options
  const charOptions = shuffledCharacters.map((char) => (
    <button
      type="button"
      className={styles["answer-button"]}
      key={char.id}
      onClick={onClickHandler}
    >
      {char.characterName}
    </button>
  ));

  // -----> JSX <-----
  return (
    <Button>
      <div className={styles.answers}>{charOptions}</div>
    </Button>
  );
};

export default React.memo(Answers);
