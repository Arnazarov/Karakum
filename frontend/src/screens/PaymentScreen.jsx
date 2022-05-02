import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import CheckoutLinks from '../components/CheckoutLinks';
import { savePaymentInfo } from '../actions/cartActions';

const PaymentShipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingInfo } = cart;

  if (!shippingInfo) {
    navigate('/shipping');
  }

  const [paymentInfo, setPaymentInfo] = useState('PayPal');

  const paymentBtnHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentInfo(paymentInfo));
    navigate('/placeorder');
  };

  return (
    <>
      <CheckoutLinks stepOne stepTwo stepThree></CheckoutLinks>
      <Container>
        <h1>Payment info</h1>
        <Form onSubmit={paymentBtnHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                value="PayPal"
                name="paymentInfo"
                checked
                onChange={(e) => {
                  setPaymentInfo(e.target.value);
                }}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="Stripe"
                id="Stripe"
                value="Stripe"
                name="paymentInfo"
                onChange={(e) => {
                  setPaymentInfo(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Button className="btn-grad" type="submit">
            Continue
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default PaymentShipping;
