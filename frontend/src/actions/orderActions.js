import {ORDER_CREATE_REQUEST, ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS, ORDER_GET_REQUEST, ORDER_GET_SUCCESS, ORDER_GET_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL} from '../constants/orderConstants'
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