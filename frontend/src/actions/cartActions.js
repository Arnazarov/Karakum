import axios from "axios"
import { CART_ADD_ITEM, CART_DELETE_ITEM } from "../constants/cartConstants";

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