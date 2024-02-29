
const CartReducer = (state,action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };
      case "ADD_PRODUCT": 
      return {
        ...state,
        products: [...state.products, action.payload],
      };
      case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
   default : 
   return state;   
  }
}
export default CartReducer;

export const productReducer = (state, action) => {
  switch (action.type) {
    
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };
    
    default:
      return state;
  }
}

