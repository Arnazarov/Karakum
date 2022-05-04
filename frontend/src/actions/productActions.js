import axios from "axios";
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST});

        const { data } = await axios.get('/api/products');

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
        
    } catch(err) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST});

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
        
    } catch(err) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const deleteProductAction = (id) => async (dispatch, getState) => {
    try {

        dispatch({
            type: PRODUCT_DELETE_REQUEST
        });

        const { userLogin: {userLoginInfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userLoginInfo.token}`
            }
        }

        await axios.delete(`/api/products/${id}`, config);

        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        });

    } catch(err) {
        console.log(err);
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const createProductAction = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: PRODUCT_CREATE_REQUEST
        });

        const { userLogin: {userLoginInfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userLoginInfo.token}`
            }
        }

        const {data} = await axios.post(`/api/products`, {}, config);

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data 
        });

    } catch(err) {
        console.log(err);
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}


export const updateProductAction = (product) => async (dispatch, getState) => {
    try {

        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        });

        const { userLogin: {userLoginInfo}} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userLoginInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/product/${product._id}`, product, config);

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data 
        });

    } catch(err) {
        console.log(err);
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}