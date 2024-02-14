import React, { useState } from "react";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"

//* PAGINAS DO SISTEMA
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import { AuthContext } from "./contexts/auth";

const AppRoutes = () => {
    const [user, setUser] = useState(null)

    const login = (email, password) => {
        console.log("login auth", { email, password } )
        setUser( { id: "123", email } ) // usuario FAKE para teste, usado em <AuthContext.Provider ... !!user
    }
    //! !!user é igual a Bolean(user)

    const logout = () => {
        console.log("logout")
    }

    return (
        <Router>
            <AuthContext.Provider value={{ authenticated: !!user, user, login, logout }} >
                <Routes>
                    <Route exact path="/login" element={ <LoginPage /> } />
                    <Route exact path="/" element={ <HomePage/> } />
                </Routes>
            </AuthContext.Provider>
        </Router>
    )
}

export default AppRoutes