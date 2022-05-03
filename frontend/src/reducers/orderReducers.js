import {ORDER_CREATE_REQUEST, ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS, ORDER_GET_REQUEST, ORDER_GET_SUCCESS, ORDER_GET_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RESET, ORDER_USER_REQUEST, ORDER_USER_SUCCESS, ORDER_USER_FAIL, ORDER_USER_RESET} from '../constants/orderConstants'

export const createOrderReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true }
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload}
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state;
    }
}

export const getOrderByIdReducer = (state = {loading:true, itemsInOrder: [], shippingInfo : {}}, action) => {
    switch(action.type) {
        case ORDER_GET_REQUEST:
            return {
                ...state,
                loading: true
            } 
        case ORDER_GET_SUCCESS:
            return {
                loading: false, success: true, order: action.payload
            }
        case ORDER_GET_FAIL: 
            return {
                loading: false, error:action.payload 
            }
        default:
            return state 
    }
}

export const updateOrderWithPayReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            } 
        case ORDER_PAY_SUCCESS:
            return {
                loading: false, success: true
            }
        case ORDER_PAY_FAIL: 
            return {
                loading: false, error:action.payload 
            }
        case ORDER_PAY_RESET: 
            return { }
        default:
            return state 
    }
}

export const getUserOrdersReducer = (state = { order: [] }, action) => {
    switch(action.type) {
        case ORDER_USER_REQUEST:
            return {
                loading: true
            } 
        case ORDER_USER_SUCCESS:
            return {
                loading: false, orders: action.payload
            }
        case ORDER_USER_FAIL: 
            return {
                loading: false, error:action.payload 
            }
        case ORDER_USER_RESET: 
            return {
                orders: []
            }
        default:
            return state 
    }
}