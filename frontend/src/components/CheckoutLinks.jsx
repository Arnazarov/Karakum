import React from 'react';
import { Nav, NavItem, NavLink } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const CheckoutLinks = ({ stepOne, stepTwo, stepThree, stepFour }) => {
  return (
    <Nav className="justify-content-center mb-3">
      <NavItem>
        {stepOne ? (
          <LinkContainer to="/login">
            <NavLink>&ensp;LOGIN &#707;</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>&ensp;LOGIN</NavLink>
        )}
      </NavItem>
      <NavItem>
        {stepTwo ? (
          <LinkContainer to="/shipping">
            <NavLink>&ensp;SHIPPING &#707;</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>&ensp;SHIPPING</NavLink>
        )}
      </NavItem>
      <NavItem>
        {stepThree ? (
          <LinkContainer to="/payment">
            <NavLink>&ensp;PAYMENT &#707;</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>&ensp;PAYMENT</NavLink>
        )}
      </NavItem>
      <NavItem>
        {stepFour ? (
          <LinkContainer to="/placeorder">
            <NavLink>&ensp;PLACE ORDER &#707;</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>&ensp;PLACE ORDER</NavLink>
        )}
      </NavItem>
    </Nav>
  );
};

export default CheckoutLinks;
