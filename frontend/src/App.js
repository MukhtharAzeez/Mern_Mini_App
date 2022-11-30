import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import EditProfile from './Components/EditProfile/EditProfile';



function App() {
   return (
    <Router >
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/editProfile' element={<EditProfile />} />

      </Routes>
    </Router>
  );
}

export default App;
