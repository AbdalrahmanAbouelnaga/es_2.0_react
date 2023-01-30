import { createContext,useReducer } from "react";
import CartReducer from './CartReducer'



let initialState ={}


if (localStorage.getItem('cart')){
    initialState = {
        cart:JSON.parse(localStorage.getItem('cart'))
    }
}else {
    initialState = {
        cart:{
            items:[]
        }
    }
}


export const CartContext = createContext(initialState)


export const CartProvider = ({children})=>{
    const [state,dispatch] = useReducer(CartReducer,initialState)

    function addToCart (item){
        dispatch({
            type:'addToCart',
            payload:item
        })
    }
    function removeFromCart (id){
        dispatch({
            type:'removeFromCart',
            payload:id
        })
    }
    function clearCart (){
        dispatch({
            type:'clearCart',
        })
    }

    function decrementItem(item){
        dispatch({
            type:'decrementItem',
            payload:item
        })
    }


    return (
        <CartContext.Provider value={{
            cart:state.cart,
            addToCart,
            removeFromCart,
            clearCart,
            decrementItem
        }}>
            {children}
        </CartContext.Provider>
    )
}