import React, { createContext, useContext, useReducer } from 'react'
import { faker } from '@faker-js/faker';
import CartReducer from './Reducer';
import {  productReducer } from "./Reducer";

var CartContext = createContext();
faker.seed(9);
const Context = ({children}) => {
    const products = [...Array(20)].map(() => ({
        id : faker.string.uuid(),
        price :faker.commerce.price() ,
        product: faker.commerce.product(),
       img: faker.image.urlLoremFlickr({ category: 'food' }),
      //  instock:parseInt(faker.string.numeric()), 
        productname :   faker.commerce.productName() ,
        Desc :    faker.commerce.productDescription() ,
        ratings: parseInt(faker.string.numeric()),


    }))
    const [state, dispatch] = useReducer(CartReducer,{
        products : products,
        cart : []
    }
    )
    const [productState, productDispatch] = useReducer(productReducer, {
      
        searchQuery: "",
      });
      const addProduct = (product) => {
        dispatch({ type: 'ADD_PRODUCT', payload: product });
    };
     const deleteProduct = (dispatch, id) => {
      dispatch({ type: "DELETE_PRODUCT", payload: id });
    };
    const updateProduct = (dispatch, id, newData) => {
      dispatch({ type: "UPDATE_PRODUCT", payload: { id, newData } });
    };
  return (
    <CartContext.Provider value={{ state, dispatch, productState, productDispatch,addProduct,deleteProduct ,updateProduct}}>
      {children}
    </CartContext.Provider>
  );
}

export default Context

export const CartState = () => {
    return useContext(CartContext)
}
