
# LISTA DE TAREFAS
### PARAMOS NO INÍCIO DA AULA #04

Uma aplicação frontend com HTML, CSS e JS puro para gerir tarefas.
No backend vamor ter uma API NodeJS + Express + MySQL para servir o frontend.

# BASE DE DADOS

    users
        id
        username
        password
        created_at
        updated_at

    tasks
        id
        id_user
        task_text
        task_status( new | in progress | canceled | done )
        created_at
        updated_at


# TAREFAS A DESENVOLVER NO PROJETO

    > criar a estrutura inicial
        - base do frontend ( htnl css js | bootstrap )
        - base do backend ( node + express + mysql ) com uma resposta padrão

    > no frontend
        - páginas necessárias para a navegação na nossa app.
        - pequenos testes de comunicação entre front e backend - utilização de Ajax (XMLhttprequest | fetch API )



## VÍDEO FULLSTACK #002 - PREPARAÇÃO DA ESTRUTURA INICIAL DO FRONTEND

    - estrutura base de cada página
            bootstrap ( slate ) bootswatch
            fontawesome

    - ver tarefas
        titulo
        filtro para escolher que tarefas queremos ver ( select )
        botao para adicionar tarefas
        ( mensagem sobre o facto de não existirem tarefas )
        caixa para tarefas
            - possibilidade de alterar o status, editar tarefa e eliminar tarefa
        parágrafo com o total de tarefas disponíveis ( de acordo com o filtro )

    - adicionar tarefa
        input:text com o texto da tarefa
        botão para cancelar
        botão para submeter tarefa

    - editar tarefa
        input:text para editar o texto
        botão para cancelar
        botão para submeter alteração

    ( eliminar será feito com uma modal )


## LINKS IMPORTANTES
[FONTAWESOME](https://fontawesome.com)
[BOOTSWATCH - SLATE - BOOTSTRAP](https://bootswatch.com/slate/)

