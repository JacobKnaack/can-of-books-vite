import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import AuthButtons from './Auth/AuthButtons';
import { withAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/">Home</Link></NavItem>
        {/* PLACEHOLDER: render a navigation link to the about page */}
        <NavItem><Link to="/about">About</Link></NavItem>
        {this.props.auth0.isAuthenticated
          ? <NavItem><Link to="/profile">Profile</Link></NavItem>
          : null}
        <AuthButtons />
      </Navbar>
    )
  }
}

const AuthHeader = withAuth0(Header);

export default AuthHeader;
