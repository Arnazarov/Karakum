import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts, deleteProductAction } from '../actions/productActions';

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const login = useSelector((state) => state.userLogin);
  const { userLoginInfo } = login;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    if (userLoginInfo && userLoginInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userLoginInfo, successDelete]);

  const deleteBtnHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProductAction(id));
    }
  };

  const createBtnHandler = () => {};
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Product List</h1>
        </Col>
        <Col className="text-end">
          <Button
            className="my-3 btn-secondary"
            style={{ borderWidth: 'medium', borderColor: 'black' }}
            onClick={createBtnHandler}
          >
            <i className="fa-solid fa-circle-plus"></i> Add
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader></Loader>}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table bordered hover responsive size="sm" className="text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>IN STOCK</th>
              <th>EDIT/DELETE</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>$ {product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" size="sm">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteBtnHandler(product._id)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;