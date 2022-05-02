import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Form,
  Card,
  Image,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import Message from '../components/Message';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutLinks from '../components/CheckoutLinks';

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingInfo, paymentInfo } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate tax, shipping and total prices
  cart.itemsPrice = Number(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  ).toFixed(2);

  cart.shippingPrice = Number(cart.itemsPrice > 200 ? 0 : 50).toFixed(2);

  cart.taxPrice = Number(cart.itemsPrice * 0.15).toFixed(2);

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const placeOrderBtnHandler = (e) => {
    e.preventDefault();
    navigate('/payment');
  };

  return (
    <>
      <CheckoutLinks stepOne stepTwo stepThree stepFour></CheckoutLinks>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>
                  Address: {shippingInfo.address}, {shippingInfo.city},{' '}
                  {shippingInfo.zipCode}, {shippingInfo.country}
                </strong>
              </p>
            </ListGroupItem>

            <ListGroupItem>
              <h2>Payment</h2>
              <strong>Method: {paymentInfo}</strong>
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row className="align-items-center">
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid></Image>
                        </Col>
                        <Col>
                          <Link to={`/products/${item.id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {' '}
                          {item.qty} x $ {item.price} ={' '}
                          {'$ ' + item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>$ {cart.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>$ {cart.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col>$ {cart.taxPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total:</Col>
                  <Col>$ {cart.totalPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <div className="d-grid gap-2">
                  <Button
                    className="btn-grad"
                    type="button"
                    disabled={cartItems.length === 0}
                    onClick={placeOrderBtnHandler}
                  >
                    Place Order
                  </Button>
                </div>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
