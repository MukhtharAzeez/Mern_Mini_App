import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import Axios from 'axios';
import {user} from '../../api/api'
import { useHistory } from 'react-router-dom';
import {userContext} from '../../contexts/userContext'

function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [userName,setUserName] = useState('');
  const [error,setError] = useState('');
  const history=useHistory();
  const login=(e)=>{
    e.preventDefault();
    Axios.post(`${user}/login`,{email,password}).then((response)=>{
      console.log(response)
      if(response.data.userLogin){
        setUserName(response.data.user)
        history.push('/')
      }else{
        setError(response.data.message)
      }
    })
  }

  return (
    <div>
      <userContext.Provider value={{data : userName}}>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt=""></img>
      <p className='text-center pt-5 text-danger'>{error}</p>

        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
          />
          <br />
          <br />
          <button onClick={login}>Login</button>
        </form>
        <a>Signup</a>
      </div>
      </userContext.Provider>
    </div>
  );
}

export default Login;
