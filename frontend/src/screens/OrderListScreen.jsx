import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userListAction, userDeleteAction } from '../actions/userActions';
import { Button, Table } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderListAdmin = useSelector((state) => state.orderListAdmin);
  const { loading, error, orders } = orderListAdmin;

  const login = useSelector((state) => state.userLogin);
  const { userLoginInfo } = login;

  useEffect(() => {
    if (userLoginInfo && userLoginInfo.isAdmin) {
      dispatch(userListAction());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userLoginInfo]);

  return (
    <>
      <h1>Order list</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table bordered hover responsive size="sm" className="text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>CUSTOMER</th>
              <th>ITEMS</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.id}</td>
                  <td>{order.itemsInOrder.length}</td>
                  <td>{order.totalCost}</td>
                  <td>
                    {order.isPaid ? (
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
                    {order.isDelivered ? (
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
                    <LinkContainer to={`/api/orders/${order._id}`}>
                      <Button variant="light" size="sm">
                        More info
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
