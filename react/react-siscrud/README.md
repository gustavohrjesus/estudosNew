# CRIANDO O PACOTE LOGIN
#### Vídeos de referências:
1. [VCunhaCode - Página de Login e Cadastro utilizando React Js, Node e MySQL (Simples)](https://www.youtube.com/watch?v=F_mXVI8Dalg)
2. [Matheus Battisti - Autenticacao Com Node, MongoDB com JWT](https://www.youtube.com/watch?v=qEBoZ8lJR3k)
3. [Celke - Como criar rota restrita e como usar o JWT com Nodejs](https://www.youtube.com/watch?v=F4SEC4f5hAE)
4. [Felipe-DevSamurai - Login React-Criando um sist de autenticação completo](https://www.youtube.com/watch?v=5KqP3Vx8Y4s&t=4234s)
5. [Dev Junior Alvers - Quando não utilizar estados no React](https://www.youtube.com/watch?v=uHxC8FH3l10)


## Para criar o pacote da aplicação, rodamos a linha abaixo passando como parâmetro final o nome que o pacote terá:
### `npx create-react-app login`

# INICIALIZANDO O APLICATIVO
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# ADICIONANDO O PACOTE DE FORMULARIOS FORMIK E O DE VALIDAÇÃO YUP (Devemos estar dentro do nosso pacote da aplicacao para rodar os comandos)
### `npm add formik yup`
***

# CRIANDO A PARTE BACK END
## Criamos os diretórios _client_ e _server_ para separar a parte front end da back end. Toda a parte acima descrita nesse Readme.md foi alocada dentro do diretório _client_

## Após separados, vamos trabalhar na parte BACK END
### Pelo terminal acessemos o diretório _server_ e rodamos o comando abaixo para criar o arquivo "package.json" do diretório server
`npm init `

## INSTALAÇÃO DE PACOTES PARA O BACKEND DO PROJETO
`npm add mysql express nodemon cors`

## Para INICIAR o server backend:
`node index.js`

## CRIAÇÃO DO BD MYSQL (CRIAMOS DENTRO DO BD _teste_, a table _usuarios_)
```
CREATE TABLE `teste`.`usuarios` ( `idusuarios` INT NOT NULL AUTO_INCREMENT , `email` VARCHAR(45) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL , `password` VARCHAR(200) CHARACTER SET utf8 COLLATE utf8_swedish_ci NOT NULL , PRIMARY KEY (`idusuarios`)) ENGINE = MyISAM;
```

### PARA TESTAR A CONEXÃO COM O BANCO, FAZ-SE UM INSERT, PELO ARQUIVO INDEX.JS, CONFORME ABAIXO:
```
// TESTAR CONEXAO COM O BD (necessario atualizar a pag do server: localhost:3001) BLOCO ABAIXO FUNCIONA
app.get('/', (req, res) => {
     db.query( "INSERT INTO usuarios (email, password) VALUES ('gustavo@gmail.com', '123456')", 
               (err, result) => {
                 if(err) console.log(err)
               }
             )
})
```

## INSTALAÇÃO DA BIBLIOTECA AXIOS, QUE CONECTA O FRONT COM O BACKEND DO PROJETO
`npm add axios`

## INSTALAÇÃO DA BIBLIOTECA DE CRIPTOGRAFIA BCRYPT
`npm add bcrypt`
***

# BIBLIOTECAS ABAIXO ADICIONADAS BASEANDO-SE NO VÍDEO (2) - TODAS ADD NO SERVER (BACKEND)

## INSTALAÇÃO DA BIBLIOTECA __dotenv__ QUE SERVE PARA TERMOS UM ARQUIVO DE CONFIGURAÇÃO DA NOSSA MÁQUINA, INDICA AS CHAVES DE API, DOMINIOS DE BANCOS DE DADOS (USUARIOS, BD). O ARQUIVO *NÃO É VERSIONADO*
`npm install dotenv`

## INSTALAÇÃO DA BIBLIOTECA __jsonwebtoken__ SERVE PARA MANUSEAR O TOKEN. CRIA TANTO O TOKEN PARA USUÁRIO COMO VERIFICA O TOKEN PASSADO PELO USUÁRIO, PARA VERIFICAR SE É VÁLIDO OU NÃO
`npm install jsonwebtoken`

## INSTALAÇÃO DO ROUTER-DOM - no lado client
`npm install react-router-dom `

***
# OBSERVAÇÃO E ERROS NA INSTALAÇÃO DOS PACKS PELO package.json
## Baixar o pacote nvm no site abaixo:
(NVM - versions)[https://github.com/coreybutler/nvm-windows/releases]
#### Após, descompactar e instalar.

## LOCAL DE INSTALAÇÃO NO DELL:
C:\Users\Users\AppData\Roaming\nvm

## LOCAL ONDE SERÁ SETADO O SIMBLINK DO NODE.JS
C:\Program Files\nodejs

## APÓS FAZER ISSO, VAMOS DAR UPDATE NO NODE.JS (escolhemos a vs. 16.16.0):
Abrir o DOS como administrador e digite a linha abaixo:
`nvm install 16.16.0`

## APÓS INSTALADO, VAMOS VERIFICAR A LISTA DE NODE QUE TEMOS INSTALADOS:
`nvm list`

## APÓS VERIFICADO, VAMOS MUDAR PARA A VERSÃO MAIS NOVA, INSTALADA:
`nvm use 16.16.0`


## SOLUCIONANDO O PROBLEMA NODE_SKIP_PLATFORM_CHECK:
1. Clique com o botão direito sobre "Meu Computador" e clique em "Propriedades"
2. Na janela que se abrir, clique em "Configurações avançadas do sistema"
3. Na nova janela, clique em "Variáveis de ambiente",
4. Então, em "Variáveis do sistema", clique no botão "Novo..." e adicione as informações abaixo:
	* Nome da variável: NODE_SKIP_PLATFORM_CHECK
	* Valor da variável: 1

Aplique e salve, fechando no botão Ok.
