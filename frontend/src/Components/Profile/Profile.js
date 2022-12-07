import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { user } from '../../api/api'
import "./Profile.css"
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';



export default function Profile() {
    
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['jwt'])
    const [userData, setUserData] = useState({})
    
    useEffect(() => {
        if (!cookies.jwt) {
            navigate("/login")
        }else{
            Axios.get(`${user}/userProfile`, { withCredentials: true }).then((response) => {
                const {userName,email} = response.data;
                const image = response.data.image
                setUserData({userName,email,image})
            })

        }
    }, [])

    return (
        <div className="vh-100" style={{ backgroundColor: '#9de2ff' ,paddingTop : '100px'}}>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0 mr-5">
                    <MDBCardImage
                      style={{ width: '180px', borderRadius: '10px' }}
                      src={userData.image ? userData.image : 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'}
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>{userData.userName}</MDBCardTitle>
                    <MDBCardText>{userData.email}</MDBCardText>

                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#efefef' }}>
                      <div>
                        <p className="small text-muted mb-1">Articles</p>
                        <p className="mb-0">41</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">Followers</p>
                        <p className="mb-0">976</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Rating</p>
                        <p className="mb-0">8.5</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      <button outline className="me-1 flex-grow-1" style={{ backgroundColor: '#efefef',borderRadius : '10%' , border : 'none' }} onClick={()=>{
                        navigate('/editProfile')
                      }}>Edit</button>
                      <MDBBtn className="flex-grow-1">Followers</MDBBtn>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}