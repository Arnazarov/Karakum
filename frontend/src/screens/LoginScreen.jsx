import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { userLoginAction } from '../actions/userActions';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Container from '../components/Container';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const demo = location.search && `${location.search.split('=')[1]}`;
  const redirect =
    location.search !== '?demo=demo'
      ? `/${location.search.split('=')[1]}`
      : '/';
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin);
  const { error, loading, userLoginInfo } = user;

  useEffect(() => {
    if (userLoginInfo) {
      navigate(redirect);
    }
  }, [userLoginInfo, navigate, redirect]);

  useEffect(() => {
    if (demo === 'demo') {
      setPassword('demo123456');
      setEmail('demo@gmail.com');
    }
  }, [demo]);

  const signInBtnHandler = (e) => {
    e.preventDefault();
    dispatch(userLoginAction(email, password));
  };

  return (
    <Container>
      <h1>Log In</h1>
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
          <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>
            {' '}
            Sign up here
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
