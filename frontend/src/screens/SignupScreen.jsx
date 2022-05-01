import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { userLoginAction, userSignupAction } from '../actions/userActions';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Container from '../components/Container';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [message, setMessage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();

  const user = useSelector((state) => state.userSignup);
  const { error, loading, userLoginInfo } = user;

  useEffect(() => {
    if (userLoginInfo) {
      navigate(redirect);
    }
  }, [userLoginInfo, navigate, redirect]);

  const signUpBtnHandler = (e) => {
    e.preventDefault();

    if (password !== cPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(userSignupAction(name, email, password));
    }
  };

  return (
    <Container>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader></Loader>}
      <Form onSubmit={signUpBtnHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="cPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter your password"
            value={cPassword}
            onChange={(e) => {
              setCPassword(e.target.value);
            }}
          />
        </Form.Group>

        <Button className="btn-grad" type="submit">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            {' '}
            Sign in here
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupScreen;
