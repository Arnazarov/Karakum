import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Image, Carousel, CarouselItem, Row, Col } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

const CustomCarousel = () => {
  const dispatch = useDispatch();

  const productsTop = useSelector((state) => state.productTop);
  const { loading, error, products } = productsTop;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader></Loader>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" variant="dark">
      {products.map((product) => (
        <CarouselItem key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid></Image>
            <Carousel.Caption className="carousel-caption">
              <h2>{product.name}</h2>
              <p>{product.description.split('.')[0] + '...'}</p>
            </Carousel.Caption>
          </Link>
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
