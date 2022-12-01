import React, { useContext, useEffect, useState } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/userContext';
import {useCookies} from 'react-cookie'
import Axios from 'axios'
import {user} from '../../api/api'




function Header() {
  const [cookies, setCookie] = useCookies(['jwt']);
  const navigate = useNavigate();
  const {userName} = useContext(AuthContext)
  const [userNames,setUserNames] = useState('') 
  useEffect(()=>{
    if(userName.length>0 && cookies.jwt){
      localStorage.setItem('Name',userName)
      setUserNames(userName)
    }else if(cookies.jwt){
      const name = localStorage.getItem('Name')
      setUserNames(name)
    }
    // console.log(userName.length)
  })

  const logout =()=>{
    Axios.post(`${user}/logout`,{},{ withCredentials: true }).then((response)=>{
      console.log(response)
      if(cookies.jwt.length>0){
        console.log("found it")
      }else{
        console.log("yes u r correct")
      }
    })
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={()=>navigate('/login')}>{userNames ? userNames: 'Login'}</span>
          <br />
          <span onClick={logout}>{userNames ? 'Logout' : ''}</span>
          <hr />
        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
          <span onClick={()=>navigate('/profile')}>Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
