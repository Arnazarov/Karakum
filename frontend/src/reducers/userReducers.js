import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_UPDATE__FAIL, USER_PROFILE_UPDATE__REQUEST, USER_PROFILE_UPDATE__SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from '../constants/userConstants'

export const userLoginReducer = (state = { }, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userLoginInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default: 
            return state;
    }
}

export const userSignupReducer = (state = { }, action) => {
    switch(action.type) {
        case USER_SIGNUP_REQUEST:
            return { loading: true }
        case USER_SIGNUP_SUCCESS:
            return { loading: false, userLoginInfo: action.payload }
        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload }
        default: 
            return state;
    }
}

export const userProfileReducer = (state = { user: {} }, action) => {
    switch(action.type) {
        case USER_PROFILE_REQUEST:
            return { ...state, loading: true }
        case USER_PROFILE_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        default: 
            return state;
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_PROFILE_UPDATE__REQUEST:
            return { loading: true }
        case USER_PROFILE_UPDATE__SUCCESS:
            return { loading: false, success:true, userProfileInfo: action.payload }
        case USER_PROFILE_UPDATE__FAIL:
            return { loading: false, error: action.payload }
        default: 
            return state;
    }
}