import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { listProductDetails } from '../actions/productActions';
import { Button, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Container from '../components/Container';

const ProductEditScreen = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  useEffect(() => {
    if (!product.name || product._id !== id) {
      dispatch(listProductDetails(id));
    } else {
      setName(product.name);
      setImage(product.image);
      setDescription(product.description);
      setBrand(product.brand);
      setCategory(product.category);
      setPrice(product.price);
      setCountInStock(product.countInStock);
    }
  }, [product, dispatch, id, navigate]);

  const updateBtnHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-2">
        &#706; Go Back
      </Link>
      <Container>
        <h1>Edit Product</h1>
        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={updateBtnHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product image"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product brand"
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="countInStock">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product amount"
                value={countInStock}
                onChange={(e) => {
                  setCountInStock(e.target.value);
                }}
              />
            </Form.Group>

            <Button className="btn-grad" type="submit">
              Update
            </Button>
          </Form>
        )}
      </Container>
    </>
  );
};

export default ProductEditScreen;
