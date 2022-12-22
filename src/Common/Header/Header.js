import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

const Header = ({ navItems, match = {}, loggedIn = '' }) => {
  const {url = {}} = match;
  return <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='space-around'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand className='fa fa-home fa-lg size16'>Canteen Management System</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          {loggedIn !== '' &&<Nav><Nav.Link>Welcome {loggedIn}!!</Nav.Link></Nav>}
          <Nav activeKey={window.location.pathname}>
            {
              navItems.map(items => <LinkContainer to={`${url}${items.url}`}>
                <Nav.Link>{items.item}</Nav.Link>
                </LinkContainer>)
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
}

export default Header;