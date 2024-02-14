let id_task = null

//* AULA #025

window.onload = () => {
    //? get id_task
    const url = new URL(window.location.href)
    id_task = url.searchParams.get('id_task')  //* pega o id_task passado pela URL, em "searchParams". Podemos ver qdo inspecionamos elemento no navegador
    console.log(id_task)

    //? get task_data 
    fetch(`http://localhost:3000/user/tasks/get_task/${id_task}`) //! FAZ UM FETCH EM server.js: `app.get("/user/tasks/get_task/:id_task", ( req, res ) => {`
    .then( response => {
        if( response.status === 200){
            return response.json()
        } else {
            console.log('ERR0 - delete_task.js')
        }
    })
    .then( task => {
        // console.log(task)

        let status = {
            'new': "Nova tarefa",
            'in progress': 'Em progresso',
            'canceled': 'Cancelada',
            'done': 'Concluída'
        }

        document.querySelector("#task_text").textContent = task[0].task_text //? Usamos textContent qdo vamos passar a info para um campo Não Input
        // console.log(task[0].task_text)
        document.querySelector("#task_status").textContent = status[task[0].task_status]
    })
}

document.querySelector("#btn_eliminar").addEventListener('click', () => {
    console.log(`Eliminar a task #  ${id_task}`)

    //? delete task
    fetch(`http://localhost:3000/user/tasks/delete_task/${id_task}`) //! FAZ UM FETCH EM server.js: `app.get("/user/tasks/get_task/:id_task", ( req, res ) => {`
    .then( response => {
        if( response.status === 200){
            return response.json()
        } else {
            // console.log('ERR0 - delete_task.js - btn_eliminar')
            throw Error('erro')
        }
    })
    .then( () => {
        // redirect to homepage
        window.location.href = window.location.origin + "/frontend/index.html"
    })
    .catch( (Error) => {
        console.log('erro')
    })
})