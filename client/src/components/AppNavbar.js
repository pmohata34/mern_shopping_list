import React, { Component, Fragment } from 'react';
import {
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import { FaShoppingBasket } from 'react-icons/fa';
import RegisterModal from './Auth/RegisterModal';
import LoginModal from './Auth/LoginModal';
import Logout from './Auth/Logout';
import PropTypes from 'prop-types';

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggleNavbar = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth || {};

    const authLinks = (
      <Fragment>
        <NavItem color='black'>
          <span className=" navbar-text mr-2">
            <strong>{user ? `Welcome, ${user.name}` : ''}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="md" sticky="top" className="shadow-sm mb-4">
        <Container>
          <NavbarBrand href="/" className="d-flex align-items-center">
            <FaShoppingBasket className="me-2" style={{ fontSize: '1.2rem' }} />
            <span style={{ fontSize: '1rem' }}>Shopping List</span>
          </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ms-auto d-flex align-items-center gap-2" navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AppNavbar);