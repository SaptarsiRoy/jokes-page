// hooks
import { useState } from "react";

// react-boostrap
// import { Button } from "react-bootstrap";

// styles
import styles from "./ViewJokes.module.css";

export default function ViewJokes() {
  const [joke, setJoke] = useState({
    _id: 1,
    joke: "Click the Button to get a Joke",
    author: "Anonymous",
  });
  const [isPending, setIsPending] = useState(false);
  const handleClick = async () => {
    try {
      setIsPending(true);
      const url =
        "http://localhost:5000/api/joke/random/62e021ede277490972ec219a";
      const response = await fetch(url, {
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
      console.log(error);
      setJoke({
        _id: 1,
        joke: "Error",
        author: "Anonymous Error",
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
