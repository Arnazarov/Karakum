import axios from "axios"
import { CART_ADD_ITEM, CART_DELETE_ITEM, CART_SAVE_PAYMENT_INFO, CART_SAVE_SHIPPING_INFO } from "../constants/cartConstants";

export const addItemToCart = (id, qty) => async(dispatch, getState) => {
    try {
        const {data} = await axios.get(`/api/products/${id}`);
    
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                id: data._id,
                name: data.name,
                price: data.price,
                image: data.image,
                countInStock: data.countInStock,
                qty
            }
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch(err) {
        console.log(err.message);
    }
}

export const deleteItemFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_DELETE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const saveShippingInfo = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem('shippingInfo', JSON.stringify(data));
}

export const savePaymentInfo = (paymentMethod) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_INFO,
        payload: paymentMethod
    })

    localStorage.setItem('paymentInfo', JSON.stringify(paymentMethod));
}