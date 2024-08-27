import React, { useState } from 'react'
import './CSS/LoginSignUp.css'

const LoginSignup = () => {

  const [state, setState] = useState("Login")
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  })

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const login = async() => {
    console.log("Login", formData);
    let responseData

    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(formData)
    }).then((response) =>response.json()).then((data)=>responseData = data)

    if(responseData.sucess){
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
    
  }
  
  const signUp = async() => {
    console.log("Sign Up", formData);
    let responseData
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(formData)
    }).then((response) =>response.json()).then((data)=>responseData = data)

    if(responseData.sucess){
      localStorage.setItem('auth-token', responseData.token)
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state ==="Sign Up" ? 
          <input type="text" placeholder='Seu Nome' name='username' value={formData.username} onChange={changeHandler} />
        :
       <></> }
          <input  type="email" name="email" value={formData.email} onChange={changeHandler} id="email" placeholder='Seu Email' />
          <input type="password" name="password" value={formData.password} onChange={changeHandler} id="senha" placeholder='Senha' />
        </div>
        <button onClick={() => {state === "Login"?login(): signUp()}}>Continuar</button>
        {state ==="Sign Up" ? 
         <p className="loginsignup-login">Já possue uma conta? <span onClick={() => {setState("Login")}}>Login</span></p>
        :
        <p className="loginsignup-login">Criar uma conta <span onClick={() => {setState("Sign Up")}}>Clique aqui</span></p> }
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>Para continuar, eu concordo com os termos e politicas de privacidade</p>
        </div>
      </div>

    </div>
  )
}

export default LoginSignup
