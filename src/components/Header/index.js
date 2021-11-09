import React from "react";
import { Col, Container, Navbar, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Auth from "../../Auth";

const Header = () => {
  let Navigate = useNavigate();
  const handleLogOut = () => {
    Auth.signout();
    Navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Button
              className="mx-auto"
              as={Col}
              variant="dark"
              onClick={handleLogOut}
            >
              Log Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
