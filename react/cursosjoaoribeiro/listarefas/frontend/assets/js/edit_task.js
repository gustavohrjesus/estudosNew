let id_task = null

//* AULA #023

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
            console.log('ERR0 - edit_task.js')
        }
    })
    .then( task => {
        document.querySelector("#text_task_text").value = task[0].task_text
        // console.log(task[0].task_text)
    })
}

document.querySelector("#btn_atualizar").addEventListener( 'click', () => {
    let task_text = document.querySelector("#text_task_text").value
    let error     = document.querySelector("#error")

    //? check if input is empty
    if(task_text == null || task_text == ''){
        error.textContent = "Preencha o campo de texto"
        error.classList.remove("d-none")
        // console.log('erro')
        return
    }

    //? check if length if lower then 100
    if(task_text.length > 100){
        error.textContent = "O texto dever ter menos que 100 caracteres!"
        error.classList.remove("d-none")
        // console.log('erro')
        return
    }

    //? AULA #024
    // update task in database
    fetch(`http://localhost:3000/user/tasks/update_task`, { //! FAZ UM FETCH EM server.js: `app.get("/user/tasks/get_task/:id_task", ( req, res ) => {`
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({ id_task, task_text })
    })
    .then( response => {
        if( response.status === 200){
            return response.json()
        }
    })

    //? AULA #024
    // redirect to homepage
    window.location.href = window.location.origin + "/frontend/index.html";
})