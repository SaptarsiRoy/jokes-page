// import Navbar from 'react-boostrap'
import { Navbar, Nav, Container, Button } from "react-bootstrap";

// LinkContainer
import { LinkContainer } from "react-router-bootstrap";

// cookies
import { useCookies } from "react-cookie";

export default function NavbarComponent() {
  const [cookies, setCookie] = useCookies(["user"]);
  const handleLogout = () => {
    setCookie("user", "", { path: "/" });
  };
  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand>Jokes</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          id="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add">
              <Nav.Link>Add Joke</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {!cookies.user ? (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>
                    <Button variant="outline-light">Login</Button>
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>
                    <Button variant="outline-light">Register</Button>
                  </Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <Button variant="outline-light" onClick={handleLogout}>
                    Logout
                  </Button>
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
