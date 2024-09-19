import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import InviteCard from './InviteCard'
import "./App.css"
import "./i18n"
const RedirctFromHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(-1)
  } , [])
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<RedirctFromHome/>} /> 
      <Route path='/invitation-card/:invite' element={<InviteCard />} />
    </Routes>
  )
}

export default App