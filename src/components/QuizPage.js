import React, { useEffect, useCallback, useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import QuizList from "./QuizList";
import styles from "./QuizPage.module.css";

const QuizPage = (props) => {
  // ---> STATES:
  // Setting state for holding quotes
  const [quotesArray, setQuotesArray] = useState([]);

  // Setting state for characters
  const [characters, setCharacters] = useState([]);

  // Setting loading state
  const [isLoading, setIsLoading] = useState(false);

  // Setting state for errors
  const [error, setError] = useState(false);

  // ---> STATE & EVENT HANDLERS:
  // Below are handler functions that are used inside custom hooks to transfrom data recieved from API

  const transformQuotesHandler = (quotesData) => {
    // Creating array of fetched quote objects with the information about the quote, author of the quote and quote unique id
    const transformedQuotes = quotesData.map((quote, index) => {
      return {
        sentence: quote.sentence,
        character: quote.character.name,
        key: index,
      };
    });

    // Storing transformed quotes in quotesArray
    setQuotesArray(transformedQuotes);
  };

  const transformCharactersHandler = (charactersData) => {
    // Creating array of fetched quote objects with the information about the character and character unique id
    const tansformedHouses = charactersData.map((house, houseIndex) =>
      house.members.map((houseCharacter, characterIndex) => ({
        characterName: houseCharacter.name,
        id: houseIndex.toString() + characterIndex.toString(),
      }))
    );

    // Flattening characters array
    const transformedCharacters = tansformedHouses.flat(1);

    // Storing flattened characters array in characters state
    setCharacters(transformedCharacters);
  };

  // ---> CUSTOM HOOKS
  // Below are two uses od useFetch Custom Hook to generate fecthing data functions

  const { sendRequest: quotesRequest } = useFetch();

  const { sendRequest: characterRequest } = useFetch();

  // ---> OTHER FUNCTIONS:
  // With the below functions we're running quotesRequest and charactersrequest passing into it urls, transform functions and state updating functions once the page is loaded
  useEffect(() => {
    quotesRequest(
      "https://api.gameofthronesquotes.xyz/v1/random/10",
      transformQuotesHandler,
      setIsLoading,
      setError
    );
    characterRequest(
      "https://api.gameofthronesquotes.xyz/v1/houses",
      transformCharactersHandler,
      setIsLoading,
      setError
    );
  }, [quotesRequest, characterRequest]);

  // -----> JSX <-----
  return (
    <div className={styles["quiz-page"]}>
      {!isLoading && quotesArray.length > 0 && (
        <QuizList
          quotes={quotesArray}
          allCharacters={characters}
          setIsQuizSHownHandler={props.setIsQuizSHownHandler}
        />
      )}
      {isLoading && <span className={styles["quiz-loading"]}>Loading...</span>}
      {!isLoading && error && (
        <span className={styles["quiz-error"]}>{error}</span>
      )}
    </div>
  );
};

export default React.memo(QuizPage);
