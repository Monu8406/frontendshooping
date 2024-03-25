import React from 'react'
import './CSS/LoginSignup.css';
import { useState } from 'react';
export const LoginSignup = () => {
  const [state, setState] = useState('Sign Up');

  const [formData, setformData] = useState({
    username: "",
    password: "",
    email: ""
  })
  const changeHandler = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }
  const login = async () => {
    
    let responseData;
    await fetch('https://backendshopping-qwex.onrender.com/login', {
      method: "POST",
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else {
      alert(responseData.errors);
    }
  }
  const signup = async () => {
    
    let responseData;
    await fetch('https://backendshopping-qwex.onrender.com/signup', {
      method: "POST",
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json', },
      body:JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData = data)
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    }
    else {
      alert(responseData.errors);
    }
  }
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1> {state} </h1>
        <div className="loginsignu p-fields">
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email' Address />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>  
         <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
        {state === "Sign Up" ?
          <p className="loginsignup-login">Already have an account?<span onClick={() => { setState("Login") }}>Login Here</span></p>
          : <p className="loginsignup-login">Create an account ?
            <span onClick={() => {setState("Sign Up")}}>Click</span></p>}
            <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p> By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>

    </div>
  )
}
