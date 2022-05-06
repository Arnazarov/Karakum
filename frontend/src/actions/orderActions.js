import {ORDER_CREATE_REQUEST, ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS, ORDER_GET_REQUEST, ORDER_GET_SUCCESS, ORDER_GET_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_USER_REQUEST, ORDER_USER_SUCCESS, ORDER_USER_FAIL, ORDER_GET_ALL_FAIL, ORDER_GET_ALL_SUCCESS, ORDER_GET_ALL_REQUEST, ORDER_DELIVERY_REQUEST, ORDER_DELIVERY_SUCCESS, ORDER_DELIVERY_FAIL} from '../constants/orderConstants'
import axios from "axios"

export const createOrderAction = (order) => async (dispatch, getState) => {
    try {

        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { userLogin: {userLoginInfo }} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userLoginInfo.token}`
            }
        }

        const { data } = await axios.post('/api/orders', order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    } catch(err) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const getOrderByIdAction = (id) => async (dispatch, getState) => {

    try {

        dispatch({type: ORDER_GET_REQUEST})

        const { userLogin: {userLoginInfo }} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userLoginInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: ORDER_GET_SUCCESS,
            payload: data
        })


    } catch(err) {
        dispatch({
            type: ORDER_GET_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }

}

export const updateOrderWithPayAction = (orderID, paymentSummary) => async (dispatch, getState) => {

    try {

        dispatch({type: ORDER_PAY_REQUEST})

        const { userLogin: {userLoginInfo }} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userLoginInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${orderID}/pay`, paymentSummary, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })


    } catch(err) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }

}

export const getUserOrdersAction = () => async (dispatch, getState) => {

    try {

        dispatch({type: ORDER_USER_REQUEST})

        const { userLogin: {userLoginInfo }} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userLoginInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/myorders`, config)

        dispatch({
            type: ORDER_USER_SUCCESS,
            payload: data
        })


    } catch(err) {
        dispatch({
            type: ORDER_USER_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }

}

export const getAllOrdersAction = () => async (dispatch, getState) => {

    try {

        dispatch({type: ORDER_GET_ALL_REQUEST})

        const { userLogin: {userLoginInfo }} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userLoginInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders`, config)

        dispatch({
            type: ORDER_GET_ALL_SUCCESS,
            payload: data
        })


    } catch(err) {
        dispatch({
            type: ORDER_GET_ALL_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }

}

export const updateOrderWithDeliveryAction = (order) => async (dispatch, getState) => {

    try {

        dispatch({type: ORDER_DELIVERY_REQUEST})

        const { userLogin: {userLoginInfo }} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userLoginInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config)

        dispatch({
            type: ORDER_DELIVERY_SUCCESS,
            payload: data
        })


    } catch(err) {
        dispatch({
            type: ORDER_DELIVERY_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }

}