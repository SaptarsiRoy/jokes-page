// hooks
import { useState } from "react";

// react-bootstrap
import { Form, Alert } from "react-bootstrap";

// constants
import url from "../../constants/url";

// styles
import styles from "./Contact.module.css";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // send email
    try {
      setError(null);
      setPending(true);
      const response = await fetch(`${url}/sendEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: firstName + " " + lastName,
          email,
          message,
        }),
      });
      if (response.ok && response.status === 200) {
        setShowAlert(true);
        setPending(false);
      }
    } catch (err) {
      setError(err.message);
      setShowAlert(true);
      setPending(false);
    }

    // clear form
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
    setPending(false);
  };
  return (
    <>
      <Alert
        show={showAlert}
        dismissible
        onClose={() => setShowAlert(false)}
        variant={error ? "danger" : "success"}
      >
        {error && error}
        {!error && "Message sent!"}
      </Alert>
      <div className={styles["content"]}>
        <h4 className={styles["question-text"]}>Got A Question ?</h4>
        <h1 className={styles["title"]}>Contact Us</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName" className={styles["name"]}>
            <Form.Label visuallyHidden>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Form.Label visuallyHidden>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className={styles["email"]}>
            <Form.Label visuallyHidden>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            controlId="formBasicMessage"
            className={styles["message"]}
          >
            <Form.Label visuallyHidden>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Enter Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button className={styles.button + " mt-5"} disabled={pending}>
              <span>{pending ? "Sending..." : "Send Message"}</span>
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
