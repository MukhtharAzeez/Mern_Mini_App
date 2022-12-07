import React, { useEffect } from 'react'
import { useState } from 'react'
import "./EditProfile.css"
import Axios from "axios";
import {user,cloudAPI} from '../../api/api'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom'

function EditProfile() {
    const [image, setImage] = useState("")
    const [firstImage,setFirstImage] = useState("")
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['jwt'])
    const [userData, setUserData] = useState({})
    const [firstName,setFirstName] = useState(userData.firstName);
    const [lastName,setLastName] = useState(userData.lastName);
    const [email,setEmail] = useState(userData.email);
    const [userName,setUserName] = useState(userData.userName);
    
    useEffect(() => {
        if (!cookies.jwt) {
            navigate("/login")
        }else{
            Axios.get(`${user}/userProfile`, { withCredentials: true }).then((response) => {
                const {firstName,lastName,userName,email,image} = response.data;
                setUserData({firstName,lastName,userName,email,image})
                setFirstName(firstName);
                setLastName(lastName)
                setEmail(email)
                setUserName(userName)
                setFirstImage(image)
            })

        }
    }, [])
   

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'fetovrfe');
        let imageUrl = null

        Axios.post(`https://api.cloudinary.com/v1_1/${cloudAPI}/image/upload`, formData).then(response => {
            if(response){
                imageUrl = response.data.secure_url
            Axios.post(`${user}/editProfilePhoto`,{ firstName,lastName,email,userName,image: imageUrl },{withCredentials:true}).then((res) => {
                console.log(res.data);
                navigate('/profile')
            })
            }
            
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
                            <img src={firstImage ? firstImage : image ? URL.createObjectURL(image) : "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"} className="avatar img-circle img-thumbnail" alt="avatar" />

                            <input type="file" className="form-control" onChange={(e) => {
                                setImage(e.target.files[0])
                                setFirstImage('')
                            }} />
                        </div>
                    </div>

                    <div className="col-md-9 personal-info">
                        <h3>Personal info</h3>

                            <div className="form-group">
                                <label className="col-lg-3 control-label">First name:</label>
                                <div className="col-lg-8">
                                    <input className="form-control" type="text" defaultValue={userData.firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label">Last name:</label>
                                <div className="col-lg-8">
                                    <input className="form-control" type="text" defaultValue={userData.lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                                </div>
                            </div>
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