import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import BoardDetails from './components/BoardDetails';
import './App.css'
import Header from './components/Header'
import KudoList from './components/KudoList'
import Footer from './components/Footer'
import Modal from './components/Modal'

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [kudos, setKudos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("All")

  useEffect(() => {
      fetch('https://kudos-board-backend-i44b.onrender.com/boards')
          .then(response => response.json())
          .then(data => setKudos(data))
          .catch(error => console.error('Error fetching Kudos:', error));
  }, []);
  
  const addKudo = (newKudo) => {
    setKudos(prevKudos => [...prevKudos, newKudo]);
  };

  const deleteKudo = (kudoId) => {
    fetch(`https://kudos-board-backend-i44b.onrender.com/boards/${kudoId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        setKudos(prevKudos => prevKudos.filter(kudo => kudo.id !== kudoId));
      }
    })
    .catch(error => console.error('Error deleting Kudo:', error));
  }

  const openModal = () => {
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  return (
    <Router>
        <div className='App'>
          <Routes>
            <Route path='/' element={<KudoList kudos={kudos} searchTerm={searchTerm} filter={filter} deleteKudo={deleteKudo} onOpen={openModal} setSearchTerm={setSearchTerm} setFilter={setFilter}></KudoList>} ></Route>
            <Route path='/boards/:boardId' element={<BoardDetails></BoardDetails>}></Route>
          </Routes>
          <Modal isOpen={isModalVisible} onClose={closeModal} addKudo={addKudo}></Modal>
          <Footer></Footer>
      </div>
    </Router>
  )
}

export default App
