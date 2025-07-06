import React, { useState } from 'react';
import {
  Navbar,
  Container,
  Nav,
  NavItem,
  NavbarToggle,
  Collapse
} from 'react-bootstrap';
import { FaShoppingBasket, FaGithub } from 'react-icons/fa';
import RegisterModal from './Auth/RegisterModal';
import Logout from './Auth/LogOut';

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
          <Nav className="ms-auto" navbar>
            <NavItem>
              <RegisterModal />
              <NavItem>
                <Logout />
              </NavItem>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;