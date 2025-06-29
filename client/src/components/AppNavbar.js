import React, { useState } from 'react';
import {
  Navbar,
  Container,
  Nav,
  NavbarToggle,
  Collapse
} from 'react-bootstrap';
import { FaShoppingBasket, FaGithub } from 'react-icons/fa';

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <FaShoppingBasket className="me-2" />
          Shopping List
        </Navbar.Brand>
        <NavbarToggle onClick={toggleNavbar} />
        <Navbar.Collapse in={isOpen}>
          <Nav className="ms-auto">
            <Nav.Link
              href="https://github.com/pmohata34/mern_shopping_list"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="me-1" />
              GitHub
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;