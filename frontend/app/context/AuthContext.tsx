'use client'

import React, { useState, useReducer, useContext, useEffect, createContext } from "react"
import { useRouter } from 'next/navigation';
import axios from "axios"

export const AuthContext = createContext(undefined) as any

export const authReducer = (state: any, action: any) => {
    switch(action.type){
        case "LOGIN":
            return {user: action.payload}
        case "LOGOUT":
            return {user: null}
        default:
            return state

    }
}

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    const [cookieData, setCookieData] = useState()
    const [auth, setAuth] = useState()
    const router = useRouter()

    useEffect(() => {
        const getCookies = async() => {
        const cookie = await axios.get('/api/getCookies')
        const cookieData = cookie?.data
        console.log("My cookie",cookieData)

        if(!cookieData?.cookie){
            localStorage.removeItem('userData')
            return router.push('/get-started/find')
        }
        // console.log(cookieData)
        setCookieData(cookieData?.value)
    }
        getCookies()
    }, [])

    console.log(auth)

    useEffect(() => {
        // const localUser = localStorage.getItem('userData') as any
        // console.log(localUser)
        const user = JSON.parse(localStorage.getItem('userData') as any)

        if(user){
            dispatch({type: "LOGIN", payload: user})
        }
    }, [])
    

    console.log("Auth state:", state)
    return (
        <AuthContext.Provider value={{...state, dispatch, cookieData, auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = (): any => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useGeneralContext must be used within a GeneralContextProvider');
    }
    
    return context;
}