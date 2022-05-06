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
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="search"
        placeholder="Search products..."
        onChange={(e) => setKeyword(e.target.value)}
        className="ms-sm-2 me-sm-5"
      ></Form.Control>
      <Button className="btn-grad p-2" type="submit" variant="outline-success">
        Search
      </Button>
    </Form>
  );
};

export default Search;
