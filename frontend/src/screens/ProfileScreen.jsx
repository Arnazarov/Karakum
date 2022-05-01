import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  userProfileAction,
  userUpdateProfileAction,
} from '../actions/userActions';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.userProfile);
  const { error, loading, user } = profile;

  const login = useSelector((state) => state.userLogin);
  const { userLoginInfo } = login;

  const updateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = updateProfile;

  useEffect(() => {
    if (!userLoginInfo) {
      navigate('/login');
    } else {
      if (!user.name) {
        dispatch(userProfileAction('profile'));
      } else {
        setName(userLoginInfo.name);
        setEmail(userLoginInfo.email);
      }
    }
  }, [userLoginInfo, navigate, dispatch, user]);

  const signUpBtnHandler = (e) => {
    e.preventDefault();

    if (password !== cPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        userUpdateProfileAction({ id: user._id, name, email, password })
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated!</Message>}
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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
