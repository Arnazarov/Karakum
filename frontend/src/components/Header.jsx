import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction } from '../actions/userActions';
import Search from './Search';

const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userLogin);
  const { userLoginInfo } = user;

  const signOutHandler = () => {
    dispatch(userLogoutAction());
  };

  return (
    <header>
      <Navbar className="heading" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="title" href="/">
              Karakum
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Search></Search>
            <Nav className="ms-auto" style={{ fontSize: '1rem' }}>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fa-solid fa-cart-shopping"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userLoginInfo ? (
                <NavDropdown title={userLoginInfo.name} id="userInfo">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={signOutHandler}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign
                    In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userLoginInfo && userLoginInfo.isAdmin && (
                <NavDropdown title="Admin Menu" id="adminMenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
