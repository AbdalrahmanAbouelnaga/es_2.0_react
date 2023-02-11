import React, { createContext, useReducer} from "react";
import axiosInstance from "../axios";
import AuthReducer from './AuthReducer'

let initialState = {}

if (sessionStorage.getItem('token')){
        initialState = {
            token:JSON.parse(sessionStorage.getItem('token')).token,
            isAuthenticated:true,
        }
    }else {
    initialState = {
        token: '',
        isAuthenticated:false,
    }
}


export const AuthContext = createContext(initialState)



export const AuthProvider =  ({children})=>{
    const [state,dispatch] = useReducer(AuthReducer,initialState)
    

    function setToken(token){
        sessionStorage.setItem('token',JSON.stringify({"token":token}))
        dispatch({
            type:'setToken',
            payload:token
        })
    }
    function removeToken(){
        sessionStorage.clear()
        dispatch({
            type:'removeToken',
        })
    }


    return (
        <AuthContext.Provider value={{
            token:state.token,
            isAuthenticated:state.isAuthenticated,
            setToken,
            removeToken,
        }}>
            {children}
        </AuthContext.Provider>
    )
}