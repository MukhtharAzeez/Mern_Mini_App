import React, { useContext, useEffect, useState } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../contexts/userContext';
import {useCookies} from 'react-cookie'
import Axios from 'axios'
import {user} from '../../api/api'
import { AuthContext } from '../../contexts/userContext';
import { useSelector } from 'react-redux';




function Header() {
  
  const userName = useSelector((state)=>{
    return state.user.name;
  })

  

  const [cookies, setCookie] = useCookies(['jwt']);
  const navigate = useNavigate();
  const {userId} = useContext(AuthContext)
  // const [userNames,setUserNames] = useState('') 
  
  useEffect(()=>{
  })

  const logout =()=>{
    Axios.get(`${user}/logout`,{ withCredentials: true }).then((response)=>{
     
      if(cookies.jwt){
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
          <span onClick={()=>navigate('/login')}>{userId ? '': 'Login'}</span>
          <br />
          <span onClick={logout}>{userId ? userName : ''}</span>
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
