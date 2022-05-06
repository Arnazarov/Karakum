import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { useParams } from 'react-router-dom';
import CustomPagination from '../components/CustomPagination';
import CustomCarousel from '../components/CustomCarousel';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { keyword, pageNumber = 1 } = useParams();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pageNumber: page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta></Meta>
      {!keyword ? (
        <>
          <h1>Top Products</h1>
          <CustomCarousel></CustomCarousel>
        </>
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product}></Product>
                </Col>
              );
            })}
          </Row>
          <CustomPagination
            pages={pages}
            pageNumber={page}
            keyword={keyword ? keyword : ''}
          ></CustomPagination>
        </>
      )}
    </>
  );
};

export default HomeScreen;
