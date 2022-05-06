import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="search"
        placeholder="Search for products..."
        onChange={(e) => setKeyword(e.target.value)}
        className="ms-sm-2 search-input"
      ></Form.Control>
      <Button className="search-btn" type="submit" variant="outline-light">
        <i className="fa-solid fa-magnifying-glass"></i>
      </Button>
    </Form>
  );
};

export default Search;
