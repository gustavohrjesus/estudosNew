let user_id = null

window.onload = () => {
    // get id_user
    const url = new URL(window.location.href)
    // console.log(url) //exibe todos os parametros da URL passada
    // console.log(url.searchParams.get('id_user')) //* pega o id_user passado pela URL, em "searchParams"
    id_user = url.searchParams.get('id_user')
}

document.querySelector("#btn_guardar").addEventListener('click', () => {
    let task_text = document.querySelector("#text_task_text").value
    let error = document.querySelector("#error")

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

    //? AULA #022
    // stores new task in database
    fetch(`http://localhost:3000/user/tasks/new_task`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({ id_user, task_text })
    })
    .then( response => {
        if( response.status === 200){
            return response.json()
        }
    })

    //? AULA #022
    // redirect to homepage
    window.location.href = window.location.origin + "/frontend/index.html";

    // console.log(task_text)    
})