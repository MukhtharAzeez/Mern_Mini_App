import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import EditProfile from './Components/EditProfile/EditProfile';
import Create from './Pages/Create'
import AdminLogin from './Pages/Admin/Login'
import AdminHome from './Components/Admin/Home/Home'
import EditUser from './Components/Admin/EditUser/EditUser'

function App() {
   return (
    <Router >
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/editProfile' element={<EditProfile />} />
        <Route exact path='/addProduct' element={<Create />} />
        <Route exact path='/admin' element={<AdminLogin />} />
        <Route exact path='/adminHome' element={<AdminHome />} />
        <Route exact path='/editUser' element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
