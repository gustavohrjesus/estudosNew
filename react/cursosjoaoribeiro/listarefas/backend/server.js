const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

// opcoes de conexao com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sumato17#',    
    database: 'bd_tasks'
})

const app = new express()
app.listen(3000, () => {
    console.log('Servidor iniciado!!')
})

app.use(cors())
app.use(express.json()) //Informa ao Express que deve tratar o "body" de uma requisição como json

// rotas
// ----------------------------------------------------------
app.get("/", (req, res)=> {
    // res.send('Olá Mundo!')
    connection.query( "SELECT COUNT(*) users FROM users", (err, results) => { // usado para testar conexão com BD - video #008
        if(err){
            res.send('MySQL connection error!')
        }
        res.send('MySQL connection OK!')
    })
})

// ----------------------------------------------------------
app.get("/user/:id", (req, res) => {
    // let id = req.params.id
    connection.query("SELECT id, username, created_at FROM users WHERE id = ?", [req.params.id],  (err, results) => {
        if(err){
            res.send('MySQL connection error!')
        }
        res.json(results)
    })
})

// ----------------------------------------------------------
app.get("/user/:id/tasks/:status", (req, res) => { //! o :status foi adicionado na aula #027
    if( req.params.status !== "all" ){
        connection.query("SELECT * FROM tasks WHERE id_user = ? AND task_status = ?", [req.params.id, req.params.status],  (err, results) => {
            if(err){
                res.send('MySQL connection error!')
            }
            res.json(results)
        })
    } else {
        connection.query("SELECT * FROM tasks WHERE id_user = ?", [req.params.id],  (err, results) => {
            if(err){
                res.send('MySQL connection error!')
            }
            res.json(results)
        })
    }
})

// ----------------------------------------------------------
// app.post("/user/:id/tasks/update_status/", (req, res) => { //! não usamos :id
app.post("/user/tasks/update_status/", (req, res) => {
    // console.log(req.params.id) //? somente precisamos do id_task e status para atualizar uma task (duas linhas abaixo)
    // console.log(req.body.id_task)
    // console.log(req.body.status)
    connection.query("UPDATE tasks SET task_status = ?, updated_at = NOW()  WHERE id = ?", [req.body.status, req.body.id_task],  (err, results) => {
        if(err){
            res.send('MySQL connection error - update_status!')
        }
    })
    res.json("updated ok")
})

//? AULA #22 ----------------------------------------------------------
app.post("/user/tasks/new_task/", (req, res) => { //! o '0', entre parenetes, em VALUES, é para ativar o autoincremento no BD
    connection.query("INSERT INTO tasks VALUES (0, ?, ?, 'new', NOW(), NOW())", [req.body.id_user, req.body.task_text],  (err, results) => {
        if(err){ //! O NOW() pega a data e hora atual do servidor
            res.send('MySQL connection error!')
        }
    })
    res.json("updated ok")
})

//? AULA #23 - PREPARAR A EDICAO DE UMA TAREFA ---  edit_task.js  --------------------------------------------------
app.get("/user/tasks/get_task/:id_task", ( req, res ) => {
    connection.query( "SELECT * FROM tasks WHERE id = ?", [req.params.id_task], ( err, results ) => {
        if (err){
            res.send('MySQL connection error. -> getTask: ' + err)
        }
        res.json( results )
    })
})

//? AULA #24 - ATUALIZAÇÃO DO TEXTO DE UMA TAREFA ---  edit_task.js  --------------------------------------------------
app.post("/user/tasks/update_task/", (req, res) => { //!
    connection.query("UPDATE tasks SET task_text = ?, updated_at = NOW() WHERE id = ?", [req.body.task_text, req.body.id_task],  (err, results) => {
        if(err){ //! O NOW() pega a data e hora atual do servidor
            res.send('MySQL connection error!')
        }
    })
    res.json("updated ok")
})

//? AULA #26 - DELETAR TAREFA ---  delete_task.js  --------------------------------------------------
app.get("/user/tasks/delete_task/:id_task", ( req, res ) => {
    connection.query( "DELETE FROM tasks WHERE id = ?", [req.params.id_task], ( err, results ) => {
        if (err){
            res.send('MySQL connection error. -> getTask: ' + err)
        }
        res.json( results )
    })
})