import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './elements/Log'


function App() {


  return (
    <>
      <Routes>
        <Route path='*' element={<Login />}></Route>
      </Routes>
    </>
  )
}

export default App
