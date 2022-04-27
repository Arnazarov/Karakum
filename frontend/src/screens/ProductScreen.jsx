import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Rating from './../components/Rating';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap';
import products from '../products';

const ProductScreen = () => {
  const { id } = useParams();
  const product = products.find((element) => element._id === id);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        &#8592; Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image
            className="image"
            src={product.image}
            alt={product.name}
            fluid
          />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>Price: $ {product.price}</ListGroupItem>
            <ListGroupItem>
              Description:{' '}
              {product.description.split('\n').map((i) => (
                <p>{i}</p>
              ))}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>$ {product.price + '.00'}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <div className="d-grid gap-2">
                  <Button
                    variant="outline-dark"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
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

export default ProductScreen;
