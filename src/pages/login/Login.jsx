// react hooks
import { useState } from "react";

// react router dom
import { useNavigate } from "react-router-dom";

// react bootstrap components
import { Form, Button, FloatingLabel, Alert } from "react-bootstrap";

// cookies
import { useCookies } from "react-cookie";

// icons
import Eye from "../../assets/eye.svg";
import EyeOff from "../../assets/cross_eye.svg";

// import styles
import styles from "./Login.module.css";

export default function Login() {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["user"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setError(null);
    e.preventDefault();

    // login user
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setCookie("user", data, { path: "/" });
      navigate("/", { replace: true });
    } catch (error) {
      setShowAlert(true);
      setError(error.message);
    }
    // clear form
    setEmail("");
    setPassword("");
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
      <div
        style={{ display: "flex", alignItems: "center", marginTop: "20rem" }}
      >
        <main className={`w-100 m-auto  ${styles["form-signin"]}`}>
          <Form onSubmit={handleSubmit}>
            <div className="text-center">
              <h1 className="h3 mb-3 fw-normal" style={{ color: "white" }}>
                Please sign in
              </h1>
            </div>
            <Form.Group controlId="formBasicEmail">
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label visuallyHidden>Password</Form.Label>
              <FloatingLabel
                controlId="floatingPassword"
                label="Enter password"
              >
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <img
                  src={showPassword ? Eye : EyeOff}
                  alt={showPassword ? "Show password" : "Hide password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles["eye-icon"]}
                />
              </FloatingLabel>
            </Form.Group>
            <Button className="w-100" type="submit">
              Login
            </Button>
          </Form>
        </main>
      </div>
    </>
  );
}
