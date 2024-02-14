// javascript do index.htnl

// const { stat } = require("fs")

// const { response } = require("express") //! estava dando erro "require is not defined"

let id_user = 1
let colors = [
    {
        task_status:'new',
        select_bg_color: 'bg-white'
    },
    {
        task_status:'in progress',
        select_bg_color: 'bg-info'
    },
    {
        task_status:'canceled',
        select_bg_color: 'bg-danger'
    },
    {
        task_status:'done',
        select_bg_color: 'bg-success'
    }
]

window.onload = () => {
    // console.log("teste2")
    get_username(id_user)
    get_user_tasks(id_user)
}

// -------------------------------------------------------------
function get_username(id_user){
    fetch(`http://localhost:3000/user/${id_user}`)
    .then( response => {
        if( response.status === 200){
            // console.log(response.json())
            return response.json()
        } else {
            console.log("ERRO")
        }
    })
    .then( dados => {
        // console.log(dados[0])
        if(dados.length === 0){
            console.log('ERRO!')
        } else {
            // console.log(dados)
            document.querySelector("#username").textContent = dados[0].username
        }
    })
}

// -------------------------------------------------------------
function get_user_tasks(id_user, status = "all" ){ //! a parte do status foi adicionada na aula #027 //? Funcao chamada qdo change o status no filtro de pesq
    //* BLOCO PARA TESTE - DEBUG - video #027 - 11m00s
    // console.log(status) 
    // return
    //* BLOCO PARA TESTE - DEBUG - video #027 - FIM

    fetch(`http://localhost:3000/user/${id_user}/tasks/${status}`)
    .then( response => {
        if( response.status === 200){
            // console.log(response.json())
            return response.json()
        } else {
            console.log("ERRO")
        }
    })
    .then( tarefas => {
        // console.log(tarefas[0])
        if(tarefas.length === 0){
            // console.log('Não existem tasks!!')
            document.querySelector("#no_tasks").classList.remove("d-none")
            document.querySelector("#total_tasks").classList.add('d-none')
        } else {
            // console.log(tarefas)
            document.querySelector("#tasks_container").innerHTML = null


            tarefas.forEach(tarefa => {
                let color = colors.find( item => item.task_status == tarefa.task_status )
                // console.log(color.select_bg_color)

                let html = `<div class="col-12 border border-primary rounded p-3 shadow">
                                <div class="row align-items-center">
                                    <div class="col-8">
                                        <div class="d-flex align-itens-center">
                                            <h5 class="me-3 text-info"><i class="fa-solid fa-circle-chevron-right"></i></h5>
                                            <h5>
                                                ${tarefa.task_text}
                                            </h5>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <select id="task_status_${tarefa.id}" onchange="change_task_status(${tarefa.id})" class="form-select p-2 ${color.select_bg_color}">
                                            <option value="new" ${tarefa.task_status == 'new' ? 'selected' : ''}>New</option>
                                            <option value="in progress" ${tarefa.task_status == 'in progress' ? 'selected' : ''}>In progress</option>
                                            <option value="canceled" ${tarefa.task_status == 'canceled' ? 'selected' : ''}>Canceled</option>
                                            <option value="done" ${tarefa.task_status == 'done' ? 'selected' : ''}>Done</option>
                                        </select>
                                    </div>
                                    <div class="col-1 text-end"><span class="edit_link" onclick="edit_task(${tarefa.id})"><i class="fa-regular fa-pen-to-square me-2"></i>Edit</span></div>
                                    <div class="col-1 text-end"><span class="delete_link" onclick="delete_task(${tarefa.id})"><i class="fa-regular fa-trash-can me-2"></i>Delete</span></div>
                                </div>
                            </div>`

                let new_task = document.createElement('div')
                new_task.classList.add('row', 'mb-3') //equivalente ao <div class="row mb-3">                                
                new_task.innerHTML = html

                document.querySelector("#tasks_container").appendChild(new_task)
            });
            document.querySelector("#no_tasks").classList.add("d-none")
            document.querySelector("#total_tasks").classList.remove('d-none')
            document.querySelector("#total_tasks > div > h4 > span").textContent = tarefas.length
        }
    })
}

// -------------------------------------------------------------
function edit_task(id_task){
    const url = window.location.origin + "/frontend/edit_task.html?id_task=" + id_task
    console.log(url)
    window.location.href = url
}

// -------------------------------------------------------------
function delete_task(id_task){
    const url = window.location.origin + "/frontend/delete_task.html?id_task=" + id_task
    console.log(url)
    window.location.href = url
}

// -------------------------------------------------------------
function change_task_status(id_task){    
    let status = document.querySelector("#task_status_" + id_task).value
    /*
    id_user
    id_task
    status
    */
    // fetch(`http://localhost:3000/user/${id_user}/tasks/update_status/`, { //? somente precisamos do id_task e status para atualizar uma task
    fetch(`http://localhost:3000/user/tasks/update_status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ id_user, id_task, status })
        body: JSON.stringify({ id_task, status }) //? somente precisamos do id_task e status para atualizar uma task
    })
    .then( response => {
        // console.log(response)
        if( response.status === 200 ){
            return response.json()
        }
    })
    // .then( dados => {
    //     console.log(dados) //? recebe informação do server.js "updated ok"
    // })

    //? update select color based on task status
    let color_obj = colors.find( e => e.task_status == status )
    // console.log(color_obj)
    let select = document.querySelector( `#task_status_${id_task}` )

    let colors_tmp = colors.map( c => { return c.select_bg_color }) //? salva o array de cores existentes para que estas 
    select.classList.remove(...colors_tmp)                             //? classes (cores) sejam todas removidas. E ISSO PRECISA UTILIZAR O SPREAD ... (que passará a string com as classes)
    select.classList.add(color_obj.select_bg_color)                 //? para que somente a classe (cor) do status selecionada seja adicionada
    
}

// -------------------------------------------------------------
document.querySelector("#btn_new_task").addEventListener('click', () => {
    // const a = window.location.href // passa o endereço completo da chamada (/.../frontend/index.html)
    const url = window.location.origin + "/frontend/new_task.html?id_user=" + id_user
    console.log(url)
    window.location.href = url // qdo o btn "+ Nova Tarefa" for clicado, o usuário será redirecionado para a página "Nova Tarefa"
})

// -------------------------------------------------------------
document.querySelector("#select_filter").addEventListener('change', () => {
    let task_status = document.querySelector("#select_filter").value
    // console.log(task_status)
    get_user_tasks(id_user, task_status) //* BLOCO PARA TESTE - DEBUG - video #027 - 11m00s
})



/*/
<div class="row mb-3">
    <div class="col-12 border border-primary rounded p-3 shadow">
        <div class="row align-items-center">
            <div class="col-8">
                <div class="d-flex align-itens-center">
                    <h5 class="me-3 text-info"><i class="fa-solid fa-circle-chevron-right"></i></h5>
                    <h5>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    </h5>
                </div>
            </div>
            <div class="col-2">
                <select id="task_status" class="form-select p-2">
                    <option value="new">New</option>
                    <option value="in progress">In progress</option>
                    <option value="canceled">Canceled</option>
                    <option value="done">Done</option>
                </select>
            </div>
            <div class="col-1 text-end"><i class="fa-regular fa-pen-to-square me-2"></i>Edit</div>
            <div class="col-1 text-end text-danger"><i class="fa-regular fa-trash-can me-2"></i>Delete</div>
        </div>
    </div>
</div>
//*/