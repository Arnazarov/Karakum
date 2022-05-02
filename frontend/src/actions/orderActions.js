import {ORDER_CREATE_REQUEST, ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS} from '../constants/orderConstants'
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