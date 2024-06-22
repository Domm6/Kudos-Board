import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import "./BoardDetails.css";
import BoardCard from './BoardCard';
import CardModal from './CardModal';
import CommentModal from './CommentModal'
import { Link } from 'react-router-dom';


const LOGO = "https://i.vimeocdn.com/video/557834687-b8d55eb049d1702b589b4ad62c31fe18ac0f44f0316546d6aef20c61be70435c-d_640?f=webp";

function BoardDetails () {
    const [isCardModalVisible, setIsCardModalVisible] = useState(false)
    const [isCommentModalVisible, setIsCommentModalVisible] = useState(false)
    const {boardId} = useParams();
    const [cards, setCards] = useState([])
    const [selectedGifUrl, setSelectedGifUrl] = useState('');
    const [selectedCardId, setSelectedCardId] = useState(null);

    useEffect(() => {
        fetch(`https://kudos-board-backend-i44b.onrender.com/boards/${boardId}`)
          .then(response => response.json())
          .then(data => {
            if (data && data.cards) {
                setCards(data.cards);
            } else {
                setCards([]);  
            }
        })
          .catch(error => console.error('Error fetching cards:', error));
          console.log(boardId, cards)
    }, [boardId]);

    const addCard = (newCard) => {
        setCards(prevCards => [...prevCards, newCard]);
    };
    
    const deleteCard = (cardId) => {
        fetch(`https://kudos-board-backend-i44b.onrender.com/cards/${cardId}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (response.ok) {
            setCards(prevCards => prevCards.filter(card => card.id !== cardId));
          }
        })
        .catch(error => console.error('Error deleting card:', error));
    }

    const likeCard = (cardId) => {
        fetch(`https://kudos-board-backend-i44b.onrender.com/cards/${cardId}/like`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            }
          })
          .then(response => {
            if (response.ok) {
                return response.json()
            }
          })
          .then(updatedCard => {
            setCards(prevCard => prevCard.map(card => {
                if (card.id === updatedCard.id) {
                    return updatedCard
                } else {
                    return card
                }
            }))
          })
          .catch(error => console.error('Error liking card:', error));
    }

    const openCardModal = () => {
        setIsCardModalVisible(true)
    }

    const closeCardModal = () => {
        setIsCardModalVisible(false)
    }

    const openCommentModal = (gifUrl, cardId) => {
        setSelectedCardId(cardId)
        setSelectedGifUrl(gifUrl);
        setIsCommentModalVisible(true)
    }

    const closeCommentModal = () => {
        setIsCommentModalVisible(false)
    }

    return (
        <>
        <div className='header-board'>
            <div className="header">
                <div className='header-logo'>
                    <img src={LOGO} alt="" />
                </div>
                <div className='header-create'>
                    <Link to={`/`} className='view-button'>
                        Back
                    </Link>
                    <button type="submit" className='create-button' onClick={openCardModal}>Create A New Card</button>
                </div>
            </div>
        </div>
        <div className="board-details">
            {cards.map(card => (
                <BoardCard deleteCard={() => deleteCard(card.id)} likeCard={() => likeCard(card.id)} key={card.id} title={card.title} likes={card.likes} gifUrl={card.gifUrl} onClick={() => openCommentModal(card.gifUrl, card.id)}/>
            ))}
        </div>
        <CardModal isOpen={isCardModalVisible} onClose={closeCardModal} addCard={addCard} boardId={boardId}></CardModal>
        <CommentModal isOpen={isCommentModalVisible} onClose={closeCommentModal} gifUrl={selectedGifUrl} cardId={selectedCardId}></CommentModal>
        </>
    )
}

export default BoardDetails