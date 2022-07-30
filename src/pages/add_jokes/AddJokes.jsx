// react hooks
import { useState, useEffect } from "react";

// react-router-dom
import { useNavigate } from "react-router-dom";

// react bootstrap components
import { Form, FloatingLabel, Alert } from "react-bootstrap";

// cookies
import { useCookies } from "react-cookie";

// constants
import url from "../../constants/url";

// styles
import styles from "./AddJokes.module.css";

export default function AddJokes() {
  const [joke, setJoke] = useState("");
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [cookies] = useCookies(["user"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookies.user) {
      navigate("/login");
    }
  }, [cookies.user, navigate]);

  const handleSubmit = async (e) => {
    setError(null);
    e.preventDefault();
    if (joke.length < 10) {
      setError("Joke must be at least 10 characters long");
      setShowAlert(true);
      setJoke("");
      return;
    }
    try {
      const id = cookies.user.user._id;
      const response = await fetch(`${url}/jokes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ joke, id }),
      });
      if (response.ok && response.status === 201) {
        setJoke("");
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <Alert
        show={showAlert}
        dismissible
        onClose={() => setShowAlert(false)}
        variant="danger"
      >
        {error && error}
      </Alert>
      <div style={{ display: "flex", alignItems: "center", marginTop: "5rem" }}>
        <main className={`w-100 m-auto  ${styles["form-signin"]}`}>
          <Form onSubmit={handleSubmit}>
            <div className="text-center">
              <h1 className="h3 mb-3 fw-normal" style={{ color: "white" }}>
                Add Jokes
              </h1>
            </div>
            <Form.Group controlId="jokeContent">
              <Form.Label visuallyHidden>Joke Content</Form.Label>
              <FloatingLabel controlId="fJokeContent" label="Enter your joke">
                <Form.Control
                  as="textarea"
                  placeholder="Enter your joke"
                  value={joke}
                  onChange={(e) => setJoke(e.target.value)}
                  required
                  style={{ height: "5rem" }}
                />
              </FloatingLabel>
            </Form.Group>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button className={styles.button + " mt-5"} type="submit">
                <span>Make Someone Laugh</span>
              </button>
            </div>
          </Form>
        </main>
      </div>
    </>
  );
}
