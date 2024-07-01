import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './elements/Log'
import EasyWork from './elements/EasyWork'



function App() {


  return (
    <>
      <Routes>
        <Route path='*' element={<Login />}></Route>
        <Route path='EasyWork' element={<EasyWork />}></Route>
      </Routes>
    </>
  )
}

export default App
