import React, { useCallback } from "react";

const useFetch = () => {
  // Below we're creating sendRequest function that will send fetch API request to the url provided by the user, it will transform recieved data using transforming function also provided by the user and it will state isLoading and error states
  const sendRequest = useCallback(
    async (url, transformFunction, loadingSetter, errorSetter) => {
      try {
        loadingSetter(true);
        errorSetter(null);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Something went wrong. Error: ${response.status}`);
        }

        const data = await response.json();

        loadingSetter(false);

        transformFunction(data);
      } catch (error) {
        errorSetter(error.message);
        loadingSetter(false);
      }
    },
    []
  );

  // useFetch Custom Hook will return sendRequest function that can be used inside other components
  return {
    sendRequest,
  };
};

export default useFetch;
