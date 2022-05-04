import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, deleteItemFromCart } from '../actions/cartActions';
import {
  Row,
  Col,
  Button,
  Image,
  FormControl,
  ListGroup,
  ListGroupItem,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';

const CartScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const removeItemFromCartBtnHandler = (id) => {
    dispatch(deleteItemFromCart(id));
  };
  const checkoutBtnHandler = () => {
    navigate('/login?redirect=shipping');
  };

  useEffect(() => {
    dispatch(addItemToCart(id, qty));
  }, [dispatch, id, qty]);

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="light">
            Your Karakum cart is empty.{' '}
            <Link to="/" style={{ textDecoration: 'none' }}>
              {' '}
              Go Back
            </Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroupItem key={item.id}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col md={3}>
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={`/product/${item.id}`}
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>$ {item.price}</Col>
                  <Col md={2}>
                    <FormControl
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addItemToCart(item.id, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((p) => (
                        <option key={p + 1} value={p + 1}>
                          {p + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeItemFromCartBtnHandler(item.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                item
              </h2>
              <p>
                Total: $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-grid gap-2">
                <Button
                  className="btn-grad"
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={checkoutBtnHandler}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
