require('dotenv').config()  // CHAMA O ARQUIVO QUE CONTEM INFORMACOES SENSIVEIS TAIS COMO USUARIO E SENHA DO BD - VIDEO 2

const express = require("express")
const app = express()
const mysql = require('mysql')
const cors = require('cors')

const bcrypt = require('bcrypt') //PARA CRIPTOGRAFAR SENHA
const saltRounds = 10;

const jwt = require('jsonwebtoken') // CRIAÇÃO E VALIDAÇÃO DE TOKEN - VIDEO 2
const { json } = require('express')

app.use(express.json()) // CONFIG JSON RESPONSE
app.use(cors())

//? DB_HOST=localhost
// DB_DATABASE=teste
// DB_USERNAME='root'
// DB_PASSWORD=''

//* VIDEO 2 - CONECTANDO NO BD USANDO AS INFOS DE USER E PASS DO ARQUIVO ".env"
const dbUser = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD

const db = mysql.createConnection({
    host: 'localhost',
    user: dbUser,
    password: dbPassword,    
    database: process.env.DB_DATABASE
})

app.post("/register", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password; // senha cadastrada para teste: 123456789

    //? VALIDATIONS - VIDEO 2
    if(!email){ //? ESSA VERIFICAÇÃO JÁ É FEITA NO FRONT END. AQUI SERIA USADA CASO NÃO TIVESSEMOS A VERIFICAÇÃO PELO FRONT. PODEMOS USAR ESSA VALIDAÇÃO NO POSTMAN (método POST)
        //! return res.status(422).json( {msg: "O email é obrigatório!"} ) // SERVIDOR TEM REQUISICAO, MAS OS DADOS NAO ESTAO OK
        res.send({ msg: "O email é obrigatório!" })
        return res.status(422)
    }
    //? VALIDATIONS - VIDEO 2

    // db.query("SELECT * FROM usuarios WHERE email = ?", [email], // [email] eh o parametro do ?
    await db.query("SELECT * FROM usuarios WHERE email = ?", [email], // [email] eh o parametro do ?
    (err, result) => {
        if (err){
            res.send( `Erro na verificacao se usuario existe: ${err}` )
        }
        if(result.length == 0){ // verifica se o email ja existe. Se nao existe, sera igual a 0. Entao entra no IF e faz o cadastro
            // bcrypt.hash(password, saltRounds, (erro, hash) => {
            bcrypt.hash(password, saltRounds, (erro, hash) => {
                db.query( "INSERT INTO usuarios (email, password) VALUES (?, ?)", [email, hash], (err, response) => {
                    if(err){
                        // res.send(err)
                        res.send( {msg: "Aconteceu um erro no servidor. Tente novamente mais tarde - "+err} )
                        return res.status(500)
                    }
    
                    res.send({ msg: "Cadastrado com sucesso!" })
                    return res.status(200)
                })
            })
        } else {
            res.send( {msg: "Usuário já cadastrado!"} )
            return res.status(422)
            // return
        }
    })
})

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // const secret = ""
    // const token = ""

    //? VALIDATIONS - VIDEO 2
    if(!email){ //? ESSA VERIFICAÇÃO JÁ É FEITA NO FRONT END. AQUI SERIA USADA CASO NÃO TIVESSEMOS A VERIFICAÇÃO PELO FRONT. PODEMOS USAR ESSA VALIDAÇÃO NO POSTMAN (método POST)
        return res.status(422).json( {msg: "O email é obrigatório!"} ) // SERVIDOR TEM REQUISICAO, MAS OS DADOS NAO ESTAO OK
    }
    if(!password){ //? ESSA VERIFICAÇÃO JÁ É FEITA NO FRONT END. AQUI SERIA USADA CASO NÃO TIVESSEMOS A VERIFICAÇÃO PELO FRONT. PODEMOS USAR ESSA VALIDAÇÃO NO POSTMAN (método POST)
        return res.status(422).json( {msg: "A senha é obrigatória!"} ) // SERVIDOR TEM REQUISICAO, MAS OS DADOS NAO ESTAO OK
    }
    //? VALIDATIONS - VIDEO 2

    //? CHECK IF USER EXISTS
    await db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
        if(err){
            req.send(err)
            return res.status(404)
        }
        // res.send(result)
        if(result.length > 0){ // Se maior que zero, temos um usuario (email) e senha validos no bd
            bcrypt.compare(password, result[0].password, 
                (erro, resul) => {
                    // * res.send(result); // Se data: "true", senha correta
                    if(resul){
                        const secret = process.env.SECRET
                        const token = jwt.sign(
                            {
                                id: result[0].idusuarios,
                            }, 
                            secret,
                            {
                                expiresIn: 30 // token expira 30 segundos
                                // expiresIn: '7d' // token expira 7 dias
                            }
                        )
                        return res.json({
                            erro: false,
                            msg: `Usuario ID: ${result[0].idusuarios} - Email: ${result[0].email} logado com sucesso!`,
                            // userId: result[0].id,
                            userBD: result[0],
                            token: token
                        })
                        // return res.status(200).json({ msg: `Usuario ID: ${result[0].idusuarios} - Email: ${result[0].email} logado com sucesso`, token }) //VIDEO 2
                        // res.send({ msg: `Usuario ${result[0].email} logado com sucesso`, token })
                        // return res.status(200).json({ msg: "NÃO LOCALIZADO!" }) //VIDEO 2
                        // return res.status(200)

                    } else {
                        // return res.status(422).json({ msg: `Senha incorreta!` }) //VIDEO 2

                        //? res.send({ msg: "Senha incorreta!" })
                        //? return res.status(422)
<<<<<<< HEAD
                        return res.json({ // VIDEO 5
                            erro: true,
                            msg: "Senha incorreta!"
                        })
=======
                        // res.statusCode = 422
                        return res.json({ // VIDEO 5
                            erro: true,
                            msg: "app.post LOGIN - bcrypt: Senha incorreta!"
                        })
                        
>>>>>>> 396790433baba736382453a58984c8669e0af4a3
                    }
                })
                    // res.send( {msg: "Usuario logado com sucesso!"} )
        } else {
            //? res.send( {msg: "Usuario e/ou senha invalidos!"} )
            //? return res.status(422)
<<<<<<< HEAD
            return res.json({ // VIDEO 5
                erro: true,
                msg: "Usuario e/ou senha invalidos!"
            })

=======
            // res.statusCode = 422
            return res.json({ // VIDEO 5
                erro: true,
                msg: "app.post LOGIN: Usuario e/ou senha invalidos!"
            })
            // res.statusCode = 422
>>>>>>> 396790433baba736382453a58984c8669e0af4a3
            // return res.status(422).json({ msg: `Usuario e/ou senha invalidos!` }) //VIDEO 2
        }
    })
})

