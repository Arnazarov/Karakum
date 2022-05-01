import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { userLoginAction } from '../actions/userActions';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Container from '../components/Container';

const LoginScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin);
  const { error, loading, userLoginInfo } = user;

  useEffect(() => {
    if (userLoginInfo) {
      navigate(redirect);
    }
  }, [userLoginInfo, navigate, redirect]);

  const signInBtnHandler = (e) => {
    e.preventDefault();
    dispatch(userLoginAction(email, password));
  };

  return (
    <Container>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader></Loader>}
      <Form onSubmit={signInBtnHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
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
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>

        <Button className="btn-grad" type="submit">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          No account?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            {' '}
            Sign up here
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
