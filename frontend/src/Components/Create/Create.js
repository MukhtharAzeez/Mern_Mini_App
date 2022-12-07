import React, { Fragment, useEffect, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import Axios from 'axios'
import {user,cloudAPI} from '../../api/api'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


const Create = () => {
  const [name,setName] = useState('');
  const [category,setCategory] = useState('');
  const [price,setPrice] = useState('');
  const [image,setImage] = useState('');
  const [cookies, setCookie] = useCookies(['jwt'])
  const navigate =useNavigate();

  useEffect(()=>{
    if (!cookies.jwt) {
      navigate("/login")
    }
  })

  const handleSubmit=(e)=>{
    e.preventDefault();
    

        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'fetovrfe');
        console.log(...formData);
        let imageUrl = null

        Axios.post(`https://api.cloudinary.com/v1_1/${cloudAPI}/image/upload`, formData).then(response => {
            if(response){
                imageUrl = response.data.secure_url
                console.log(imageUrl);
                console.log(name,category,price,imageUrl)
                Axios.post(`${user}/addProduct`,{name,category,price,imageUrl},{ withCredentials: true }).then((response)=>{
                  if(response.data.productAdd){
                    navigate('/')
                  }
                })
            }
            
        })
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>{setCategory(e.target.value)}}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
            <br />
        
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""} ></img>
          
            <br />
            <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
