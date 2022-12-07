import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import {admin} from '../../../api/api'
import AdminNavbar from '../NavBar/NavBar'
import "./Home.css"
import {AuthContext} from '../../../contexts/userContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'



function ViewUser() {

    const [users,setUsers] = useState([]);
    let { setUserId } = useContext(AuthContext)
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['adminJwt'])


    useEffect(()=>{
        if(!cookies.adminJwt){
          navigate('/admin')  
        }
        Axios.get(`${admin}/getAllUsers`,{ withCredentials: true }).then((response)=>{
            setUsers(response.data.users)
        })
    },[])

    const handleEdit=(id)=>{
        setUserId(id)
        navigate('/editUser')
    }

    const handleDelete=(id)=>{
        setUserId(id)
        Axios.get(`${admin}/deleteAUser?id=${id}`,{ withCredentials: true }).then((response)=>{
            setUsers(response.data.users)
        })
    }
    
    return (
        <>
            <AdminNavbar />
            <section className='mt-5 mb-5'>
                <div className="container">
                    <h1 className='heading'>ALL USERS</h1>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Edit</th>
                                <th scope='col'>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            
                        {
                                users.map((obj, index) => {

                                    return <tr key={obj._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{obj.userName}</td>
                                        <td>{obj.email}</td>
                                        <td onClick={()=>handleEdit(obj._id)}>Edit</td>
                                        <td onClick={()=>handleDelete(obj._id)}>Delete</td>
                                    </tr>
                                })
                            }
                                    
                            
                            

                        </tbody>
                    </table>
                </div>
            </section>
            
        </>
    )
}

export default ViewUser