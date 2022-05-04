import React from 'react';
import { Nav, NavItem, NavLink } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutLinks = ({ stepOne, stepTwo, stepThree, stepFour }) => {
  return (
    <Nav className="justify-content-center mb-3">
      <NavItem>
        {stepOne ? (
          <LinkContainer to="/login">
            <NavLink>&ensp;Login &#707;</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>&ensp;Login</NavLink>
        )}
      </NavItem>
      <NavItem>
        {stepTwo ? (
          <LinkContainer to="/shipping">
            <NavLink>&ensp;Shipping &#707;</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>&ensp;Shipping</NavLink>
        )}
      </NavItem>
      <NavItem>
        {stepThree ? (
          <LinkContainer to="/payment">
            <NavLink>&ensp;Payment &#707;</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>&ensp;Payment</NavLink>
        )}
      </NavItem>
      <NavItem>
        {stepFour ? (
          <LinkContainer to="/placeorder">
            <NavLink>&ensp;Place Order &#707;</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>&ensp;Place Order</NavLink>
        )}
      </NavItem>
    </Nav>
  );
};

export default CheckoutLinks;
