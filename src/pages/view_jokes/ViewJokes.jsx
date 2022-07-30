// hooks
import { useState } from "react";

// constants
import url from "../../constants/url";

// styles
import styles from "./ViewJokes.module.css";

export default function ViewJokes() {
  const [joke, setJoke] = useState({
    _id: 1,
    joke: "Click the Button to get a Joke",
    jokedBy: {
      name: "Anonymous",
    },
  });
  const [isPending, setIsPending] = useState(false);
  const handleClick = async () => {
    try {
      setIsPending(true);
      const response = await fetch(`${url}/joke/random`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setIsPending(false);
      setJoke(data);
    } catch (error) {
      setIsPending(false);
      error.name === "TypeError" && error.message === "Failed to fetch"
        ? setJoke({
            _id: 1,
            joke: "You are offline or else in space",
            jokedBy: {
              name: "No Internet",
            },
          })
        : setJoke({
            _id: 1,
            joke: "Error",
            jokedBy: {
              name: "Anonymous Error",
            },
          });
    }
  };
  return (
    <div className={styles.app}>
      <div className={styles.card}>
        {joke && (
          <>
            <h1 className={styles.joke}> {joke.joke} </h1>
            <h2 className={styles.author}> {joke.jokedBy.name} </h2>
          </>
        )}
      </div>
      {isPending && (
        <button className={styles.button + " mt-5"} disabled>
          <span>Loading...</span>
        </button>
      )}
      {!isPending && (
        <button className={styles.button + " mt-5"} onClick={handleClick}>
          <span>Find me a Joke</span>
        </button>
      )}
    </div>
  );
}
