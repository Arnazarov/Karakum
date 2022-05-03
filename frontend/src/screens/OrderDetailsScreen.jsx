import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderByIdAction } from '../actions/orderActions';
import {
  Card,
  Image,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import Message from '../components/Message';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';

const OrderDetailsScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  if (!loading) {
    // Calculate items price
    order.itemsCost = Number(
      order.itemsInOrder.reduce((acc, item) => acc + item.price * item.qty, 0)
    ).toFixed(2);
  }

  useEffect(() => {
    dispatch(getOrderByIdAction(id));
  }, [dispatch, id]);

  return loading ? (
    <Loader></Loader>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1 className="camel-case">
        <i className="fa-solid fa-tag"></i> Order #{order._id}
      </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Name: {order.user.name}</strong>
              </p>
              <p>
                <strong>
                  Email:{' '}
                  <a
                    href={`mailto:${order.user.email}`}
                    style={{ textDecoration: 'none' }}
                  >
                    {order.user.email}
                  </a>
                </strong>
              </p>
              <p>
                <strong>
                  Address: {order.shippingInfo.address},{' '}
                  {order.shippingInfo.city}, {order.shippingInfo.zipCode},{' '}
                  {order.shippingInfo.country}
                </strong>
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Payment</h2>
              <p>
                <strong>Method: {order.paymentInfo}</strong>
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
              {order.itemsInOrder.length === 0 ? (
                <Message>Order vanished</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.itemsInOrder.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row className="align-items-center">
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid></Image>
                        </Col>
                        <Col>
                          <Link
                            to={`/products/${item.id}`}
                            style={{ textDecoration: 'none' }}
                          >
                            {item.name}
                          </Link>
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
                  <Col>Items:</Col>
                  <Col>$ {Number(order.itemsCost).toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>$ {Number(order.shippingCost).toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col>$ {Number(order.taxCost).toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem className="fw-bold">
                <Row>
                  <Col>Total:</Col>
                  <Col>$ {Number(order.totalCost).toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderDetailsScreen;
