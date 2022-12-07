import React, { useEffect } from 'react'
import { useState } from 'react'
import "./EditUser.css"
import Axios from "axios";
// import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/userContext';
import { useContext } from 'react';
import { admin } from '../../../api/api';
import { useCookies } from 'react-cookie'


// import { useNavigate } from 'react-router-dom'

function EditProfile() {
    const [cookies, setCookie] = useCookies(['adminJwt'])
    const navigate = useNavigate();

    const {userId} = useContext(AuthContext);
    const [userData, setUserData] = useState({})
    const [image,setImage] = useState('');
    const [email,setEmail] = useState(userData.email);
    const [userName,setUserName] = useState(userData.userName);
    
    useEffect(() => {
        if(!cookies.adminJwt){
            navigate('/admin')  
        }

       Axios.get(`${admin}/getUserData?id=${userId}`,{ withCredentials: true}).then((response)=>{
        setUserData(response.data.user)
       })
    }, [])
   

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        
        Axios.post(`${admin}/EditUserData`,{userId,email,userName},{ withCredentials: true}).then((response)=>{
            console.log(response) 
            navigate('/adminHome')
        })
    }
    return (
        <>
            <div className="container bootstrap snippets bootdey">
                <h1 className="text-primary">Edit Profile</h1>
                <hr />
                            <form className="form-horizontal" role="form" onSubmit={handleUpdateProfile}>
                <div className="row">
                <div className="col-md-3">
                        <div className="text-center">
                            <img src={userData.image ? userData.image : "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"} className="avatar img-circle img-thumbnail" alt="avatar" />

                            
                        </div>
                    </div>

                    <div className="col-md-9 personal-info">
                        <h3>User info</h3>
                            <div className="form-group">
                                <label className="col-lg-3 control-label">userName:</label>
                                <div className="col-lg-8">
                                    <input className="form-control" type="text" defaultValue={userData.userName} onChange={(e)=>{setUserName(e.target.value)}}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label">Email:</label>
                                <div className="col-lg-8">
                                    <input className="form-control" type="text" defaultValue={userData.email} onChange={(e)=>{setEmail(e.target.value)}}/>
                                </div>
                            </div>
            <button className='custombutton' type='submit'>Update Profile</button>
                    </div>
                </div>
                        </form>
            </div>
            <hr />
        </>
    )
}

export default EditProfile