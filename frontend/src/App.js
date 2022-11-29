import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'

/**
 * ?  =====Import Components=====
 */
// import Home from './Pages/Home';

function App() {
  return (
    <Router >
       {/* <Route exact path='/'>
          <Home/>
       </Route>
       <Route path = '/signup'>
          <Signup/>
       </Route>
       <Route path = '/login'>
          <Login/>
       </Route> */}
  <Routes>
       <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        </Routes>
        {/* <Route exact path='/signup' element={<Signup />} /> */}
    </Router>
  );
}

export default App;
