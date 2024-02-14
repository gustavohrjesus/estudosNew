
# LISTA DE TAREFAS
### ENDED at 2023.05.24

Uma aplicação frontend com HTML, CSS e JS puro para gerir tarefas.
No backend vamor ter uma API NodeJS + Express + MySQL para servir o frontend.

# BASE DE DADOS

    users
        id
        username
        passwrd
        created_at
        updated_at
    ```
    CREATE TABLE `bd_tasks`.`users` ( `id` INT(10) NOT NULL AUTO_INCREMENT , `username` VARCHAR(50) NOT NULL , `passwrd` VARCHAR(100) NOT NULL , `created_at` DATETIME NULL , `updated_at` DATETIME NULL , PRIMARY KEY (`id`)) ENGINE = MyISAM;
    ```

    tasks
        id
        id_user
        task_text
        task_status( new | in progress | canceled | done )
        created_at
        updated_at
    ```
    CREATE TABLE `bd_tasks`.`tasks` ( `id` INT NOT NULL AUTO_INCREMENT , `id_user` INT NOT NULL , `task_text` VARCHAR(100) NOT NULL , `task_status` VARCHAR(30) NOT NULL , `created_at` DATETIME NULL , `updated_at` DATETIME NULL , PRIMARY KEY (`id`)) ENGINE = MyISAM;
    ```


# TAREFAS A DESENVOLVER NO PROJETO

    FEITO > criar a estrutura inicial
    FEITO   - base do frontend ( htnl css js | bootstrap )
        - base do backend ( node + express + mysql ) com uma resposta padrão

    > no frontend
        - páginas necessárias para a navegação na nossa app.
        - pequenos testes de comunicação entre front e backend - utilização de Ajax (XMLhttprequest | fetch API )

## VÍDEO FULLSTACK #017 - PREPARAÇÃO DO SISTEMA PARA ATUALIZAÇÃO DO STATUS - PARTE 2
    > Quando houver o erro 500, no lado do servidor e, que no terminal, apareça algo como "Cannot read properties of undefined (readin...), a solução, n arquivo "server.js":
    ```
    app.use(express.json)
    ```
    > app.use(express.json()) //Informa ao Express que deve tratar o "body" de uma requisição como json

## VÍDEO FULLSTACK #012 - APRESENTAÇÃO DAS TAREFAS
    > criando uma task no BD
    ```
    INSERT INTO `tasks` (`id`, `id_user`, `task_text`, `task_status`, `created_at`, `updated_at`) VALUES (NULL, '1', 'texto da nossa tarefa', 'new', '2023-05-05 00:00:00', '2023-05-05 00:00:00');
    ```

## VÍDEO FULLSTACK #010 - RESOLUÇÃO DO ERRO DE CORS
    > npm install cors

## VÍDEO FULLSTACK #009 - REQUISIÇÃO DE AJAX E ERROS DE CORS
    > criando um usuário no BD
        ```
        INSERT INTO `users` (`id`, `username`, `passwrd`, `created_at`, `updated_at`) VALUES (NULL, 'user1', 'abc123', '2023-05-04 00:00:00', '2023-05-04 00:00:00');
        ```

## VÍDEO FULLSTACK #008 - CRIAÇÃO DO SERVIDOR NODEJS + EXPRESS + MYSQL
    > no backend
        - criar um servidor NodeJS + Express + MySQL
        ```
        npm install express
        npm install mysql
        npm install nodemon --save-dev
        ```
        - criar um endpoint inicial - testar comunicações



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

