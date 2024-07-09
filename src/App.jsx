import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './elements/Log'
import EasyWork from './elements/EasyWork'



function App() {


  return (
    <div style={{ maxWidth: "1260px", margin: "auto" }}>
      <Routes>
        <Route path='*' element={<Login />}></Route>
        <Route path='EasyWork' element={<EasyWork />}></Route>
      </Routes>
    </div>
  )
}

export default App
