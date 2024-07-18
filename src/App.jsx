import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './elements/Log'
import EasyWork from './elements/EasyWork'
import Signup from './elements/Signup'
import CreatNewCompany from './elements/CreatNewCompany'



function App() {


  return (

    <Routes>
      <Route path='*' element={<Login />}></Route>
      <Route path='signup' element={<Signup />}></Route>
      <Route path='EasyWork' element={<EasyWork />}></Route>
      <Route path='CreatNewCompany' element={<CreatNewCompany />}></Route>
    </Routes>

  )
}

export default App
