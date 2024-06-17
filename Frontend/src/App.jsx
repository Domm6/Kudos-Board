import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import KudoCard from './components/KudoCard'
import KudoList from './components/KudoList'
import Footer from './components/Footer'

function App() {

  return (
    <div className='App'>
      <Header></Header>
      <KudoList></KudoList>
      <Footer></Footer>
    </div>
  )
}

export default App
