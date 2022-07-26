// import Navbar from 'react-boostrap'
import { Navbar, Nav, Container, Button } from "react-bootstrap";

// LinkContainer
import { LinkContainer } from "react-router-bootstrap";

export default function NavbarComponent() {
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand>Jokes</Navbar.Brand>
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
        </Nav>
      </Container>
    </Navbar>
  );
}
