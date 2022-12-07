import React, { useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import Axios from 'axios'
import {user} from '../../api/api'

function Posts() {

  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    Axios.get(`${user}/getAllProducts`,{withCredentials: true}).then((response)=>{
      const allPost = response.data.products.map((product)=>{
        return {
          ...product,
          id : product._id
        }
      })
      setPosts(allPost)
    })
  })

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">


         {posts.map((obj)=>{
          return  <div
          className="card"
        >
          <div className="favorite">
            <Heart></Heart>
          </div>
          <div className="image">
            <img src={obj.image} alt="" />
          </div>
          <div className="content">
            <p className="rate">&#x20B9; {obj.price}</p>
            <span className="kilometer">{obj.name}</span>
            <p className="name"> {obj.category}</p>
          </div>
          <div className="date">
            <span></span>
          </div>
        </div>
         })}

         

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
