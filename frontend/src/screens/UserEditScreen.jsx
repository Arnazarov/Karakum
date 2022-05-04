import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { userProfileAction, userUpdateAction } from '../actions/userActions';
import { Button, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Container from '../components/Container';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState('');

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { error, loading, user } = userProfile;

  const updatedUser = useSelector((state) => state.userUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = updatedUser;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/admin/userlist');
    } else {
      if (!user.name || user._id !== id) {
        dispatch(userProfileAction(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, dispatch, id, successUpdate, navigate]);

  const updateBtnHandler = (e) => {
    e.preventDefault();
    dispatch(
      userUpdateAction({
        _id: id,
        name,
        email,
        isAdmin,
      })
    );
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-2">
        &#706; Go Back
      </Link>
      <Container>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader></Loader>}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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

            <Form.Group className="mb-3" controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked);
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

export default UserEditScreen;
