// react hooks
import { useState } from "react";

// react bootstrap components
import { Form, Button, FloatingLabel } from "react-bootstrap";

// import styles
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    // clear form
    setEmail("");
    setPassword("");
  };
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "20rem" }}>
      <main className={`w-100 m-auto  ${styles["form-signin"]}`}>
        <Form onSubmit={handleSubmit}>
          <div className="text-center">
            <h1 className="h3 mb-3 fw-normal" style={{ color: "white" }}>
              Please sign in
            </h1>
          </div>
          <Form.Group className="form-floating" controlId="formBasicEmail">
            <Form.Label visuallyHidden>Email address</Form.Label>
            <FloatingLabel controlId="floatingEmail" label="Enter email">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            className="mb-3 form-floating"
            controlId="formBasicPassword"
          >
            <Form.Label visuallyHidden>Password</Form.Label>
            <FloatingLabel controlId="floatingPassword" label="Enter password">
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FloatingLabel>
          </Form.Group>
          <Button className="w-100" type="submit">
            Login
          </Button>
        </Form>
      </main>
    </div>
  );
}
