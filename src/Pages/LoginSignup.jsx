import React from 'react'
import './CSS/LoginSignUp.css'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Seu Nome' />
          <input type="email" name="" id="" placeholder='Seu Email' />
          <input type="password" name="" id="" placeholder='Senha' />
        </div>
        <button>Continuar</button>
        <p className="loginsignup-login">Já possue uma conta? <span>Login</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>Para continuar, eu concordo com os termos e politicas de privacidade</p>
        </div>
      </div>

    </div>
  )
}

export default LoginSignup
