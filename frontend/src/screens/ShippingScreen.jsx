import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import CheckoutLinks from '../components/CheckoutLinks';
import { saveShippingInfo } from '../actions/cartActions';

const ScreenShipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingInfo } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [country, setCountry] = useState(shippingInfo.country);
  const [zipCode, setZipCode] = useState(shippingInfo.zipCode);

  const shippingUpBtnHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ address, city, zipCode, country }));
    navigate('/payment');
  };

  return (
    <>
      <CheckoutLinks stepOne stepTwo></CheckoutLinks>
      <Container>
        <h1>Shipping info</h1>
        <Form onSubmit={shippingUpBtnHandler}>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="address"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="city"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="zipCode">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="zipCode"
              placeholder="Enter your postal code"
              value={zipCode}
              onChange={(e) => {
                setZipCode(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="country"
              placeholder="Enter your country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            />
          </Form.Group>

          <Button className="btn-grad" type="submit">
            Continue
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default ScreenShipping;
