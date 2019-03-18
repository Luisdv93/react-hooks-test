import { useState, useEffect } from "react";

export const useHttp = (url, dependecies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    console.log("Sending HTTP Request to URL: ", url);

    setIsLoading(true);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }

        return response.json();
      })
      .then(data => {
        setIsLoading(false);
        setFetchedData(data);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, dependecies);

  return [isLoading, fetchedData];
};
