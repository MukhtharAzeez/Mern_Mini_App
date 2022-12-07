import React, { useState , useEffect} from 'react';
// import Logo from "../../olx-logo.png";
import "./Signup.css";
import Axios from 'axios'
import {user} from '../../api/api'
import { Link, useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie'



export default function Signup() {
  const [cookies, setCookie] = useCookies(['jwt']);
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate()


  
  const signup = (e)=>{
    e.preventDefault();
    Axios.post(`${user}/signup`,{firstName,lastName,email,phone,password}).then((response)=>{
      if(response.data.auth){
        navigate('/')
      }
    })
  }


  useEffect(() => {
    if(cookies.jwt){
        navigate('/')
    }
  }, [])


  return (
    <div>
      <div className="signupParentDiv">
        {/* <img width="250px" height="200px" src={Logo} alt="logo"></img> */}
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={firstName}
            onChange={(e)=>{
              setFirstName(e.target.value)
            }}
            name="name"
          />
          <br />
          <label htmlFor="lname">lastName</label>
          <br />
          <input
            className="input"
            type="text"
            id="lname"
            value={lastName}
            onChange={(e)=>{
              setLastName(e.target.value)
            }}
            name="name"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            name="email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e)=>{
              setPhone(e.target.value)
            }}
          />
          <br />
          <label htmlFor="password">Password</label>
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
          <button onClick={signup}>Signup</button>
        </form>
        <Link id='link' to="/login">Login</Link>
      </div>
    </div>
  );
}
