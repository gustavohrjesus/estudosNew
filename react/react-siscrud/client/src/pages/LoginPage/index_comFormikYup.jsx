import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import './index.css';

//* ! import Axios from 'axios'
import axios from 'axios'

import { AuthContext } from '../../contexts/auth'; //* VIDEO 4

const api = axios.create({ // BLOCO COPIADO DE UM OUTRO PROJETO POIS O AUTOR DESSE NÃO FEZ USO DISSO. SEM ISSO TINHAMOS O ERRO DE NETWORK, DO AXIOS
  baseURL: 'http://localhost:3001' // url para acessar o Middleware do projeto feito em Node
})
// */

// function App() {
function LoginPage() {
  //* VIDEO 4 - as infos abaixo vêm do AuthContext.Provider em AppRoutes.jsx
  const { authenticated, login } = useContext(AuthContext) // passa essas infos para o AppRoutes consumir estas infos em <AuthContext.Provider...
                  // para verificar se o usuario está autenticado ou não, podendo ou não utilizar as rotas dentro da tag <AuthContext.. ou não
  //* VIDEO 4
  const [email2, setEmail2] = useState("")        // Video 4
  const [password2, setPassword2] = useState("")  // Video 4

  const handleClickRegister = (values) => {
    api.post("/register", { // Entao chamamos "api" nessa linha. Passa os valores email e pass para /server/index.js: app.post("/register")...
      email: values.email,
      password: values.password
    }).then( (response) => {
      alert(response.data.msg)
    })
  }

  const handleClickLogin = (values) => {
    alert("Valor no clique login: "+values.email)
    setEmail2(values.email) // setando somente depois do segundo clique no botão de login
    setPassword2(values.password) // setando somente depois do segundo clique no botão de login
    //* VIDEO 4
    console.log("submit", { email2, password2} )
    login(email2, password2) // VIDEO 4 - integracao com o meu contexto / api

    //* VIDEO 1
    api.post("/login", { // Passa os valores email e pass para /server/index.js: app.post("/login")...
      email: values.email,
      password: values.password
    }).then( (response) => {
      alert(response.data.msg) // RESPONSE vem do /server/index.js : app.post("/login", (req, res) => {
    })

    
  }

  /* //*! Abaixo seria o handleClickLogin do Video 4 - BEGIN
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("submit", { email, password } )
    }
    /* //*! Abaixo seria o handleClickLogin do Video 4 - END
  */
  // console.log(values)
  // */

  const validationLogin = yup.object().shape({
    email: yup.string().email("Não é um email").required("Este campo é obrigatório!"),
    password: yup.string().min(8, "Senha deve ter 8 caracteres").required("Este campo é obrigatório!")
  })
  const validationRegister = yup.object().shape({
    email: yup.string().email("Não é um email").required("Este campo é obrigatório!"),
    password: yup.string().min(8, "Senha deve ter 8 caracteres").required("Este campo é obrigatório!"),
    confirmPassword: yup.string().oneOf( [yup.ref("password"), null], "As senhas não são iguais!")
  })

  return (
    <div className="container">
      <h1>Login</h1>
      {/* <p>{String(authenticated)}</p> */}
      <Formik initialValues={{}}
              validationSchema={validationLogin}               
              onSubmit={handleClickLogin}      
      >
        <Form className='login-form'>
        <div className='login-form-group'>
          <Field className='form-field' name="email" placeholder="Email" />
          <ErrorMessage className='form-error' component="span" name="email" />
        </div>

        <div className='login-form-group'>
          <Field className='form-field' name="password" placeholder="Senha" />
          <ErrorMessage className='form-error' component="span" name="password" />
        </div>

        <button className='button' type='submit'>Login</button>
        </Form>
      </Formik>

      {/* ** FORM DO CADASTRO **** */}
      <h1>Cadastro</h1>
      <Formik initialValues={{}}
              validationSchema={validationRegister}               
              onSubmit={handleClickRegister}      
      >
        <Form className='login-form'>
        <div className='login-form-group'>
          <Field className='form-field' name="email" placeholder="Email" />
          <ErrorMessage className='form-error' component="span" name="email" />
        </div>

        <div className='login-form-group'>
          <Field className='form-field' name="password" placeholder="Senha" />
          <ErrorMessage className='form-error' component="span" name="password" />
        </div>
        <div className='login-form-group'>
          <Field className='form-field' name="confirmPassword" placeholder="Confirme sua senha" />
          <ErrorMessage className='form-error' component="span" name="confirmPassword" />
        </div>

        <button className='button' type='submit'>Cadastrar</button>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginPage;
