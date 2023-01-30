import React, { createContext, useReducer} from "react";
import AppReducer from './AppReducer'

const initialState = localStorage.getItem('token')?{
    token: localStorage.getItem('token'),
    isAuthenticated:true
}:{
    token:'',
    isAuthenticated:false
}


export const GlobalContext = createContext(initialState)



export const GlobalProvider =  ({children})=>{
    const [state,dispatch] = useReducer(AppReducer,initialState)
    

    function setToken(token){
        localStorage.setItem('token',token)
        dispatch({
            type:'setToken',
            payload:token
        })
    }
    function removeToken(token){
        localStorage.removeItem('token',token)
        dispatch({
            type:'removeToken',
        })
    }


    return (
        <GlobalContext.Provider value={{
            token:state.token,
            isAuthenticated:state.isAuthenticated,
            setToken,
            removeToken
        }}>
            {children}
        </GlobalContext.Provider>
    )
}