import { CART_ADD_ITEM, CART_DELETE_ITEM, CART_SAVE_PAYMENT_INFO, CART_SAVE_SHIPPING_INFO } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems : [], shippingInfo: {} }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const itemToAdd = action.payload;

            const itemExistsInCart = state.cartItems.find(i => i.id === itemToAdd.id);

            if (itemExistsInCart) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.id === itemExistsInCart.id ? itemToAdd : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, itemToAdd]
                }
            }
        case CART_DELETE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.id !== action.payload)
            }

        case CART_SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }

        case CART_SAVE_PAYMENT_INFO:
            return {
                ...state,
                paymentInfo: action.payload
            }
            
        default: return state;
    }
}