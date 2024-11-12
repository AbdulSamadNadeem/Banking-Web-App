import React from 'react'
import { Route, Routes } from 'react-router'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import Home from './Pages/home'
import TransferMoneyPage from './Pages/TransferMoneyPage'



const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<SignupPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/send' element={<TransferMoneyPage/>}/>
 
    </Routes>
  
    
    </>
  )
}

export default App