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

// styles
import styles from "./Registration.module.css";

export default function Registration() {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["user"]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setError(null);
    e.preventDefault();
    console.log(fullName, email, password, confirmPassword);

    // check if passwords match
    if (password !== confirmPassword) {
      setShowAlert(true);
      setError("Passwords do not match");
      // reset passwords
      setPassword("");
      setConfirmPassword("");
      return;
    }
    // register user
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: fullName, email, password }),
      });
      const data = await response.json();
      setCookie("user", data, { path: "/" });
      navigate("/", { replace: true });
    } catch (error) {
      setShowAlert(true);
      setError(error.message);
    }
    // clear form
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
        style={{ display: "flex", alignItems: "center", marginTop: "15rem" }}
      >
        <main className={`w-100 m-auto  ${styles["form-signin"]}`}>
          <Form onSubmit={handleSubmit}>
            <div className="text-center">
              <h1 className="h3 mb-3 fw-normal" style={{ color: "white" }}>
                Please sign up
              </h1>
            </div>
            <Form.Group controlId="formBasicName">
              <Form.Label visuallyHidden>Full Name</Form.Label>
              <FloatingLabel
                controlId="floatingFullName"
                label="Enter full name"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>
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
            <Form.Group controlId="formBasicPassword">
              <Form.Label visuallyHidden>Password</Form.Label>
              <FloatingLabel
                controlId="floatingPassword"
                label="Enter password"
              >
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  className={styles["password"]}
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
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label visuallyHidden>Confirm Password</Form.Label>
              <FloatingLabel
                controlId="floatingConfirmPassword"
                label="Confirm password"
              >
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  className={styles["confirm-password"]}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <img
                  src={showConfirmPassword ? Eye : EyeOff}
                  alt={showConfirmPassword ? "Show password" : "Hide password"}
                  onClick={() => setShowConfirmPassword(!showPassword)}
                  className={styles["eye-icon"]}
                />
              </FloatingLabel>
            </Form.Group>
            <Button className="w-100" type="submit">
              Register
            </Button>
          </Form>
        </main>
      </div>
    </>
  );
}
