import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import KudoCard from './components/KudoCard'
import KudoList from './components/KudoList'
import Footer from './components/Footer'
import Modal from './components/Modal'

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const openModal = () => {
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  return (
    <div className='App'>
      <Header onOpen={openModal}></Header>
      <KudoList></KudoList>
      <Modal isOpen={isModalVisible} onClose={closeModal}></Modal>
      <Footer></Footer>
    </div>
  )
}

export default App
