import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer}  from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userSignupReducer, userProfileReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers';
import { createOrderReducer, getOrderByIdReducer, getUserOrdersReducer, updateOrderWithPayReducer } from './reducers/orderReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    userProfile: userProfileReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: createOrderReducer,
    orderDetails: getOrderByIdReducer,
    orderPay: updateOrderWithPayReducer,
    orderListUser: getUserOrdersReducer,
})
const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingInfoFromLocalStorage = localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage,
        shippingInfo: shippingInfoFromLocalStorage
    },
    userLogin: {
        userLoginInfo: userInfoFromLocalStorage
    }
}
const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store; 