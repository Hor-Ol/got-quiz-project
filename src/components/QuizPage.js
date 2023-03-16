import React, { useEffect, useCallback, useState, useMemo } from "react";
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
  // Below is a fetch request that fetches quotes from a Web API
  const fetchQuotesHandler = useCallback(async () => {
    try {
      // Setting isLoading state to "true" as we start receiving the data
      setIsLoading(true);

      // Resetting error state to null to clear any potential error that might have happened earlier
      setError(null);

      // Fetching initial data from Web API
      const response = await fetch(
        "https://api.gameofthronesquotes.xyz/v1/random/10"
      );

      // Checking the data recieved for potetnial errors during data fetching
      // If error occurs we're throwing an error and creating our custom error message
      if (!response.ok) {
        throw new Error(`Something went wrong. Error: ${response.status}`);
      }

      // If data are ok we're parsing it
      const data = await response.json();

      // Creating array of fetched quote objects with the information about the quote, author of the quote and quote unique id
      const transformedQuotes = data.map((quote, index) => {
        return {
          sentence: quote.sentence,
          character: quote.character.name,
          key: index,
        };
      });

      // Storing transformed quotes in quotesArray
      setQuotesArray(transformedQuotes);

      // Setting isLoading state to false as we are done with data fetching and editing
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  // Below is a fetch request that fetches characters from Web API
  const fetchCharactersHandler = useCallback(async () => {
    try {
      // Setting isLoading state to "true" as we start receiving the data
      setIsLoading(true);

      // Resetting error state to null to clear any potential error that might have happened earlier
      setError(null);

      // Fetching initial data from Web API
      const response = await fetch(
        "https://api.gameofthronesquotes.xyz/v1/houses"
      );

      // Checking the data recieved for potetnial errors during data fetching
      // If error occurs we're throwing an error and creating our custom error message
      if (!response.ok) {
        throw new Error(`Something went wrong. Error: ${response.status}`);
      }

      // If data are ok we're parsing it
      const data = await response.json();

      // Creating array of fetched quote objects with the information about the character and character unique id
      const tansformedHouses = data.map((house, houseIndex) =>
        house.members.map((houseCharacter, characterIndex) => ({
          characterName: houseCharacter.name,
          id: houseIndex.toString() + characterIndex.toString(),
        }))
      );

      // Flattening characters array
      const transformedCharacters = tansformedHouses.flat(1);

      // Storing flattened characters array in characters state
      setCharacters(transformedCharacters);

      // Setting isLoading state to false as we're done fetching data
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  // ---> OTHER FUNCTIONS:
  // With the below function we're running fetchQuotesHandler and fetchCharactersHander once the page is loaded
  useEffect(() => {
    fetchQuotesHandler();
    fetchCharactersHandler();
  }, [fetchQuotesHandler, fetchCharactersHandler]);

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
