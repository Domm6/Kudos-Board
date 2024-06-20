import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import KudoCard from './components/KudoCard'
import KudoList from './components/KudoList'
import Footer from './components/Footer'
import Modal from './components/Modal'

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [kudos, setKudos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
      fetch('http://localhost:3000/boards')
          .then(response => response.json())
          .then(data => setKudos(data))
          .catch(error => console.error('Error fetching Kudos:', error));
  }, []);
  const addKudo = (newKudo) => {
    setKudos(prevKudos => [...prevKudos, newKudo]);
  };
  const openModal = () => {
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  return (
    <div className='App'>
      <Header onOpen={openModal} searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Header>
      <KudoList kudos={kudos}></KudoList>
      <Modal isOpen={isModalVisible} onClose={closeModal} addKudo={addKudo}></Modal>
      <Footer></Footer>
    </div>
  )
}

export default App
