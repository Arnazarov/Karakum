import axios from "axios";
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../constants/userConstants"

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

    dispatch({
        type: USER_LOGOUT
    })
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

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch(err) {
        console.log(err);
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}