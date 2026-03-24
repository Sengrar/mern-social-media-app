

import Sidebar from './components/Sidebar.jsx';
import API from './api/axios.js'
import Home from "./pages/Home.jsx";
import { useEffect, useState } from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// import './App.css'

function App() {
  const [data, setData] = useState("");

  useEffect(()=>{
    API.get("/test")
    .then((res)=>{
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
      
      </Routes>
      </div>

        

      </BrowserRouter>

      
      
      
    </div>
  )
}

export default App
