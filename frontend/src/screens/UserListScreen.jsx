import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userListAction, userDeleteAction } from '../actions/userActions';
import { Button, Table } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const login = useSelector((state) => state.userLogin);
  const { userLoginInfo } = login;

  const deleteUser = useSelector((state) => state.userDelete);
  const { success } = deleteUser;

  useEffect(() => {
    if (userLoginInfo && userLoginInfo.isAdmin) {
      dispatch(userListAction());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userLoginInfo, success]);

  const deleteBtnHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(userDeleteAction(id));
    }
  };
  return (
    <>
      <h1>User list</h1>
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
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>EDIT/DELETE</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fa-solid fa-check"
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i
                        className="fa-solid fa-xmark"
                        style={{ color: 'red' }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" size="sm">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteBtnHandler(user._id)}
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

export default UserListScreen;
