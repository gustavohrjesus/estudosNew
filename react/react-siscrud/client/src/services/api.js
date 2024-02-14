import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3001' // url para acessar o Middleware do projeto feito em Node
})

export const createSession = async (email, password) => {
    return api.post("/login", { // Passa os valores email e pass para /server/index.js: app.post("/login")...
        email: email,
        password: password
    })
    // .then( (response) => {
    //     alert(response.data.msg) // RESPONSE vem do /server/index.js : app.post("/login", (req, res) => {
    // })
}

export const getUsers = async () => {
    return api.get("/users")
}