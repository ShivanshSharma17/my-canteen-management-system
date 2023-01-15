import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import '../../App.css'



const Header = ({ navItems, match = {}, loggedIn = '' }) => {
  const {url = {}} = match;
  const [loggedInUser, setLoggedInUser] = useState(loggedIn);

 const handleLogout =(e)=>{
  sessionStorage.removeItem('loggedInCustomer');
  setLoggedInUser(sessionStorage.getItem('loggedInCustomer'));
  window.location.href = '/';
 }
console.log("####",loggedInUser, loggedIn)
  return <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='space-around'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand className='fa fa-home fa-lg size16'>Canteen Management System</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          {loggedInUser !== '' &&<Nav><Nav.Link>Welcome {loggedInUser}!!</Nav.Link></Nav>}
          <Nav activeKey={window.location.pathname}>
            {
              navItems.map(items => <LinkContainer to={`${url}${items.url}`}>
                <Nav.Link>{items.item}</Nav.Link>
                </LinkContainer>)
            }
          </Nav>
        </Navbar.Collapse>
        {(sessionStorage.getItem('loggedInCustomer') !== null)&&<fragment>
          <input classname='logout' type='button' value='Logout' onClick={handleLogout}></input>
        </fragment>
        }
      </Container>
    </Navbar>
  </div>
}

export default Header;