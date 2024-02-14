import React, { useState, useEffect, createContext } from "react";

import { useNavigate } from "react-router-dom";

import { api, createSession } from "../services/api"

export const AuthContext = createContext()

// export const AuthProvider = () => { // foi usado qdo usamos o arquivo AppRoutes_TodasRegrasAqui.jsx
export const AuthProvider = ( { children } ) => { //! children passa o conteudo contido dentre a tag <AuthProvider>, em AppRoutes.jsx
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true) // usado no useEffect para que a aplicacao espere a verificacao dentro do useEffect

    //* useEffect roda toda vez que a aplicacao inicializa
    useEffect( () => { // fazemos isso para qdo der F5 (atualizar a tela), nao perca as infos e volte para o login

        const recoveredUser = localStorage.getItem("user")
        const token = localStorage.getItem('token')

        if( recoveredUser && token ){
            setUser( JSON.parse(recoveredUser) )
            api.defaults.headers.Authorization = `Bearer ${token}`
        }
        setLoading(false)
    }, [] ) //! o primeiro parametro é executado qdo inicializo a aplicacao. O segundo é o array de monitoramento

    // const login = (email, password) => { //* era usado antes de autenticacao BD
    const login = async (email, password) => {
        const response = await createSession(email, password)
        
        if(response.data.erro){
            console.log("MSG: " + response.data.msg)
            alert(response.data.msg)
<<<<<<< HEAD
=======
            return
>>>>>>> 396790433baba736382453a58984c8669e0af4a3
        }
        //? era usado antes de autenticacao BD
        //console.log("login auth", { email, password } )
        /*
        //* api - criar session
        const loggedUser = {
            id: "123",
            email
        }
        //*/
        console.log("login - authJSX: ", response.data)

        //* api - criar session
        // console.log(response.data.user)
        const loggedUser = response.data.userBD // vem de server/index.js
        const token = response.data.token

        //! localstorage grava somente Strings
        localStorage.setItem("user", JSON.stringify(loggedUser))
        localStorage.setItem("token", token)

        api.defaults.headers.Authorization = `Bearer ${token}`

        //* if(password === "123456789"){ // usado no projeto antes de termos conexao com o BD. Era uma senha fake
            // setUser( { id: "123", email } ) // usuario FAKE para teste, usado em <AuthContext.Provider ... !!user
        setUser(loggedUser)
        navigate("/")
        //* }
    }
    //! !!user é igual a Bolean(user)

    const logout = () => {
        console.log("logout")

        localStorage.removeItem("user")
        localStorage.removeItem("token")
        api.defaults.headers.Authorization = null

        setUser(null)
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }} >
            { children }
        </AuthContext.Provider>
    )
}