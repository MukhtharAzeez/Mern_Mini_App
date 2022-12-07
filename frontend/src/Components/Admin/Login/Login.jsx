import React, { useContext, useEffect, useState } from 'react';
import './Login.css';
import Axios from 'axios';
import {user} from '../../../api/api'
import { Link, useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie'
import { AuthContext } from '../../../contexts/userContext';


function Login() {
  const {setUserId} = useContext(AuthContext);
  const [cookies, setCookie] = useCookies(['adminJwt']);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate()
  // const {userName,setUserName} = useContext(AuthContext)
  
  useEffect(() => {
    if(cookies.adminJwt){
      navigate('/adminHome')  
    }
  }, [])

  const login=(e)=>{
    e.preventDefault();
    Axios.post(`${user}/login`,{email,password},{ withCredentials: true }).then((response)=>{
      console.log(response)
      if(response.data.auth){
        
        navigate('/')
      }else if(response.data.admin){
        navigate('/adminHome')
      }else{
        setError(response.data.message)
      }
    })
  }



  return (
    <div>
      <div className="loginParentDiv">
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
        <Link id='link' to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
