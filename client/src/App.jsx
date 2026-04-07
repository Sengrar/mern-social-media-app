

import Sidebar from './components/Sidebar.jsx';
import API from './api/axios.js'
import Home from "./pages/Home.jsx";
import Create from './pages/Create.jsx';
import Explore from './pages/Explore.jsx';
import Messages from './pages/Messages.jsx';
import More from './pages/More.jsx';
import Notifications from './pages/Notifications.jsx';
import Profile from './pages/Profile.jsx';
import Search from './pages/Search.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import './App.css'

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    API.get("/test")
      .then((res) => {
        setData(res.data.message)
      })
  }, []);

  return (
    <div className="flex bg-black text-white">
      <BrowserRouter>
        <Sidebar />

        <div className="flex-1 ml-20 md:ml-64 flex justify-center">

          <Routes>

            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/create' element={<Create></Create>}></Route>
            <Route path='/explore' element={<Explore></Explore>}></Route>
            <Route path='/messages' element={<Messages></Messages>}></Route>
            <Route path='/menu' element={<More></More>}></Route>
            <Route path='/notifications' element={<Notifications></Notifications>}></Route>
            <Route path='/profile' element={<Profile></Profile>}></Route>
            <Route path='/search' element={<Search></Search>}></Route>
                      <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          </Routes>
        </div>



      </BrowserRouter>

      {/* <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter> */}


    </div>
  )
}

export default App