app.get('/users', (req, res) => { //! No Postman, criamos: VARIABLE: "URL", INITIAL VALUE: "http://localhost:3001", CURRENT VALUE: "http://localhost:3001"
    //? CHECK IF USER EXISTS
    // console.log("CHEGOU  /USERS")
    db.query("SELECT * FROM usuarios", (err, result) => {
        if(err){
            req.send(err)
            return res.status(404)
        }
        // res.send(result)
        if(result.length > 0){ // Se maior que zero, temos um usuario (email) e senha validos no bd
            return res.json({
                erro: false,
                // msg: `Lista de Usuarios`,
                // users: result,
                userGetUsers: result,
                // token: token
            })
                
        } else {
            //? res.send( {msg: "Usuario e/ou senha invalidos!"} )
            //? return res.status(422)
<<<<<<< HEAD
            return res.json({ // VIDEO 5
                erro: true,
                msg: "Usuario e/ou senha invalidos!"
=======
            // res.statusCode = 422
            return res.json({ // VIDEO 5
                erro: true,
                msg: "GETUSERS: Usuario e/ou senha invalidos!"
>>>>>>> 396790433baba736382453a58984c8669e0af4a3
            })

            // return res.status(422).json({ msg: `Usuario e/ou senha invalidos!` }) //VIDEO 2
        }
    })
})

//* VIDEO 2 - Open Route - Public Route
app.get('/', (req, res) => { //! No Postman, criamos: VARIABLE: "URL", INITIAL VALUE: "http://localhost:3001", CURRENT VALUE: "http://localhost:3001"
    //! res.status(200).json({ msg: "Bem vindo a nossa API!" })
    console.log("CL - Bem-vindo a nossa API")
    res.send( {msg: "Bem vindo a nossa API!"} )
    return res.status(200)
})

//* VIDEO 2 - Private Route
// app.get("/user/:idusuario", async (req, res) => { //* ROTA PRIVADA SEM TOKEN
app.get("/user/:idusuario", checkToken, async (req, res) => { //* ROTA PRIVADA COM TOKEN - checkToken
    const idUser = req.params.idusuario // eh o id passado em :idusuario

    // Check if user exists
    await db.query("SELECT * FROM usuarios WHERE idusuarios = ?", [idUser], (err, resu) => {
    // await db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, resu) => {
        if(err){
            res.status(404).json({ msg: `Acesso restrito: ${err}` })
            // req.send(`Usuário não encontrado! Erro: ${err}`)
            // return res.status(404)
        }
        if(resu.length > 0){
            res.send( {msg: `Usuário localizado: ID ${idUser} - Email: ${resu[0].email}`} )
            return res.status(200)
        } else {
            res.send( {msg: `Usuario NÃO localizado: ID ${idUser}`} )
            return res.status(404)
            // return res.status(404).json({ msg: "NÃO LOCALIZADO!" }) //VIDEO 2
        }
    })
})

function checkToken (req, res, next){ // MIDDLEWARE que verifica se usuário tem TOKEN
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1] // Se existe authHeader, então divide authHeader pelos Espaços (" ") e pega o segundo parâmetro [1]
    //* Na linha acima, quando usamos SPLIT, transformamos a variável em um array e pegamos o índice 1 dela (segundo parâmetro)

    if( !token ){
        return res.status(401).json({ msg: "Acesso negado!" })
        // res.send({ msg: `Acesso negado` })
        // return res.status(401)
    }

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret) //? verifica se o token do usuário é válido, verificando com o nosso SECRET
        next() //? Se token válido, prossegue o processo
    } catch (error) {
        res.status(400).json({ msg: "Token inválido" })        
    }
}

app.listen(3001, () => {
<<<<<<< HEAD
    console.log("Rodando na porta 3001")
=======
    console.log("Rodando na porta 3001 - ok")
>>>>>>> 396790433baba736382453a58984c8669e0af4a3
})