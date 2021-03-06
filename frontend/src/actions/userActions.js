import axios from "axios";
import { ORDER_USER_RESET } from "../constants/orderConstants";
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_RESET, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_UPDATE__FAIL, USER_PROFILE_UPDATE__REQUEST, USER_PROFILE_UPDATE__SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from "../constants/userConstants"

export const userLoginAction = (email, password) => async (dispatch) => {
    try {

        dispatch({
            type: USER_LOGIN_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login', {email, password}, config);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch(err) {
        console.log(err);
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const userLogoutAction = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingInfo');
    localStorage.removeItem('paymentInfo');

    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: ORDER_USER_RESET
    })
    dispatch({
        type: USER_PROFILE_RESET
    })
    dispatch({
        type: USER_LIST_RESET
    })

    document.location.href = '/login';
}

export const userSignupAction = (name, email, password) => async (dispatch) => {
    try {

        dispatch({
            type: USER_SIGNUP_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users', {name, email, password}, config);

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch(err) {
        console.log(err);
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const userProfileAction = (id) => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_PROFILE_REQUEST
        });

        const { userLogin: {userLoginInfo}} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userLoginInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/users/${id}`, config);

        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data
        });

    } catch(err) {
        console.log(err);
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const userUpdateProfileAction = (user) => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_PROFILE_UPDATE__REQUEST
        });

        const { userLogin: {userLoginInfo}} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userLoginInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/users/profile`, user, config);

        dispatch({
            type: USER_PROFILE_UPDATE__SUCCESS,
            payload: data
        });

    } catch(err) {
        console.log(err);
        dispatch({
            type: USER_PROFILE_UPDATE__FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const userListAction = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_LIST_REQUEST
        });

        const { userLogin: {userLoginInfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userLoginInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/users`, config);

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        });

    } catch(err) {
        console.log(err);
        dispatch({
            type: USER_LIST_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const userDeleteAction = (id) => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_DELETE_REQUEST
        });

        const { userLogin: {userLoginInfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userLoginInfo.token}`
            }
        }

        await axios.delete(`/api/users/${id}`, config);

        dispatch({
            type: USER_DELETE_SUCCESS
        });

    } catch(err) {
        console.log(err);
        dispatch({
            type: USER_DELETE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}


export const userUpdateAction = (user) => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_UPDATE_REQUEST
        });

        const { userLogin: {userLoginInfo}} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userLoginInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/users/${user._id}`, user, config);

        dispatch({
            type: USER_UPDATE_SUCCESS,
        });

        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data
        });

    } catch(err) {
        console.log(err);
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}