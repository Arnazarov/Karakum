import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  userProfileAction,
  userUpdateProfileAction,
} from '../actions/userActions';
import { getUserOrdersAction } from '../actions/orderActions';
import { Row, Col, Button, Form, Table } from 'react-bootstrap';
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

  const orderList = useSelector((state) => state.orderListUser);
  const {
    orders,
    loading: loadingOrderList,
    error: errorOrderList,
  } = orderList;

  useEffect(() => {
    if (!userLoginInfo) {
      navigate('/login');
    } else {
      if (!user.name) {
        dispatch(userProfileAction('profile'));
        dispatch(getUserOrdersAction());
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
      <Col></Col>
      <Col md={8}>
        <h2>My Orders</h2>
        {loadingOrderList ? (
          <Loader></Loader>
        ) : errorOrderList ? (
          <Message variant="danger">{errorOrderList}</Message>
        ) : (
          <Table
            className="text-center"
            striped
            hovered
            bordered
            responsive
            size="sm"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((o) => (
                  <tr key={o._id}>
                    <td>{o._id}</td>
                    <td>{o.created_at.substring(0, 10)}</td>
                    <td>$ {o.totalCost}</td>
                    <td>
                      {o.isPaid ? (
                        o.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fa-solid fa-xmark"
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {o.isDelivered ? (
                        o.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fa-solid fa-xmark"
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${o._id}`}>
                        <i className="fa-solid fa-receipt"></i>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
