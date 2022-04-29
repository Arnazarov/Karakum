import { CART_ADD_ITEM, CART_DELETE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems : [] }, action) => {
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
        default: return state;
    }
}