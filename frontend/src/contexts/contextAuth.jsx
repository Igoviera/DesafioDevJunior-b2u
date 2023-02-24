import { useRouter } from 'next/router'
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const router = useRouter()
    const [ismodal, setIsmodal] = useState(false)
    const [ismodalEditar, setIsmodalEditar] = useState(false)
    const [editarCar, setEditarCar] = useState()
    const [user, setUser] = useState()
    const [loading, setLoandig] = useState(false)
    const [sucesso, setSucesso] = useState(false)
    const [isUser, setIsUser] = useState(false)
   

    useEffect(() => {
        const { 'nextauth.token': token } = parseCookies()
        if(token){
            setIsUser(true)
        }
    },[])

    async function editarCarr(data) {
        try {
            api().put(`/car/${editarCar.id}`, data)
            setSucesso(true)
        } catch (error) {
            console.log(error)
        }
    }

    async function cadastrarUser(data) {
        try {
            const user = await api().post('/user', data)
            if (user) {
                router.push('/login')
            }

        } catch (error) {
            console.log(error)
        }
    }

    async function signIn(data) {
        setLoandig(true)
        try {
            const token = await api().post('/auth/login', data)
            setCookie(undefined, 'nextauth.token', token.data.access_token, {
                maxAge: 60 * 60 * 1 // 1h
            })
            if (token.data.access_token) {
                setIsUser(true)
                setLoandig(false)
            }
            router.push('/')
        } catch (error) {
            setLoandig(false)
            console.log(error)
        }
    }

    async function me() {
        const { 'nextauth.token': token } = parseCookies()
        if (!token) return
        const user = await api().get('auth/me')
        if (user) {
            setLoandig(true)
            const dataUser = await api().get(`/user/${user.data.id}`)
            if (dataUser) {
                setLoandig(false)
                setUser(dataUser)
            }
        }
    }

    if (!user) {
        me()
    }

    const logout = () => {
        setIsUser(false)
        destroyCookie(null, 'nextauth.token')
        router.push('/')
    }

    return (
        <AuthContext.Provider value={{
            loading,
            setLoandig,
            signIn,
            logout,
            user,
            ismodal,
            setIsmodal,
            ismodalEditar,
            setIsmodalEditar,
            editarCar,
            setEditarCar,
            editarCarr,
            cadastrarUser,
            sucesso,
            isUser
        }}>{children}
        </AuthContext.Provider>
    )
}