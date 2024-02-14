import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import { getUsers } from "../../services/api";

const HomePage = () => {
    const { authenticated, logout } = useContext(AuthContext) // recupera o logout do AuthContext

    const [users, setUsers] = useState( [] )
    const [loading, setLoading] = useState(true)
    useEffect( () => {
        //* ABAIXO, FUNCAO ANONIMA PARA USAR ASYNC AWAIT
        ( async () => { 
            const response = await getUsers()  //? vem de services/api
            // console.log("HOMEPAGE-> index.jsx: "+ response.data)
            console.log("HOMEPAGE-> index.jsx: "+ Object.keys(response).length)
            console.log(response.data.userGetUsers) // userGetUsers // vem de server/index.js
            // setUsers(response.data)
            setUsers(response.data.userGetUsers) // userGetUsers // vem de server/index.js
            setLoading(false)
        })()
        //* ACIMA, FUNCAO ANONIMA PARA USAR ASYNC AWAIT
    }, [])

    const handleLogout = () => {
        logout()
    }

    if( loading ){
       return <div className="loading">Carregando os dados...</div>
    }

    return (
        <>
            <h1>Home Page</h1>
            {/* <p> {String(authenticated)} </p> // era usado antes de termos os dados pegos do BD */}
            <button onClick={ handleLogout }>Sair</button>
            <ul>
                {
                    users.map( (user) => (
                        <li key={ user.idusuarios }>
                            { user.idusuarios } - { user.email }
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default HomePage